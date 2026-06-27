'use strict';
const os = require( 'os' );
const path = require('path');
const babelConfig = require( '../createBabelConfig' );
const createTerserPlugin = require( '../createTerserPlugin' );

module.exports = ( config ) => {
  const { module, optimization } = config;
  const { rules } = module;

  // babel
  rules.push( {
    test: /\.(js|jsx|mjs)$/,
    include: [
      // /node_modules\/\@discuzq\/design/,
      path.resolve(process.cwd(), 'src')
    ],
    use: [
      {
        loader: require.resolve( 'babel-loader' ),
        options: babelConfig( config, 'webpack' ),
      }
    ]
  } );

  // js代码压缩
  // optimization.minimize = config.mode == 'production';
  // if ( optimization.minimize ) {
  //   config.optimization.minimizer = [createTerserPlugin( config )];
  // }

  return config;
}