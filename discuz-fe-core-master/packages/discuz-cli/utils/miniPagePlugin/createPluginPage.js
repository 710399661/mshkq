const path = require('path');
const fs = require('fs');
const { MINI_PLUGIN_DIR_NAME, MINI_PLUGIN_CONFIG_PATH, MINI_PAGE_CONFIG_FLIE_NAME } = require('../../constants');
const infoLog = require('../console/infoLog');
const log = require('../console/log');
const errorLog = require('../console/errorLog');
module.exports = function createPluginPage(plugin) {
  const { path: pagePath, miniPageConfig = {}, platform, pluginName } = plugin;

  try {
    const cwd = process.cwd();
    const PLUGIN_PAGE_DIR_PATH = path.resolve(cwd, './src', MINI_PLUGIN_DIR_NAME);
    if (!fs.existsSync(PLUGIN_PAGE_DIR_PATH)) {
      fs.mkdirSync(PLUGIN_PAGE_DIR_PATH);
    }


    if (!platform || platform.indexOf('mini') === -1) {
      return;
    }
    infoLog(`生成${pluginName}插件页面...`);
    const template = fs.readFileSync(path.resolve(__dirname, './miniPagePluginTemplate.jsx'), 'utf-8');


    // 正则替换模板
    let newTemplate = template.replace(/\<\@pluginName\@\>/ig, pluginName);
    newTemplate = newTemplate.replace(/\<\@path\@\>/ig, pagePath);
    // 创建目录
    const dirList = pagePath.split('/');
    const preDirList = [];
    for (let i = 0; i < dirList.length; i++) {
      preDirList.push(dirList[i]);
      const currPath = preDirList.join('/');
      const dirPath = path.join(PLUGIN_PAGE_DIR_PATH, currPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
    // 创建文件
    fs.writeFileSync(path.join(PLUGIN_PAGE_DIR_PATH, preDirList.join('/'), 'index.jsx'), newTemplate);
    // 创建小程序配置文件
    fs.writeFileSync(path.join(PLUGIN_PAGE_DIR_PATH, preDirList.join('/'), MINI_PAGE_CONFIG_FLIE_NAME), `export default ${JSON.stringify(miniPageConfig, null, '\t')};`);
    log(`生成${pluginName}插件页面完成！`);
    return {
      name: pluginName,
      pagePath,
    };
  } catch (err) {
    errorLog(`生成${pluginName}插件页面失败！`);
    errorLog(err);
    return null;
  }
};
