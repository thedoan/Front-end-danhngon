var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('compass-importer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass'], function(done){
	browserSync.init({
		server: "./",
		open: false
	});
	gulp.watch(['sass/*.scss','sass/**/*.scss'],['sass']);
	gulp.watch('./*.html').on('change', browserSync.reload);
	done();
});

gulp.task('sass', function(done) {
	return gulp.src('./sass/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({ importer: compass, 
				includePaths: ['./node_modules/compass-mixins/lib',
					'./node_modules/susy/sass']
				}).on('error', sass.logError))
			.pipe(sourcemaps.write('./'), {
					includeContent: false,
					sourceRoot: 'sass'
				})
			.pipe(gulp.dest('css'))
			.pipe(browserSync.stream({ match: '**/*.css' }));
	done();
});
