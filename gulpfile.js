const { src, dest, watch, parallel, series } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const browserSyncApp = require('browser-sync').create()

const config = {
    public: './public',
    src: {
        pug: './src/pug',
        sass: './src/sass'
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

function browserSync() {
    return browserSyncApp.init({
        server: {
            baseDir: './public'
        }
    });
}

function defaultTask(cb) {
    watch(`${config.src.pug}/**/*.pug`, pugCompile)
    watch(`${config.src.sass}/**/*.scss`, scss)
    watch(`${config.public}/*.html`).on('change', browserSyncApp.reload);
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

exports.build = series(html, css)

exports.default = series( pugCompile, scss, parallel(defaultTask, browserSync) )