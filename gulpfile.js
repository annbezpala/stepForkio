'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css'); //
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');


gulp.task('build', function () {
    runSequence('clean', 'autoprefixer', 'sass', 'minify', 'img', 'create-fonts-files', function () {
    });
});

gulp.task('dev', function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('./src/js/*.js', ['minify']).on('change', browserSync.reload);
    gulp.watch('./src/scss/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./index.html').on('change', browserSync.reload)
});

gulp.task('minify', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean())
});

gulp.task('img', function () {
    return gulp.src('./src/img/**')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('autoprefixer', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
});

gulp.task('create-fonts-files', function () {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
})