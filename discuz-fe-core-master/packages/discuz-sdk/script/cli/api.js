/**
 * api 初始文件创建脚本
 */
const chalk = require('chalk');
const gulp = require('gulp');
const template = require('gulp-template');
const conflict = require('gulp-conflict');
const rename = require('gulp-rename');
const path = require('path');

const apiTemplate = function (answers) {
  const source = path.join(__dirname, '../../template/api/index.js');
  const { destDir, requestNamePrefix, requestName } = answers;
  let filename = `${requestNamePrefix}-${requestName.toLowerCase()}.js`;
  if (!requestNamePrefix) filename = `${requestName.toLowerCase()}.js`;
  const destFilename = `${destDir}/${filename}`;

  gulp.src(source)
    .pipe(template(answers))
    .pipe(rename(filename))
    .pipe(conflict(destDir))
    .pipe(gulp.dest(destDir))
    .on('end', () => {
      console.log(chalk.green(`API 文件创建成功，地址：${destFilename}`));
    });
};

module.exports = {
  apiTemplate,
};
