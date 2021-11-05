const { series, parallel, watch } = require('gulp');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require("gulp-less");
var cleanCSS = require('gulp-clean-css');
var prefix = require("gulp-autoprefixer");
var nunjucks = require("gulp-nunjucks");
var htmlbeautify = require("gulp-html-beautify");
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var del = require('del');


function less_compile(){
    return gulp
        .src("app/less/*.less")
        .pipe(less())
        .pipe(
            prefix({
                browsers: [">0.1%"]
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

function nunjucks_compile(){
    return gulp
        .src("app/nunjucks/*.html")
        .pipe(nunjucks.compile())
        .pipe(
            htmlbeautify({
                preserve_newlines: false
            })
        )
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

function js_compile() {
    return gulp
        .src("app/js/main.js")
        .pipe(fileinclude())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
}

function del_dist(){
    return del('dist');
}

function img() {
    return gulp
        .src("app/img/*.*")
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp
        .src("app/fonts/*.*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
}
//========================================//
//=============== Вотчер ==================//
//========================================//
function watching() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
}

exports.default = series(del_dist, nunjucks_compile, less_compile, js_compile, img, fonts, watching);

watch(['app/nunjucks/**/*.html'],nunjucks_compile);
watch(['app/less/**/*.less'], less_compile);
watch(['app/js/**/*.js'], js_compile);
watch(['app/img/**/*.*'], img);
watch(['app/fonts/**/*.*'], fonts);
//========================================//
//=============== END Вотчер ==================//
//========================================//