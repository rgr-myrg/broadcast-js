(function( w ) { w.VMN = w.VMN || {}; }) ( window );

(function( VMN ) {

	if ( typeof VMN.BroadcastManager === "object" ) {

		return;

	}

	VMN.BroadcastManager = (function() {

		var context = {},

		setContextOnce = function( contextName ) {

			if ( !context[ contextName ] ) {

				context[ contextName ] = {

					receivers: []

				}

			}

		},

		processReceiver = function( contextName, receiver, removeIfRegistered ) {
			var registered = false,
				receivers  = context[ contextName ].receivers;

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

		},

		hasContextAndReceiver = function( contextName, receiver ) {
			return typeof contextName === "string" && typeof receiver === "object" && typeof receiver.onReceive === "function";
		};

		return {

			registerReceiver: function( contextName, receiver ) {

				if ( !hasContextAndReceiver( contextName, receiver ) ) {
					return false;
				}

				setContextOnce( contextName );

				return processReceiver( contextName, receiver );

			},

			removeReceiver: function( contextName, receiver ) {

				if ( !hasContextAndReceiver( contextName, receiver ) ) {
					return false;
				}

				return processReceiver( contextName, receiver, true );

			},

			sendBroadcast: function( contextName, intent ) {

				if ( typeof contextName !== "string" || typeof intent.eventName !== "string" ) {

					return false;

				}

				setContextOnce( contextName );

				var receivers = context[ contextName ].receivers;

				for ( var x = 0, size = receivers.length; x < size; x++ ) {

					try {

						receivers[ x ].onReceive( intent );

					} catch( e ) {
					}
				}

				return true;

			},

		};
	})();

})( VMN );
