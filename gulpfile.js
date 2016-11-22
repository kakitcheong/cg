var gulp = require('gulp'),
	gutil = require('gulp-util'),
	count = require('gulp-count'),
	concat = require('gulp-concat');

gulp.task('log', function(){
	for(i = 0; i < jsSources.length; i++){
		gutil.log(jsSources[i]);	
	}
});

gulp.task('js', function(){
	gulp.src('components/scripts/*.js')
		.pipe(count('## js-files selected'))
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
});


