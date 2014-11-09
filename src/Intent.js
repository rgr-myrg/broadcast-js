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
