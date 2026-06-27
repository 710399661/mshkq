const path = require('path');
const cwd = process.cwd();

module.exports = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '@components': path.resolve(cwd, './components'),
    '@layout': path.resolve(cwd, './layout'),
    '@utils': path.resolve(cwd, './utils'),
    '@pages': path.resolve(cwd, './pages'),
    '@config': path.resolve(cwd, './config'),
    '@middleware': path.resolve(cwd, './middleware'),
    // 公共目录
    '@common': path.resolve(cwd, '../common'),
    '@server': path.resolve(cwd, '../common/server'),
    '@store': path.resolve(cwd, '../common/server'),

  });
  // eslint-disable-next-line no-param-reassign
  config.resolveLoader.alias = Object.assign({}, config.resolveLoader.alias, {
    '@components': path.resolve(cwd, './components'),
    '@layout': path.resolve(cwd, './layout'),
    '@utils': path.resolve(cwd, './utils'),
    '@pages': path.resolve(cwd, './pages'),
    '@config': path.resolve(cwd, './config'),
    '@middleware': path.resolve(cwd, './middleware'),
    // 公共目录
    '@common': path.resolve(cwd, '../common'),
    '@server': path.resolve(cwd, '../common/server'),
    '@store': path.resolve(cwd, '../common/server'),
  });

  return config;
};
