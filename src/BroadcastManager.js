(function( w ){w.VMN=w.VMN||{};})( window );

(function( VMN ) {

	VMN.BroadcastManager = (function() {

		var	receivers = [],

			isRegistered = function( receiver ) {

				var registered = false;

				for ( var x = 0, size = receivers.length; x < size; x++ ) {

					if ( receivers[ x ] === receiver ) {

						registered = true;
						break;
					}

				}

				return registered;

			};

		return {

			registerReceiver: function( receiver ) {

				var registered = false;

				if ( typeof receiver === "object" && 
						typeof receiver.onReceive === "function" && 
						!isRegistered( receiver ) ) {

					receivers.push( receiver );
					registered = true;

				}

				return registered;

			},

			removeReceiver: function( receiver ) {

				var removed = false;

				for ( var x = 0, size = receivers.length; x < size; x++ ) {

					if ( receivers[ x ] === receiver ) {

							receivers.splice( x, 1 );
							removed = true;

							break;

					}

				}

				return removed;

			},

			sendBroadcast: function( intent ) {

				if ( typeof intent !== "object" ) {

					return false;

				}

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
