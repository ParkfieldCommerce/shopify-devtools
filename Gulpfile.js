'use strict';

// Variables
const { src, dest, watch, series } = require('gulp');
const { spawn } = require('child_process');
const babel         = require('gulp-babel'),
      autoprefixer  = require('gulp-autoprefixer'),
      changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      rename        = require("gulp-rename"),
      sass          = require('gulp-sass'),
      uglify        = require('gulp-uglify'),
      plumber       = require('gulp-plumber'),
      include       = require('gulp-include'),
      chalk         = require('chalk'),
      t2            = require('through2');

// Options
const autoprefixerOptions = {
  cascade: true,
  grid: "autoplace"
};
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};
sass.compiler = require('node-sass');
const babelOptions = {
  presets: ['@babel/preset-env']
};

// Colors
const cyanBold = chalk.cyan.bold;
const white = chalk.white;
const warning = chalk.red;

// Functions
function runT2() {
  return t2.obj((chunk, enc, cb) => {
    let date = new Date();
    chunk.stat.atime = date;
    chunk.stat.mtime = date;
    cb(null, chunk);
  })
}

// Theme Watch
async function themeWatch() {
  const listen = spawn('theme', ['watch'], { cwd: '..' });
  listen.stdout.on('data', data => {
    let info = data.toString();
    let time = info.split('[development]')[0];
    let message = info.split('[development]')[1];
    if (info.indexOf('Warning') > -1) {
      console.log(warning(message));
    } else {
      console.log(cyanBold(time) + white(message));
    }
  });
  listen.stderr.on('data', data => {
    console.log(warning(data.toString()));
  });
  listen.on('exit', code => {
    console.log(warning('child process exited with code ') + warning(code.toString()));
  });
}

// Theme Download
async function themeDownload() {
  return spawn('theme', ['download'], { cwd: '..', stdio: 'inherit' });
}

// Stylesheet
async function scss() {
  return src('sass/**/*.scss.liquid')
    .pipe(plumber())
    .pipe(sass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename('dev-custom.css'))
    .pipe(runT2())
    .pipe(dest('../assets/'));
}

// JavaScript
async function js() {
  return src('js/app.js')
    .pipe(plumber())
    .pipe(include())
      .on('error', console.log)
    .pipe(babel(babelOptions))
    .pipe(concat('dev-custom.js'))
    .pipe(rename('dev-custom.min.js'))
    .pipe(uglify())
    .pipe(runT2())
    .pipe(dest('../assets/'));
}

// Vendors
async function vendorCss() {
  return src('vendor/css/*.css')
    .pipe(plumber())
    .pipe(concat('vendors.css'))
    .pipe(dest('../assets/'))
}
async function vendorJs() {
  return src('vendor/js/vendor.js')
    .pipe(plumber())
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('vendors.js'))
    .pipe(runT2())
    .pipe(dest('../assets/'))
}

// Watch
async function listen(cb) {
  watch('sass/**/*.scss', series(scss));
  watch('js/**/*.js', series(js));
  watch('vendor/css/*.css', series(vendorCss));
  watch('vendor/js/**/*.js', series(vendorJs));
}

const build = series([themeWatch, scss, js, vendorCss, vendorJs, listen]);
const td = series(themeDownload);
exports.default = build;
exports.themeDownload = td;
