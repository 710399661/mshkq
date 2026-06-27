const webpack = require('webpack');
const DISCUZ_ENV = process.env.VUE_APP_PLATFORM === 'h5' ? '' : 'uniapp';

module.exports = {
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.DISCUZ_ENV': JSON.stringify(DISCUZ_ENV)
      })
    ]
  },
  // https://webpack.docschina.org/configuration/dev-server
  devServer: {
    // port: 8080,
    // 代理请求
    // 更多代理设置请看：https://github.com/chimurai/http-proxy-middleware#options
    proxy: {
      '/api': {
        target: 'https://discuz-dev.dnspod.dev',
        changeOrigin: true,
        ws: true,
      },
    },
    disableHostCheck: true,
  },
};
