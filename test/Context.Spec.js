describe( "VMN.Context" , function() {
	it( "should be a function", function() {
		expect( typeof VMN.Context ).toBe( typeof function(){} );
	});
});

describe( "VMN.Context.addReceiver()", function() {
	var context = VMN.Context();
	var receiver = { onReceive: function() {} };

	it( "should return true", function() {
		expect( context.addReceiver( receiver ) ).toEqual( true );
	});
});

describe( "VMN.Context.addReceiver()", function() {
	var context = VMN.Context();
	var receiver = {};

	it( "should return false", function() {
		expect( context.addReceiver( receiver ) ).toEqual( false );
	});

});

describe( "VMN.Context.removeReceiver()", function() {
	var context = VMN.Context();
	var receiver = { onReceive: function() {} };

	context.addReceiver( receiver );

	it( "should return true", function() {
		expect( context.removeReceiver( receiver ) ).toEqual( true );
	});
});

describe( "VMN.Context.removeReceiver()", function() {
	var context = VMN.Context();
	var receiver = { onReceive: function() {} };

	context.addReceiver( receiver );

	it( "should return false", function() {
		expect( context.removeReceiver( {} ) ).toEqual( false );
	});
});

describe( "VMN.Context.on()", function() {
	var context = VMN.Context();

	it( "should return true", function() {
		expect( context.on( "anEventName" ) ).toEqual( true );
	});
});

describe( "VMN.Context.on()", function() {
	var context = VMN.Context();

	it( "should return false", function() {
		expect( context.on(  ) ).toEqual( false );
	});
});

describe( "VMN.Context.on()", function() {
	it( "should have been called with" , function() {
		var context = VMN.Context();

		spyOn( context, "on" );

		context.on( "anEventName" );
		expect( context.on ).toHaveBeenCalledWith( "anEventName" );
	});
});

describe( "Receiver.onReceive()", function() {
	var context = VMN.Context();
	var receiver, eventName, eventData;

	beforeEach(function() {
		receiver = {
			onReceive: function( event ) {
				eventName = event.getName();
				eventData = event.getData();
			}
		};

		context.addReceiver( receiver );

		spyOn( receiver, "onReceive" );

		context.on( "anEventName", { aDataPoint: "aValue" } );
	});

	it( "should have been called", function() {
		expect( receiver.onReceive ).toHaveBeenCalled();
	});

	it( "should return a value", function() {
		expect( eventName ).toEqual( "anEventName" );
	});

	it( "should return an object", function() {
		expect( typeof eventData ).toEqual( typeof {} );
	});

	it( "should return an object property", function() {
		expect( eventData.aDataPoint ).toEqual( "aValue" );
	});
});

