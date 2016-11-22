var gulp = require('gulp'),
	gutil = require('gulp-util'),
	count = require('gulp-count'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass');

var sassSources = ['components/sass/style.scss'];

gulp.task('log', function(){
	for(i = 0; i < jsSources.length; i++){
		gutil.log(jsSources[i]);	
	}
});

gulp.task('js', function(){
	gulp.src('components/scripts/*.js')
		.pipe(count('## js-files selected'))
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	gulp.src('components/sass/style.scss')
		.pipe(compass({
			css: 'stylesheets',
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded',
			require: [
				'modular-scale'
			]
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/stylesheets'))
});

gulp.task('default', ['js', 'compass']);
