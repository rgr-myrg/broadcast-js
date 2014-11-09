/* notifier.js v1.0 Sat Nov 08 2014 20:27:34 GMT-0500 (EST) */
(function( window ) {

	window.VMN = window.VMN || {};

})( window );

(function( $$ ) {

	if ( typeof $$.Intent === "object" ) {
		return;
	}

	$$.Intent = function( eventName, eventData ) {
		var	name = eventName,
			data = eventData || {};
	
		return {
			getName: function() {
				return name;
			},

			getData: function() {
				var clone = {};

				for ( var i in data ) {
					if ( data.hasOwnProperty( i ) ) {
						clone[ i ] = data [ i ];
					}
				}

				return clone;
			}
		};
	};

})( VMN );

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

(function( $$ ) {

	if ( typeof $$.Notifier === "object" ) {
		return;
	}

	$$.Notifier = (function() {
		var contextItems = {};
	
		return {
			getContext: function( contextName ) {
				if ( typeof contextName !== "string" ) {
					return;
				}
	
				if ( !contextItems[ contextName ] ) {
					contextItems[ contextName ] = $$.Context();
				}
	
				return contextItems[ contextName ];
			}
		};
	})();

})( VMN );
