const scriptConfig = require('./script');
const cssConfig = require('./css');
const scssConfig = require('./scss');
const aliasConfig = require('./alias');
const getBaseConfig = require('../next.base.config');
const definePlugin = require('./definePlugin');
const setModules = require('./setModules');
const analyzer = require('./analyzer');
const getCurrPath = require('../../utils/getCurrPath');
const path = require('path');
module.exports = (fn) => {
  const baseConfig = getBaseConfig();
  const cwd = getCurrPath();
  baseConfig.webpack = (config, options) => {
    let nextConfig = config; 

    // javascript配置
    nextConfig = scriptConfig(nextConfig, options);
    // css配置
    nextConfig = cssConfig(nextConfig, options);
    // scss配置
    nextConfig = scssConfig(nextConfig, options);
    // 别名配置
    nextConfig = aliasConfig(nextConfig);
    // 配置别名
    nextConfig = definePlugin(nextConfig, cwd);
    // 配置node_modules范围
    nextConfig = setModules(nextConfig);

    if (nextConfig.mode === 'production') {
      nextConfig.resolve.alias['mobx'] = path.resolve(cwd, './node_modules/mobx/lib/mobx.umd.min.js');
      nextConfig.resolve.alias['mobx-react'] = path.resolve(cwd, './node_modules/mobx-react/dist/mobx-react.umd.js');
      nextConfig.resolve.alias['mobx-react-lite'] = path.resolve(cwd, './node_modules/mobx-react-lite/dist/index.min.js');
    }

    // https://github.com/vercel/next.js/blob/62a4de9f8c23fe753650b78d4bd892d0081bc6b7/packages/next/build/webpack-config.ts
    if (nextConfig.name === 'client' && nextConfig.mode === 'production') {
      nextConfig.optimization.splitChunks = Object.assign(nextConfig.optimization.splitChunks, {
        chunks: 'all', // 异步加载的内容也会进行拆包处理
        minChunks: 2,
        // automaticNameDelimiter: '~',// 共享模块连接符号
        // automaticNameMaxLength: 30, // 最长的共享模块文件名长度
        maxAsyncRequests: 8, // 并发同步加载数量，相当于拆包数量
        // maxInitialRequests: 6, // 动态import的加载数量，相当于动态import的拆包数量
        minSize: 1000000,
        // name: true,
        maxSize: 1000000,
      });
      nextConfig.optimization.splitChunks.cacheGroups = Object.assign(nextConfig.optimization.splitChunks.cacheGroups, {
        // commons: { name: 'commons', minChunks: 5, priority: 0, reuseExistingChunk: true },
        // discuzq: {
        //   test: /[\\/]node_modules[\\/]@discuzq[\\/]/,
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   priority: 60,
        //   enforce: true
        // }
      });
    }

    // nextConfig.resolve.alias['mobx'] = path.resolve(cwd, './node_modules/mobx/lib/mobx.umd.min.js');
    // nextConfig.resolve.alias['mobx-react'] = path.resolve(cwd, './node_modules/mobx-react/dist/mobx-react.umd.js');
    // nextConfig.resolve.alias['mobx-react-lite'] = path.resolve(cwd, './node_modules/mobx-react-lite/dist/index.min.js');
    
    
    return nextConfig;
  };

  return analyzer(fn(baseConfig));
};
