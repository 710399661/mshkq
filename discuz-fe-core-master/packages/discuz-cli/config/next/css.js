const cwd = process.cwd();
const path = require('path');
const MiniCssExtractPlugin = require(`${cwd}/node_modules/mini-css-extract-plugin`);
const cssLoaders = require('./loader/css.loader');
const cssModuleLoaders = require('./loader/cssModule.loader');

module.exports = (config, options) => {
  // 纯css文件
  function isCSSFile(filePath) {
    return /\.css$/i.test(filePath) && !/\.module\.css$/i.test(filePath);
  }

  // 需要使用css module的文件
  function isCSSModulesFile(filePath) {
    return /\.module\.css$/i.test(filePath);
  }

  // 初始化加载器
  // eslint-disable-next-line no-param-reassign
  options.defaultLoaders.css = cssLoaders(config, options);
  // eslint-disable-next-line no-param-reassign
  options.defaultLoaders.cssModule = cssModuleLoaders(config, options);

  // xx.module.css进行css module处理
  config.module.rules.push({
    test: isCSSModulesFile,
    use: options.defaultLoaders.cssModule,
    // include: [
    //   path.resolve(cwd, 'node_modules'),
    // ],
  });

  // 普通css处理
  config.module.rules.push({
    test: isCSSFile,
    use: options.defaultLoaders.css,
    // include: [
    //   path.resolve(cwd, 'node_modules'),
    // ],
  });

  // css导出插件
  if (options.isServer) {
    config.plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: options.dev
        ? 'static/css/[name].css'
        : 'static/css/[name].[contenthash:8].css',
      chunkFilename: options.dev
        ? 'static/css/[name].chunk.css'
        : 'static/css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true
    }));
  }

  return config;
};
