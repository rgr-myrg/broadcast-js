(function( $$ ) {

	if ( typeof $$.Context === "object" ) {
		return;
	}

	$$.Context = function() {
		var receivers = [],
	
		processReceiver = function( receiver, removeIfRegistered ) {
			if ( typeof receiver !== "object" || typeof receiver.onReceive !== "function" ) {
				return false;
			}
	
			var isRegistered = false;
	
			for ( var x = 0, size = receivers.length; x < size; x++ ) {
				if ( receivers[ x ] === receiver ) {
	
					isRegistered = true;
	
					if ( removeIfRegistered ) {
						receivers.splice( x, 1 );
					}
	
					break;
				}
			}
	
			if ( !isRegistered ) {
				receivers.push( receiver );
				isRegistered = true;
			}
	
			return isRegistered;
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

				for ( var x = 0, size = receivers.length; x < size; x++ ) {
					try {

						receivers[ x ].onReceive( $$.Intent( eventName, eventData ) );
	
					} catch( e ) {
					}
				}

				return true;
			}
		};
	};

})( VMN );
