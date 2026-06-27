'use strict';

const gulp = require('gulp');
const { series, src, dest } = gulp;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');

function compileComponents() {
  return src('./src/components/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./dist/components/'));
}

function compileTheme() {
  return src('./src/theme/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./dist/theme/'));
}

function compileEntry() {
  return src('./src/index.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./dist/'));
}

function compileComp() {
  return src('./src/components.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./dist/'));
}

gulp.task('clean', () => src('./dist', { allowEmpty: true })
  .pipe(clean()));

exports.build = series(compileComponents, compileTheme, compileEntry, compileComp);
