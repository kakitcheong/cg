var gulp = require('gulp'),
	gutil = require('gulp-util'),
	count = require('gulp-count'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	connect = require('gulp-connect'),
	compass = require('gulp-compass'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	jsonMinify = require('gulp-jsonminify'),
	imageMin = require('gulp-imagemin'),
	bower = require('gulp-bower');

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

gulp.task('js', function(){
	gulp.src('components/scripts/*.js')
		.pipe(count('## js-files selected'))
		.pipe(concat('script.js'))
		//.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({	
			css: 'stylesheets',
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle,
			require: [
				'modular-scale'
			]
		}))
		.pipe(gulp.dest(outputDir + 'stylesheets'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('components/sass/**/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif(env === 'production', imageMin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src('builds/development/js/*.json')
		.pipe(gulpif(env === 'production', jsonMinify()))
		.pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
		.pipe(connect.reload());
});

gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest(outputDir + 'bower_components'));
});

gulp.task('default', ['html', 'js', 'compass', 'images', 'connect', 'watch', 'json']);
