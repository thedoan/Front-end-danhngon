var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass'], function(done){
	browserSync.init({
		server: "./"
	});
	gulp.watch(['sass/*.scss','sass/**/*.scss'],['sass']);
	gulp.watch('./*.html').on('change', browserSync.reload);
	done();
});

gulp.task('sass', function(done) {
	return sass('sass/*.scss', { loadPath: ['node_modules/susy/sass','node_modules/breakpoint-sass/stylesheets'], compass: true, sourcemap: true})
		.on('error', sass.logError)
		.pipe(sourcemaps.init())
		.pipe(gulp.dest('css'))
		.pipe(sourcemaps.write('./'), {
			includeContent: false,
			sourceRoot: 'sass'
		})
		.pipe(browserSync.stream({ match: '**/*.css' }));
	done();
});
