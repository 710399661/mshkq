
const path = require( 'path' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' ); // 友好的webpack提示
const WebpackBar = require( 'webpackbar' ); // webpack进度提示
const createOuputFileName = require( '../createOuputFileName' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const webpack = require('webpack');

function getWebpackBaseConfig (commandConfig, chunkhash) {
    const cwd = process.cwd();
    const config = {
        context: cwd,
        mode: process.env.NODE_ENV,
        devtool: process.env.NODE_ENV == 'development' ? 'none' : 'none',
        // 默认输出
        optimization: {},
        output: {
            path: path.resolve(cwd, './dist'),
            filename: createOuputFileName( 'js', chunkhash ),
            publicPath: "/dist/",
            library: ["DZQPlugin", "[name]"],
            libraryTarget: "umd",
            crossOriginLoading: 'anonymous'
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        resolve: {
            extensions: ['.jsx', '.tsx', '.js', '.ts', '.mjs', '.web.js',  '.json', '.web.jsx'],
            mainFields: ['module', 'jsnext:main', 'browser', 'main'],
            modules: [
                path.resolve(cwd, './node_modules'),
                path.resolve(__dirname, '../../../node_modules')
            ],
            alias: {
                react: 'react/umd/react.production.min.js',
                'react-dom': 'react-dom/umd/react.production.min.js',
            }
        },
        module: {
            rules: []
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.DISCUZ_ENV': JSON.stringify(process.env.DISCUZ_ENV)
            })
        ],
    };

    if ( commandConfig.analyzer ) {
        config.plugins.push(
            new BundleAnalyzerPlugin( {
                analyzerMode: 'static', // server
                // analyzerHost: '0.0.0.0',
                // analyzerPort: 9902
            } )
        );
    }

    // 根据参数判断是否开启进度提示
    config.plugins.push(
        new WebpackBar( {
            name: 'DZQ plugin build',
            color: 'green',
        } )
    );

    // 是否开启构建提示
    config.plugins.push(
        new FriendlyErrorsWebpackPlugin( {
            clearConsole: false,
        } )
    )

    return config;
}

module.exports = getWebpackBaseConfig;