// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

// Compile Our Sass
gulp.task('sass-dist', function (done) {
	gulp
		.src('source/sass/modularity.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));

	gulp
		.src('source/sass/modularity-thickbox-edit.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));

	gulp
		.src('source/php/Module/*/assets/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
	done();
});

gulp.task('sass-dev', function (done) {
	gulp
		.src('source/sass/modularity.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename({suffix: '.dev'}))
		.pipe(gulp.dest('dist/css'));

	gulp
		.src('source/sass/modularity-thickbox-edit.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(rename({suffix: '.dev'}))
		.pipe(gulp.dest('dist/css'));
	done();
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function (done) {
	gulp
		.src(['source/js/modularity.js', '!source/js/modularity-editor-modal.js'])
		.pipe(terser())
		.pipe(concat('modularity.dev.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('modularity.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('dist/js'));

	gulp
		.src('source/php/Module/*/assets/*.js')
		.pipe(terser())
		.pipe(gulp.dest('dist/js'));

	gulp
		.src('source/js/modularity-editor-modal.js')
		.pipe(concat('modularity-editor-modal.dev.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('modularity-editor-modal.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('dist/js'));
	done();
});

// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch(
		['Source/js/**/*.js', 'source/php/Module/*/assets/*.js'],
		gulp.series('scripts-dist')
	);
	gulp.watch('Source/sass/**/*.scss', gulp.series('sass-dist', 'sass-dev'));
	gulp.watch(
		'source/php/Module/*/assets/*.scss',
		gulp.series('sass-dist', 'sass-dev')
	);
});

// Build Task
gulp.task('build', gulp.series('sass-dist', 'sass-dev', 'scripts-dist'));

// Default Task
gulp.task('default', gulp.parallel('build', 'watch'));
