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

  // webpack 5 + css-loader 6.x: 不再使用 css-loader/locals，统一使用 css-loader
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: false,
      minimize: !dev,
      sourceMap: dev,
      importLoaders: loaders.length + 1,
    },
  };

  if (isServer) {
    // SSR 环境下使用 css-loader (不提取 CSS)
    return [
      cssLoader,
      postcssLoader(config),
      ...loaders,
    ];
  }

  return [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader(config),
    ...loaders,
  ];
};

