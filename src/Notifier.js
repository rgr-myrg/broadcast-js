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
