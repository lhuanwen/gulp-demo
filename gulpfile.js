/**
 * Created by leo on 2017/9/12.
 */

'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    minifyHtml  = require("gulp-minify-html"),
    reload      = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

// 静态服务器
gulp.task('browserSync', function() {
    browserSync.init({
        server: "./public"
    });
});

// 代理
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});

gulp.task('minify-html',function() {
    return gulp.src('app/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('public'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'minify-html', 'sass'], function () {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch("app/*.html", ['minify-html']);
});