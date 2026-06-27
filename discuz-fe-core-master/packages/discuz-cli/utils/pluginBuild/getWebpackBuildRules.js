const script = require( './modules/script' );
const style = require( './modules/style' );
const images = require( './modules/images' );
module.exports = ( config ) => {
    return new Promise( ( resolve, reject ) => {
        // js构建配置
        config = script( config );
        // 配置样式
        config = style( config );
        // 配置图片
        // 下载webpack-image-loader会下载失败
        // config = images( config );
        
        resolve( config );
    } );
}
