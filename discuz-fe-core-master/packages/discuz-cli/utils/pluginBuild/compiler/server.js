const webpackDevServer = require( 'webpack-dev-server' );
const address = require( 'address' );
module.exports = function server(data) {
    return new Promise((resolve, reject) => {
        const { compiler, config } = data;
        const { devServer } = config;
        const { host, port } = devServer;
    
        const server = new webpackDevServer( compiler, devServer );
        server.start( port, host, err => {
            err && console.log( err );
        } );
    })
    
}