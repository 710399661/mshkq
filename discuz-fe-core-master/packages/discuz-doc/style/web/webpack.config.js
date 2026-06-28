const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader', // 配合 autoprefixer +  browserslist 使用，相关配置写在 package.json
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    // stylelint
    new StylelintPlugin({
      files: ['**/*.{html,vue,css,less}'],
      fix: false,
      cache: true,
      failOnError: false,
    }),

    // 单独分离css
    new MiniCssExtractPlugin({
      filename: 'tdesign.css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  devServer: {
    static: './',
    host: '0.0.0.0',
    compress: true,
    port: 9000,
    open: false,
    writeToDisk: true,
    stats: 'errors-only',
  },
};
