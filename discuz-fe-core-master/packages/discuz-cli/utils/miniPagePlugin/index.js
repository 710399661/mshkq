const path = require('path');
const fs = require('fs');
const initPluginStroe = require('@discuzq/discuz-plugin-loader/initStroe');
const {MINI_PLUGIN_DIR_NAME, MINI_PLUGIN_CONFIG_PATH} = require('../../constants');
const deleteDir = require('../deleteDir');
const infoLog = require('../console/infoLog');
const log = require('../console/log');
const createPluginPage = require('./createPluginPage');
const createPluginConfig = require('./createPluginConfig');
// const miniPluginTj = require('./nodeTj');

module.exports = function miniPagePlugin(dzqConfig, isReport = false) {
    const cwd = process.cwd();
    const PLUGIN_PAGE_DIR_PATH = path.resolve(cwd, './src', MINI_PLUGIN_DIR_NAME);
    
    const pluginStore = initPluginStroe();
    const allPluginList = pluginStore.getAll();

    // if (isReport) {
    //     miniPluginTj(allPluginList, dzqConfig.HOST);
    // }


    const pagePluginList = allPluginList['plugin_system'] && allPluginList['plugin_system']['add_page_hook'] ? allPluginList['plugin_system']['add_page_hook'] : [];
    if ( !pagePluginList ) {
        return;
    }

    // 清空目录
    infoLog('清除旧插件...')
    fs.existsSync(PLUGIN_PAGE_DIR_PATH) && deleteDir(PLUGIN_PAGE_DIR_PATH);
    log('清除旧插件完成！')

    infoLog('开始创建插件页面...');
    const completePluginList = [];
    for ( let key in pagePluginList ) {
        const result = createPluginPage(pagePluginList[key]);
        if ( result ) {
            completePluginList.push(result);
        }
    }
    log('创建插件页面完成！');

    infoLog('开始创建插件页面配置信息...');
    const res = createPluginConfig(completePluginList);
    log('创建插件页面配置信息完成！');
    return res;
}