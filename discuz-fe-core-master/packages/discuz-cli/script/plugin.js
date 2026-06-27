const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const log = require('../utils/console/log');
const getWebpcakConfig = require('../utils/pluginBuild/getWebpcakConfig');
const getWebpackBuildRules = require('../utils/pluginBuild/getWebpackBuildRules');
const createWebpackCompiler = require( '../utils/pluginBuild/createWebpackCompiler' );
const createWebpackDevServerConfig = require('../utils/pluginBuild/createWebpackDevServerConfig');
const buildCompiler = require('../utils/pluginBuild/compiler/build');
const watchCompiler = require('../utils/pluginBuild/compiler/watch');
const serverCompiler = require('../utils/pluginBuild/compiler/server');
const initPlugin = require('../utils/pluginBuild/initPlugin');
const publishPlugin = require('../utils/pluginBuild/publishPlugin');
function plugin(options) {
    const {init, publish, build, analyzer, watch, server } = options;
    process.env.BABEL_ENV = (watch || server) ? 'development' : 'production';
    process.env.NODE_ENV = (watch || server) ? 'development' : 'production';
    process.env.DISCUZ_ENV = 'web';


    if (init) {
        return new Promise(async(resolve) => {
            const res = await initPlugin();
            resolve(res);
        } );
    } else {
        return new Promise(async(resolve) => {
            infolog( '创建基本构建配置...' )
    
            getWebpcakConfig(options, server)
                .then( ( webpackConfig ) => {
                    log( '创建基本构建配置完成' )
                    infolog( '创建编译规则...' )
                    return getWebpackBuildRules( webpackConfig );
                } )
                .then( ( webpackConfig ) => {
                    log( '创建编译规则完成' )
                    infolog( '创建编译器...' )
                    if ( server ) {
                        webpackConfig = createWebpackDevServerConfig( webpackConfig );
                    }
                    return createWebpackCompiler( webpackConfig );
                } )
                .then( ( data ) => {
                    log( '创建编译器完成' )
                    infolog( '开始编译...' )
                    if (server) {
                        return serverCompiler(data);
                    } else if ( watch ) {
                        return watchCompiler(data);
                    } else {
                        return buildCompiler(data);
                    }
                } )
                .then( async ( compilerInfo ) => {
                    // 最后
                    // log( 'create webpack config success!' );
                    log( '编译完成' )
                    infolog( `output path:${compilerInfo.outputPath}` )

                    if ( build && publish ) {
                        const res = await publishPlugin();
                        if ( res ) {
                            log( '压缩完成！' )
                        } else {
                            errorlog( '压缩失败！' );
                            errorlog( res );
                        }
                    }

                    resolve( true );
                } )
                .catch( ( err ) => {
                    errorlog( err );
                    resolve( false );
                } )
        } );
    }
}

module.exports = plugin; 