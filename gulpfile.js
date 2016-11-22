var gulp = require('gulp'),
	gutil = require('gulp-util'),
	count = require('gulp-count'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	connect = require('gulp-connect'),
	compass = require('gulp-compass');

var env,
	sassSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development'){
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else{
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

sassSources = ['components/sass/style.scss'];

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
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src('components/sass/style.scss')
		.pipe(compass({
			css: 'stylesheets',
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle,
			require: [
				'modular-scale'
			]
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'stylesheets'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(outputDir + '*.html', ['html']);
	gulp.watch(outputDir + 'js/*.json', ['json']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src(outputDir+ '*.html')
		.pipe(connect.reload());
});

gulp.task('json', function(){
	gulp.src(outputDir + 'js/*.json')
		.pipe(connect.reload());
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);
