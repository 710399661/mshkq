const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const webpack = require('webpack');
const path = require('path');

const withDZQ = (nextConfig = {}) => Object.assign({}, nextConfig, {
  alias: () => ({
    react: path.resolve(__dirname, './node_modules/react'),
    'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    '@discuzq/design': path.resolve(__dirname, '../../components')
  }),
  webpack(config) {
    /**
      * 将 上层组件库目录 加入编译 include
      */
    config.module.rules[0].include.push(path.resolve(__dirname, '../../'));
    config.module.rules[0].include.push(path.resolve(__dirname, '../../../'));


    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@discuzq/design': path.resolve(__dirname, '../../components')
    });
    // eslint-disable-next-line no-param-reassign
    config.resolveLoader.alias = Object.assign({}, config.resolveLoader.alias, {
      '@discuzq/design': path.resolve(__dirname, '../../components')
    });

    /**
      * 条件编译
    */
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.DISCUZ_ENV': JSON.stringify('web'),
    }));

    /**
     * 加载字体
     */
    config.module.rules.push({
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
      use: [{ loader: 'url-loader?mimetype=application/font-woff' }],
    });

    config.module.rules.push({
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      use: [{ loader: 'file-loader?name=[name].[ext]' }],
    });

    return config;
  },
});

module.exports = withImages(withSass(withCSS(withDZQ())));

