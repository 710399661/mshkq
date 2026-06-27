const cwd = process.cwd();
const MiniCssExtractPlugin = require(`${cwd}/node_modules/mini-css-extract-plugin`);
const postcssLoader = require('./postcss.loader');
module.exports = (config, { isServer, dev }, loaders = []) => {
  if (!isServer) {
    // eslint-disable-next-line no-param-reassign
    config.optimization.splitChunks.cacheGroups.styles = {
      name: 'styles',
      test: /\.+(scss|sass|css)$/,
      chunks: 'all',
      enforce: true,
    };
  }
  // 不是服务状态下需要压缩
  if (!isServer) {
    config.plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: dev
        ? 'static/css/[name].css'
        : 'static/css/[name].[contenthash:8].css',
      chunkFilename: dev
        ? 'static/css/[name].chunk.css'
        : 'static/css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true
    }));
  }

  const cssLoader = {
    loader: isServer ? 'css-loader/locals' : 'css-loader', // 必须使用1.0.0版本的css-loader
    options: Object.assign(
      {},
      {
        modules: false,
        minimize: !dev,
        sourceMap: dev,
        importLoaders: loaders.length + 1,
      },
    ),
  };

  if (isServer) {
    return ['ignore-loader'];
  }

  return [
    !isServer && dev && 'extracted-loader',
    !isServer && MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader(config),
    ...loaders,
  ].filter(Boolean);
};

