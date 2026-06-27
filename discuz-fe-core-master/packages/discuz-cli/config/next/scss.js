const cwd = process.cwd();
const path = require('path');
const cssLoaders = require('./loader/css.loader');
const cssModuleLoaders = require('./loader/cssModule.loader');

module.exports = (config, options) => {
  // 纯scss文件
  function isSCSSFile(filePath) {
    return /\.s[ac]ss$/i.test(filePath) && !/\.module\.s[ac]ss$/i.test(filePath);
  }

  // 需要使用scss module的文件
  function isSCSSModulesFile(filePath) {
    return /\.module\.s[ac]ss$/i.test(filePath);
  }

  const SASS_LOADER = {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        outputStyle: 'compressed',
      },
    },
  };

  // 初始化加载器
  // eslint-disable-next-line no-param-reassign
  options.defaultLoaders.scss = cssLoaders(config, options, [SASS_LOADER]);
  // eslint-disable-next-line no-param-reassign
  options.defaultLoaders.scssModule = cssModuleLoaders(config, options, [SASS_LOADER]);

  // xx.module.css进行css module处理
  config.module.rules.push({
    test: isSCSSModulesFile,
    use: options.defaultLoaders.scssModule,
  });

  // 普通css处理
  config.module.rules.push({
    test: isSCSSFile,
    use: options.defaultLoaders.scss,
  });

  return config;
};
