const cwd = process.cwd();
const path = require('path');
const fs = require('fs');
const warnlog = require('./console/warnlog');
const { DEFAULT_COMMON_CONFIG_FILE_PATH } = require('../constants');
const { isFunction, isObject } = require('../utils/typeof');
module.exports = () => {
    const PATH = path.resolve(cwd, DEFAULT_COMMON_CONFIG_FILE_PATH);
    if ( !fs.existsSync(PATH) ) {
        warnlog(`没有全局config配置文件！配置文件地址：${PATH}`);
        return {};
    }

    const config = require(PATH);
    if ( isFunction(config) ) {
        return config();
    }
    if (isObject(config)) {
        return config;
    }

    warnlog(`${PATH}，配置文件导出必须为Function或者Object`);
    return {};
}