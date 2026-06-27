const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');

// const ENTRY_FILE_NAME = 'dzqui';
let DIST_DIR = 'dist';

// 这里是否要在组件库层使用垫片存疑
// babel 中处理兼容性垫片
const babelOptions = {
  presets: [
    [
      '@babel/env',
      {
        targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 9'] },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    // ["@babel/plugin-proposal-decorators",{"legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      'module-resolver', {
        root: ['./'],
        alias: {
          '@node_modules': '../node_modules',
          '@extends': './extends',
          '@components': './components',
        },
      },
    ]],
};

const babelOptionsWithNoCoreJS = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: false,
        targets: { "browsers": ["> 1%", "last 2 versions", "not ie <= 9"] },
        exclude: [],
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    // '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-arrow-functions',
    ["@babel/plugin-proposal-decorators",{"legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      'module-resolver', {
        root: ['./'],
        alias: {
          '@node_modules': '../node_modules',
          '@extends': './extends',
          '@components': './components',
        },
      },
    ]],
};

async function clean(cb) {
  await del([`${DIST_DIR}/**`], { force: true });
  cb();
}

// 编译所有 js jsx ts tsx
function build(cb) {
  // 构建所有 components 目录下的文件
  gulp
    .src(['src/**/*.jsx', 'src/**/*.js', 'src/**/*.tsx', 'src/**/**/*.ts'])
    .pipe(babel(babelOptionsWithNoCoreJS))
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(`${DIST_DIR}/`));

  cb();
}

exports.clean = clean;

exports.build = gulp.series(build);
// exports.build = gulp.series(clean, build);
