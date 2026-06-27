
const log = require('../../../utils/console/log');

module.exports = function watch(data) {
    const { compiler, config } = data;

    return new Promise( ( resolve, reject ) => {
        compiler.watch( {
            aggregateTimeout: 300,
            poll: undefined,
        }, ( err, stats ) => {
            if ( err ) {
                return reject( err );
            }

            let jsonStats = stats.toJson( {
                all: false,
                errors: true,
            } );
            if ( stats.hasErrors() && jsonStats.errors.length > 0 ) {
                let error = new Error( jsonStats.errors[0] );
                error.errors = jsonStats.errors;
                return reject( error );
            }

            log('开始监听变化');
        } );
    } )
}