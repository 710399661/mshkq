const path = require('path');
const fs = require('fs');
const {TARO_PROJECT_CONFIG_FILE_NAME} = require('../constants');
const warnlog = require('../utils/console/warnlog');
const errorLog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');

module.exports = function setTaroProjectConfig(cwd, appid) {
    try {
        const projectConfigPath = path.resolve(cwd, TARO_PROJECT_CONFIG_FILE_NAME);
        if (!fs.existsSync(projectConfigPath)) {
            warnlog(`没有找到小程序配置文件，无法编译。${path}`);
        }
        const config = require(projectConfigPath);
        config.appid = appid;

         // 当命令行传入host或者appid时，优先级更高。
        if ( process.env.DISCUZ_CONFIG_APPID ) {
            config.appid = process.env.DISCUZ_CONFIG_APPID;
        }

        infolog(`当前编译appid为：${config.appid}`)

        fs.writeFileSync(projectConfigPath, JSON.stringify(config, null, "\t"), 'utf8',)
    } catch(err) {
        errorLog(`写入appid失败，${err.message}`);
    }
}