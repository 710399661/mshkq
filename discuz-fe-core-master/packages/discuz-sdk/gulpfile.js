const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const clean = require('gulp-clean');
const babel = require('gulp-babel');

const babelOptionsWithNoCoreJs = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: false,
        targets: { "browsers": ["> 1%", "last 2 versions", "not ie <= 9"] },
        // targets: {
        //   browsers: [
        //     'chrome >= 50',
        //   ],
        // },
        exclude: [],
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-runtime',
  ],
};

// 生成文档
gulp.task('docs', (cb) => {
  const config = require('./jsdoc.json');
  return gulp
    .src('./docs', { allowEmpty: true })
    .pipe(clean())
    .pipe(gulp.src(['README.md', './src/**/*.js'], { read: false }))
    .pipe(jsdoc(config, cb));
});

gulp.task('clean', () => gulp
  .src('./dist', { allowEmpty: true })
  .pipe(clean()));

// babel 构建
gulp.task('build', () => gulp
  .src('./src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist')));

// babel 构建
gulp.task('build-pure', () => gulp
  .src('./src/**/*.js')
  .pipe(babel(babelOptionsWithNoCoreJs))
  .pipe(gulp.dest('./dist-pure')));

gulp.task('watch', () => gulp.watch('src/**/*.js', gulp.series('build')));
