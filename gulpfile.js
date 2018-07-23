// required
var gulp 		= require('gulp'),
	uglify 		= require('gulp-uglify'),
	jshint 		= require('gulp-jshint'),
	tinyimg 	= require('gulp-tinifier'),
	concat		= require('gulp-concat'),
	rename 		= require('gulp-rename'),
	browsync 	= require('browser-sync');

// script task
gulp.task('scripts', function() {
	gulp.src(['js/**/*.js', '!js/**/*.min.js'])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('js/build'));
});

//default task
gulp.task('default', ['scripts']);