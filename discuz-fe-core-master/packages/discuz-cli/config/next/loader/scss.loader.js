const cwd = process.cwd();
const postcssLoader = require('./postcss.loader');
module.exports = (config, { isServer, dev }, loaders = []) => {
  if (!isServer) {
    config.optimization.splitChunks.cacheGroups.styles = {
      name: 'styles',
      test: /\.+(scss|sass|css)$/,
      chunks: 'all',
      enforce: true,
    };
  }

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      modules: false,
      importLoaders: loaders.length + 2,
    },
  };

  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: dev,
    },
  };

  if (isServer) {
    return [
      cssLoader,
      postcssLoader(config),
      sassLoader,
      ...loaders,
    ];
  }

  return [
    require.resolve('mini-css-extract-plugin').replace(/index\.js$/, 'loader.js'),
    cssLoader,
    postcssLoader(config),
    sassLoader,
    ...loaders,
  ];
};

