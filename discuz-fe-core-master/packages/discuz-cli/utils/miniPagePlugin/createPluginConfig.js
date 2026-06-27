const path = require('path');
const fs = require('fs');
const {MINI_PLUGIN_CONFIG_PATH} = require('../../constants');
const infoLog = require('../console/infoLog');
const log = require('../console/log');
const errorLog = require('../console/errorLog');

module.exports = function createPluginConfig(completePluginList) {
    try {
        infoLog('创建小程序页面插件路由配置...');
        const cwd = process.cwd();
        const PLUGIN_CONFIG_PATH = path.resolve(cwd, './src', MINI_PLUGIN_CONFIG_PATH);

        const pageList = completePluginList.map((item, key) => {
            const target = `${item.pagePath}/index`;
            if (target[0] === '/') {
                return target.slice(1);
            }
            return target
        });
        
        fs.writeFileSync(PLUGIN_CONFIG_PATH, `module.exports = {\nroot: 'pluginPages',\npages: ${JSON.stringify(pageList, null,"\t")}}`);
        log('创建小程序页面插件路由配置完成！');
        return true;
    } catch(err) {
        errorLog(`创建小程序页面插件路由配置失败！`);
        errorLog(err);
        return false;
    }
}