const fs = require('fs');
const path = require('path');

class OutputAssets {
    constructor(opt) {
        // this.outputPath = opt.path || '';
        this.fileName = 'assets';
    }

    apply ( compiler ) {
        compiler.hooks.afterCompile.tap( 'OutputAssets', ( compilation ) => {

            // if ( !this.outputPath) return null;
            // if (!fs.existsSync(this.outputPath)) {
            //     fs.mkdirSync(this.outputPath);
            // }
      
            const {host, port} = compiler.options.devServer;
            var stats = compilation.getStats().toJson( {
                hash: true,
                publicPath: true,
                assets: true,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            } )
            const static_host = `http://${host}:${port}`;
            const static_dir = `/dist`;

            const assetsMap = {};
            for ( let key in stats.entrypoints ) {
                assetsMap[key] = {
                    js: [],
                    css: []
                };
                for ( let i = 0; i < stats.entrypoints[key]['assets'].length; i++ ) {
                    if ( stats.entrypoints[key]['assets'][i].indexOf('.js') !== -1 ) {
                        assetsMap[key]['js'].push(`${static_host}${static_dir}/${stats.entrypoints[key]['assets'][i]}`);
                    } else if ( stats.entrypoints[key]['assets'][i].indexOf('.css') !== -1 ) {
                        assetsMap[key]['css'].push(`${static_host}${static_dir}/${stats.entrypoints[key]['assets'][i]}`);
                    }

                }
            }
            console.log('本地插件配置:\n');
            console.log(JSON.stringify(assetsMap, null, "\t"));

            // fs.writeFileSync( path.resolve(this.outputPath, `${this.fileName}.json`), JSON.stringify(assetsMap, null, "\t"), null, 4 );
        } )

    }
}

module.exports = OutputAssets;