

module.exports = function build(data) {
    const { compiler, config } = data;

    return new Promise( ( resolve, reject ) => {
        compiler.run( ( err, stats ) => {
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

            return resolve( {
                stats,
                outputPath: compiler.options.output.path
            } );
        } );
    } )
}