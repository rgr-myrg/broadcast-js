var	headerFile  = "HEADER",
	artifactId  = "notifier",
	version     = "1.0",
	packaging   = "js",
	targetPath  = "dist",
	sourcePath  = "src",
	sourceFiles = [
		"VMN.js",
		"Intent.js",
		"Context.js",
		"Notifier.js"
	];

var	gulp    = require( "gulp" ),
	jshint  = require( "gulp-jshint" ),
	concat  = require( "gulp-concat" ),
	uglify  = require( "gulp-uglify" ),
	header  = require( "gulp-header" ),
	wrapper = require( "gulp-wrapper" ),
	karma   = require("karma").server,
	nodeFS  = require( "fs" );

var	getHeaderFile = function() {
		return nodeFS.readFileSync( headerFile, {encoding: "utf8"} )
			.replace( /{version}/, version )
			.replace( /{date}/, (new Date).toString() );
	};

var	artifactDebug = "/" + artifactId + "." + packaging,
	artifactMini  = "/" + artifactId + ".min." + packaging;

gulp.task( "init", function() {
	var size = sourceFiles.length;

	for ( var x = 0; x < size; x++ ) {
		sourceFiles[ x ] = sourcePath + "/" + sourceFiles[ x ];
		console.log( "Adding " + sourceFiles[ x ] );
	}
});

gulp.task( "clean", function() {
	var	path  = nodeFS.realpathSync( targetPath ),
		files = nodeFS.readdirSync( path );

	for( var i in files ) {
		if ( files.hasOwnProperty( i ) ) {
			console.log( "Removing " + targetPath + "/" + files[ i ] );
			nodeFS.unlink( path + "/" + files[ i ], function( e ){if(e)console.log( e );} );
		}
	}
});

gulp.task( "lint", function() {
	return gulp.src( sourcePath )
		.pipe( jshint() )
		.pipe( jshint.reporter( "default" ) );
});

gulp.task( "concat", function() {
	return gulp.src( sourceFiles )
		.pipe( concat( artifactDebug ) )
// 		.pipe(
// 			wrapper({
// 			header: "(function($$){",
// 			footer: "})(VMN);"
// 		}))
		.pipe( header( getHeaderFile() ) )
		.pipe( gulp.dest( targetPath ) );
});

gulp.task( "minify", function() {
	return gulp.src( sourceFiles )
		.pipe( concat( artifactMini ) )
		.pipe( uglify() )
		.pipe(
			header( getHeaderFile() )
		)
		.pipe( gulp.dest( targetPath ) );
});

gulp.task( "test", function (done) {
	karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done);
});


gulp.task( "default", ["init", "lint", "concat", "minify", "test"] );
