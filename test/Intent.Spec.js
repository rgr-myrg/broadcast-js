describe( "VMN.Intent" , function() {
	it( "should be a function" , function() {
		expect( typeof VMN.Intent ).toBe( typeof function(){} );
	});
});

describe( "VMN.Intent.getName()" , function() {
	it( "should return a value" , function() {
		var intent = VMN.Intent( "anEventName" );

		expect( intent.getName() ).toBe( "anEventName" );
	});
});

describe( "VMN.Intent.getData()" , function() {
	it( "should return an object" , function() {
		var data = { aDataPoint: "aValue" };
		var intent = VMN.Intent( "anEventName", data );

		expect( typeof intent.getData() ).toBe( typeof {} );
	});
});

describe( "VMN.Intent.getData()" , function() {
	it( "should return a value" , function() {
		var data = { aDataPoint: "aValue" };
		var intent = VMN.Intent( "anEventName", data );

		expect( intent.getData()["aDataPoint"] ).toBe( "aValue" );
	});
});

describe( "VMN.Intent.getData()" , function() {
	it( "should return an empty object" , function() {
		expect( VMN.Intent( "anEventName" ).getData() ).toEqual( {} );
	});
});
