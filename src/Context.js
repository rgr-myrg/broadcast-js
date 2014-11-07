(function($$){

	if ( typeof $$.Context === "object" ) {
		return;
	}

	$$.Context = function() {
		var receivers = [],
	
		processReceiver = function( receiver, removeIfRegistered ) {
			if ( typeof receiver !== "object" || typeof receiver.onReceive !== "function" ) {
				return false;
			}
	
			var registered = false;
	
			for ( var x = 0, size = receivers.length; x < size; x++ ) {
				if ( receivers[ x ] === receiver ) {
	
					registered = true;
	
					if ( removeIfRegistered ) {
						receivers.splice( x, 1 );
					}
	
					break;
				}
			}
	
			if ( !registered ) {
				receivers.push( receiver );
				registered = true;
			}
	
			return registered;
		};
	
		return {
			addReceiver: function( receiver ) {
				return processReceiver( receiver );
			},
	
			removeReceiver: function( receiver ) {
				return processReceiver( receiver, true );
			},

			on: function( eventName, eventData ) {
				if ( typeof eventName !== "string" ) {
					return false;
				} 

//				var intent = {};
//				eventData  = eventData || {};
//
//				for ( var i in eventData ) {
//					if ( eventData.hasOwnProperty( i ) ) {
//						intent[ i ] = eventData [ i ];
//					}
//				}
//
//				intent.eventName = eventName;

				for ( var x = 0, size = receivers.length; x < size; x++ ) {
					try {
	
						receivers[ x ].onReceive( $$.Intent( eventName, eventData ) );
	
					} catch( e ) {
					}
				}
			}
		};
	};

})(VMN);
