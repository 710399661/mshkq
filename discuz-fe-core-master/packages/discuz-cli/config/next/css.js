const cwd = process.cwd();
const path = require('path');
const cssLoaders = require('./loader/css.loader');
const cssModuleLoaders = require('./loader/cssModule.loader');

module.exports = (config, options) => {
  function isCSSFile(filePath) {
    return /\.css$/i.test(filePath) && !/\.module\.css$/i.test(filePath);
  }

  function isCSSModulesFile(filePath) {
    return /\.module\.css$/i.test(filePath);
  }

  options.defaultLoaders.css = cssLoaders(config, options);
  options.defaultLoaders.cssModule = cssModuleLoaders(config, options);

  config.module.rules.push({
    test: isCSSModulesFile,
    use: options.defaultLoaders.cssModule,
  });

  config.module.rules.push({
    test: isCSSFile,
    use: options.defaultLoaders.css,
  });

  return config;
};
