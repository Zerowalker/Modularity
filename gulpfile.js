// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

const prefix = () => autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1');
const dstCss = () => gulp.dest('dist/css')
const dstJs = () => gulp.dest('dist/js')
const renMin = () => rename({ suffix: '.min' })
const renDev = () => rename({ suffix: '.dev' })

// Compile Our Sass
gulp.task('sass-dist', function (done) {
    gulp.src('source/sass/modularity.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(renMin())
        .pipe(minifycss())
        .pipe(dstCss());

    gulp.src('source/sass/modularity-thickbox-edit.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(renMin())
        .pipe(minifycss())
        .pipe(dstCss());

    gulp.src('source/php/Module/*/assets/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(renMin())
        .pipe(minifycss())
        .pipe(dstCss());
    done();
});

gulp.task('sass-dev', function (done) {
    gulp.src('source/sass/modularity.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(renDev())
        .pipe(dstCss());

    gulp.src('source/sass/modularity-thickbox-edit.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(renDev())
        .pipe(dstCss());
    done();
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function (done) {
    gulp.src([
        'source/js/**/*.js',
        '!source/js/modularity-editor-modal.js'
    ])
        .pipe(concat('modularity.dev.js'))
        .pipe(dstJs())
        .pipe(rename('modularity.min.js'))
        .pipe(uglify())
        .pipe(dstJs());

    gulp.src('source/php/Module/*/assets/*.js')
        .pipe(uglify())
        .pipe(dstJs());

    gulp.src('source/js/modularity-editor-modal.js')
        .pipe(concat('modularity-editor-modal.dev.js'))
        .pipe(dstJs())
        .pipe(rename('modularity-editor-modal.min.js'))
        .pipe(uglify())
        .pipe(dstJs());
    done();
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['source/js/**/*.js', 'source/php/Module/*/assets/*.js'], gulp.series('scripts-dist'));
    gulp.watch('source/sass/**/*.scss', gulp.series('sass-dist', 'sass-dev'));
    gulp.watch('source/php/Module/*/assets/*.scss', gulp.series('sass-dist', 'sass-dev'));
});

// Build Task
gulp.task('build', gulp.series('sass-dist', 'sass-dev', 'scripts-dist'));

// Default Task
gulp.task('default', gulp.series('build', 'watch'));
