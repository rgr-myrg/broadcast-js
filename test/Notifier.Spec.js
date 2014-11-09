describe( "VMN.Notifier" , function() {
	it( "should be an object" , function() {
		expect( typeof VMN.Notifier ).toBe( typeof {} );
	});
});

describe( "VMN.Notifier.getContext()" , function() {
	it( "should return an object" , function() {  
		expect( typeof VMN.Notifier.getContext( "aContextName" ) ).toBe( typeof {} );
	});
});

describe( "VMN.Notifier.getContext()" , function() {
	it( "should NOT return an object" , function() {
		expect( typeof VMN.Notifier.getContext( {} ) ).not.toBe( typeof {} );
	});
});

describe( "VMN.Notifier.getContext()" , function() {
	it( "should return undefined" , function() {
		expect( VMN.Notifier.getContext( 1111 ) ).not.toBeDefined();
	});
});

describe( "VMN.Notifier.getContext()" , function() {
	it( "should have been called with" , function() {
		spyOn( VMN.Notifier, "getContext" );

		VMN.Notifier.getContext( "aContextName" );
		expect( VMN.Notifier.getContext ).toHaveBeenCalledWith( "aContextName" );
	});
});
