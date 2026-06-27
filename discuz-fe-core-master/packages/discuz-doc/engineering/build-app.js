const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const config = require('./webpack-config');

const releasePath = path.resolve(__dirname, '../server/static/release');

// 清理上次构建内容
if (fs.existsSync(releasePath)) {
  rimraf.sync(releasePath);
}

const compiler = webpack(
  config({
    outputPath: releasePath,
  }),
);

compiler.run((error, stats) => {
  if (error) {
    return process.exit(-1);
  }

  // 输出编译报告
  console.log(stats.toString({ colors: true, modules: false }));

  // 保存详细编译状态
  fs.writeFileSync(path.join(releasePath, 'stats.json'), JSON.stringify(stats.toJson()), 'utf8');

  if (stats.hasErrors()) {
    return process.exit(-2);
  }

  // 构建版本文件
  const chunkVersions = {};
  for (const { name, files } of stats.compilation.chunks) {
    chunkVersions[name] = files;
  }
  fs.writeFileSync(path.join(releasePath, 'version.json'), JSON.stringify(chunkVersions, null, 2));
});
