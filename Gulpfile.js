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
  presets: ['es2015']
};

// Theme Watch
gulp.task('theme-watch', () => {
  listen.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });
  listen.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });
  listen.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
});

// Stylesheet
gulp.task('css', () => {
  gulp.src('sass/**/*.scss.liquid')
    .pipe(plumber())
    .pipe(sass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename('test.scss.liquid'))
    .pipe(gulp.dest('../assets/'));
});

// JavaScript
const jsFiles = 'js/**/*.js';
const jsDest = '../assets/';
gulp.task('js', () => {
  return gulp.src(jsFiles)
    .pipe(babel(babelOptions))
    .pipe(concat('test.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('test.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

// Watch
gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', gulp.series('css'));
  gulp.watch('js/**/*.js', gulp.series('js'));
});
