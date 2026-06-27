const getEntry = require('./getEntry');
const {isEmptyObject} = require('../typeof');
const errlog = require('../console/errorLog');
const getWebpackBaseConfig = require('./config/webpack.config.base');
const OutputAssets = require('./config/outputAssets-plugin');
module.exports = function getWebpcakConfig(config, server) {

    return new Promise((resolve, reject) => {
        const webpackConfig = getWebpackBaseConfig(config, process.env.NODE_ENV === 'production');
        if (server) {
            webpackConfig.plugins.push(new OutputAssets())
        }
        const entry = getEntry();

        if ( isEmptyObject(entry) ) {
            errlog('没有找到入口文件');
            reject(new Error('没有找到入口文件'));
            return;
        }

        webpackConfig.entry = entry;
        resolve(webpackConfig);
    })

}