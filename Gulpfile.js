'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const csslint = require('gulp-csslint');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const chalk = require('chalk');
const spawn = require('child_process').spawn,
      listen = spawn('theme', ['watch'], {
        cwd: '..'
      });
const autoprefixerOptions = {
  browsers : ['last 3 versions', '> 5%', 'Explorer >= 10', 'Safari >= 8'],
  cascade : false
};
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};
const babelOptions = {
  presets: ['@babel/preset-env']
};
const cyanBold = chalk.cyan.bold;
const white = chalk.white;
const warning = chalk.red;

// Theme Watch
gulp.task('theme-watch', () => {
  listen.stdout.on('data', function (data) {
    let info = data.toString();
    let time = info.split('[development]')[0];
    let message = info.split('[development]')[1];
    if (info.indexOf('Warning') > -1) {
      console.log(warning(message));
    } else {
      console.log(cyanBold(time) + white(message));
    }
  });
  listen.stderr.on('data', function (data) {
    console.log(warning(data.toString()));
  });
  listen.on('exit', function (code) {
    console.log(warning('child process exited with code ') + warning(code.toString()));
  });
});

// Stylesheet
gulp.task('scss', () => {
  return gulp.src('sass/**/*.scss.liquid')
    .pipe(plumber())
    .pipe(sass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename('dev-custom.scss.liquid'))
    .pipe(gulp.dest('../assets/'));
});

// JavaScript
gulp.task('js', () => {
  return gulp.src('js/app.js')
    .pipe(plumber())
    .pipe(babel(babelOptions))
    .pipe(concat('dev-custom.js'))
    .pipe(rename('dev-custom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../assets/'));
});

// Vendors
gulp.task('vendorCss', () => {
  return gulp.src('vendor/css/*.css')
    .pipe(plumber())
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('../assets/'))
});
gulp.task('vendorJs', () => {
  return gulp.src('vendor/js/*.js')
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('../assets/'))
});

// Watch
gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', gulp.series('scss'));
  gulp.watch('js/**/*.js', gulp.series('js'));
  gulp.watch('vendor/css/*.css', gulp.series('vendorCss'));
  gulp.watch('vendor/js/*.js', gulp.series('vendorJs'));
});
