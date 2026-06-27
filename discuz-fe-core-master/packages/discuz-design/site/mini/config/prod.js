const path = require("path");
const webpack = require('webpack');

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  mini: {
    webpackChain(chain) {
      chain.plugin('defineDZQ')
        .use(webpack.DefinePlugin, [
          {
            'process.env.DISCUZ_ENV': JSON.stringify('mini')
          }
        ])
      chain.resolve.alias
        .set('react', path.resolve('./node_modules/react'))
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
