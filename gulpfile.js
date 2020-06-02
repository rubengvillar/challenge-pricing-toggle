const { src, dest, watch, parallel, series } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const browserSyncApp = require('browser-sync').create()

const config = {
    public: './public',
    src: {
        pug: './src/pug',
        sass: './src/sass',
        js: './src/js'
    }
}

function pugCompile() {
    return src(`${config.src.pug}/*.pug`)
    .pipe(pug())
    .pipe(dest(config.public));
}

function scss() {
    return src(`${config.src.sass}/*.scss`)
    .pipe(sass())
    .pipe(dest(config.public))
    .pipe(browserSyncApp.stream());;
}

function js(){
    return src(`${config.src.js}/*.js`)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest(`${config.public}/js`))
}

function browserSync() {
    return browserSyncApp.init({
        server: {
            baseDir: './public'
        }
    });
}

function defaultTask() {
    watch(`${config.src.pug}/**/*.pug`, pugCompile)
    watch(`${config.src.sass}/**/*.scss`, scss)
    watch(`${config.src.js}/**/*.js`, js)
    watch(`${config.public}/*.html`).on('change', browserSyncApp.reload);
    watch(`${config.public}/js/*.js`).on('change', browserSyncApp.reload);
}

function html(){
    return src(`${config.src.pug}/*.pug`)
    .pipe(pug())
    .pipe(dest(config.public))
}

function css(){
    return src(`${config.src.sass}/*.scss`)
    .pipe(sass())
    .pipe(dest(config.public))
}

exports.build = series(html, css, js)

exports.default = series( pugCompile, scss, js, parallel(browserSync, defaultTask) )