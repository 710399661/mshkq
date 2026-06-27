const webpack = require('webpack');
const util = require('util');
const path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"development"'
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
  h5: {}
}