var gulp = require('gulp'),
	gutil = require('gulp-util'),
	count = require('gulp-count'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	connect = require('gulp-connect'),
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
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
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
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(connect.reload());
});

gulp.task('json', function(){
	gulp.src('builds/development/js/*.json')
		.pipe(connect.reload());
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);
