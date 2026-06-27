const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// const ENTRY_FILE_NAME = 'dzqui';
let DIST_DIR = 'dist';

sass.compiler = require('sass');

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
    '@babel/plugin-proposal-class-properties',
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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-arrow-functions',
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

function copyJSON(cb) {
  // 以下处理所有的 json
  gulp.src(['components/**/*.json']).pipe(gulp.dest(`${DIST_DIR}/components`));

  gulp.src(['extends/**/*.json']).pipe(gulp.dest(`${DIST_DIR}/extends`));

  gulp.src(['utils/**/*.json']).pipe(gulp.dest(`${DIST_DIR}/utils`));
  gulp.src(['common/**/*.json']).pipe(gulp.dest(`${DIST_DIR}/common`));

  cb();
}

// 拷贝所有的 scss 和 css
function copyScss(cb) {
  gulp.src('./styles/**/*.scss').pipe(gulp.dest(`${DIST_DIR}/styles/`));

  gulp.src('./components/**/*.scss').pipe(gulp.dest(`${DIST_DIR}/components/`));

  gulp.src('./styles/**/*.css').pipe(gulp.dest(`${DIST_DIR}/styles/`));

  gulp.src('./components/**/*.css').pipe(gulp.dest(`${DIST_DIR}/components/`));
  gulp.src(['./common/**/*.css']).pipe(gulp.dest(`${DIST_DIR}/common/`));
  gulp.src(['./common/**/*.scss']).pipe(gulp.dest(`${DIST_DIR}/common/`));

  cb();
}

// 编译所有 js jsx ts tsx
function build(cb) {
  // 构建所有 components 目录下的文件
  gulp
    .src(['common/**/*.jsx', 'common/**/*.js', 'common/**/*.tsx', 'common/**/**/*.ts'])
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(`${DIST_DIR}/common`));

  // 构建所有 components 目录下的文件
  gulp
    .src(['components/**/*.jsx', 'components/**/*.js', 'components/**/*.tsx', 'components/**/**/*.ts'])
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(`${DIST_DIR}/components`));

  // 构建所有 extends 目录下的文件
  gulp
    .src(['extends/**/*.jsx', 'extends/**/*.js', 'extends/**/*.tsx', 'extends/**/*.ts'])
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(`${DIST_DIR}/extends`));

  // 构建所有 utils 目录下的文件
  gulp
    .src(['utils/**/*.jsx', 'utils/**/*.js', 'utils/**/*.tsx', 'utils/**/*.ts'])
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(`${DIST_DIR}/utils`));

  cb();
}

function buildPure(cb) {
  DIST_DIR = 'dist-pure';
  gulp
    .src(['common/**/*.jsx', 'common/**/*.js', 'common/**/*.tsx', 'common/**/**/*.ts'])
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(`${DIST_DIR}/common`));
  gulp
    .src(['components/**/*.jsx', 'components/**/*.js', 'components/**/*.tsx', 'components/**/**/*.ts'])
    .pipe(babel(babelOptionsWithNoCoreJS))
    .pipe(gulp.dest(`${DIST_DIR}/components`));

  // 构建所有 extends 目录下的文件
  gulp
    .src(['extends/**/*.jsx', 'extends/**/*.js', 'extends/**/*.tsx', 'extends/**/*.ts'])
    .pipe(babel(babelOptionsWithNoCoreJS))
    .pipe(gulp.dest(`${DIST_DIR}/extends`));

  // 构建所有 utils 目录下的文件
  gulp
    .src(['utils/**/*.jsx', 'utils/**/*.js', 'utils/**/*.tsx', 'utils/**/*.ts'])
    .pipe(babel(babelOptionsWithNoCoreJS))
    .pipe(gulp.dest(`${DIST_DIR}/utils`));

  copyScss(() => {});

  copyJSON(() => {});

  cb();
}

function buildScss(cb) {
  // gulp.src('./styles/index.scss')
  //     .pipe(sourcemaps.init({ largeFile: true }))
  //     .pipe(sass.sync().on('error', sass.logError))
  //     .pipe(postcss([autoprefixer()]))
  //     .pipe(rename(`${ENTRY_FILE_NAME}.css`))
  //     .pipe(sourcemaps.write('./'))
  //     .pipe(gulp.dest('./dist'));
  cb();
}

function buildCSS(cb) {
  // gulp
  //   .src(`./dist/${ENTRY_FILE_NAME}.css`)
  //   .pipe(sourcemaps.init())
  //   .pipe(postcss([], {}))
  //   .pipe(rename({ suffix: '.min' }))
  //   .pipe(cleanCSS({ compatibility: 'ie8' }))
  //   .pipe(sourcemaps.write('./'))
  //   .pipe(gulp.dest(`./dist`));
  cb();
}

exports.clean = clean;

exports.build = gulp.series(clean, build);
exports.buildScss = gulp.series(buildScss);
exports.buildCss = gulp.series(buildCSS);
exports.copyScss = gulp.series(copyScss);
exports.copyJSON = gulp.series(copyJSON);

exports.buildPure = gulp.series(buildPure);
