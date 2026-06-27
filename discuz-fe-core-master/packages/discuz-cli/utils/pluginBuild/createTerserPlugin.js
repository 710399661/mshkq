
const TerserPlugin = require( 'terser-webpack-plugin' );
const path = require( 'path' );

module.exports = function ( config ) {

    const DEFAULT_TERSER_OPTION = {
        parse: {
            ecma: 8,
        },
        compress: {
            drop_console: false,
            drop_debugger: true,
            ecma: 5,
            comparisons: false,
            warnings: false,
            inline: 2,
            collapse_vars: true,
            reduce_vars: true
        },
        mangle:{
            safari10: true
        },
        output: {
            ecma: 5,
            ascii_only: true,
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
            safari10: true
        }
    }
    
    return new TerserPlugin( {
        cache: false,
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: DEFAULT_TERSER_OPTION
    } );
}