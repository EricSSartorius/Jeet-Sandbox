// Load Plugins
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    typographic = require('typographic'),
    nib = require('nib'),
    rupture = require('rupture'),
    jeet= require('jeet');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    del = require('del');


// Clean
gulp.task('clean', function () {  
  return gulp.src('**/*', {read: false})
    .pipe(clean());
});

// Styles
gulp.task('styles', function() {
	return gulp.src('style.styl')
		.pipe(stylus({
			use: [typographic(), nib(), rupture(), jeet()]}))
		.pipe(gulp.dest('./styles'))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    	.pipe(gulp.dest('./styles'))
    	.pipe(rename({ suffix: '.min' }))
    	.pipe(minifycss())
    	.pipe(gulp.dest('./styles'))
    	.pipe(notify({ message: 'Styles donnneeee!' }));
});

// Scripts
gulp.task('scripts', function() {
  	return gulp.src('scripts/**/*.js')
  		.pipe(jshint())
    	.pipe(jshint.reporter('default'))
    	.pipe(concat('main.js'))
    	.pipe(gulp.dest('./js'))
    	.pipe(rename({ suffix: '.min' }))
    	.pipe(uglify())
    	.pipe(gulp.dest('./js'))
    	.pipe(notify({ message: 'Scripts donnneee!' }));
});

 
// Images
gulp.task('images', function() {
  	return gulp.src('images/**/*')
    	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    	.pipe(gulp.dest('./images'))
    	.pipe(notify({ message: 'Images donneeee!' }));
});
 
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch .styl files
  gulp.watch('**/*.styl', ['styles']);
 
  // Watch .js files
  gulp.watch('scripts/**/*.js', ['scripts']);
 
  // Watch image files
  gulp.watch('images/**/*', ['images']);
 
  // Create LiveReload server
  livereload.listen();
 
  // Watch css files, reload on change
  gulp.watch(['images/**/*', 'scripts/**/*.js','styles/**/*.css', '**/*.html']).on('change', livereload.changed);
 
});