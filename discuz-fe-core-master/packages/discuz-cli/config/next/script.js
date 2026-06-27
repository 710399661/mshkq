const cwd = process.cwd();
const path = require('path');
const scriptLoader = require('./loader/script.loader');


module.exports = (config, options) => {
  // 初始化加载器
  options.defaultLoaders.script = scriptLoader(config, options);

  config.module.rules.push({
    test: /\.(tsx|ts|js|mjs|jsx)$/,
    include: [
      path.resolve(cwd),
      path.resolve(cwd, 'node_modules/@discuzq/plugin-center'),
      path.resolve(cwd, '../common')
    ],
    use: [
      {
        loader: '@discuzq/discuz-plugin-loader',
        options: {
          enforce: 'pre',
          pluginPath: null,
        },
      },
    ],
  });

  config.module.rules.unshift({
    test: /\.(tsx|ts|js|mjs|jsx)$/,
    include: [
      path.resolve(cwd, 'node_modules/@discuzq/plugin-center'),
      path.resolve(cwd, '../common')
    ],
    use: options.defaultLoaders.script,
  });
  return config;
};
