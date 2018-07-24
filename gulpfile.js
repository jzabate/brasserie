// required
var gulp 			= require('gulp'),
	uglify 			= require('gulp-uglify'), // js minifier
	plumber 		= require('gulp-plumber'), // error management
	jshint 			= require('gulp-jshint'), //javascript hint
	tinyimg 		= require('gulp-tinifier'), // image compressor with the use of https://tinypng.com service
	concat			= require('gulp-concat'), // concatenates files
	rename 			= require('gulp-rename'), // rename files using some transformers
	uglyfycss		= require('gulp-uglifycss'), // css minifier
	autoprefixer 	= require('gulp-autoprefixer'), // css prefixer
	del 			= require('del'), // delete files and folders using globs
	browersync 		= require('browser-sync'); // browser sync on any other devices

// script task
gulp.task('scripts', function() {
	gulp.src(['js/**/*.js', '!js/**/*.min.js'])
		.pipe(plumber())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('js/build'));
});

// style task


// html task
gulp.task('html', function() {
	//gulp.src('/**/*.html');
});

// watch task
gulp.task('watch', function() {
	gulp.watch('js/**/*.js', ['scripts']);
	//gulp.watch('/**/*.html', ['html']);
});

//default task
gulp.task('default', ['scripts', 'html', 'watch']);