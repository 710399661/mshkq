const path = require('path');
const getCurrPath = require('../utils/getCurrPath');
const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const getDevNextConfig = require('../config/next.dev.config');
const createServer = require('../server/create');
const { ENV_DEV, MS_BUILD_START, PLATFORM_WEB, MS_NOT_FIND_NEXT_COMMAND, MS_NOT_FIND_TARO_COMMAND, PLATFORM_MINI, ENV_SSR, PLUGIN_IMPORT, PLUGIN_IMPORT_SUCCESS, PLUGIN_IMPORT_ERROR } = require('../constants');
const existsNext = require('../utils/existsNext');
const existsTaro = require('../utils/existsTaro');
const runTaroCommand = require('../utils/runTaroCommand');
const getProjectConfigYaml = require('../utils/getProjectConfigYaml');
const setTaroProjectConfig = require('../utils/setTaroProjectConfig');
const miniPagePlugin = require('../utils/miniPagePlugin');
const importPlugin = require('../utils/importPlugin');
const clearImportPlugin = require('../utils/clearImportPlugin');
// eslint-disable-next-line no-unused-vars
function devProject(options) {
  process.env.DISCUZ_RUN = ENV_SSR;
  const { platform, port, hostname, type, plugin } = options;
  const CURR_RUN_PATH = getCurrPath();
  infolog(MS_BUILD_START);

  // web构建
  if (platform === PLATFORM_WEB) {
    process.env.DISCUZ_ENV = PLATFORM_WEB;
    if (!existsNext(CURR_RUN_PATH)) {
      errorlog(MS_NOT_FIND_NEXT_COMMAND);
      return false;
    }
    const envConfig = { cwd: CURR_RUN_PATH, env: ENV_DEV };
    return getDevNextConfig(envConfig)
      .then(config => createServer(true, { ...envConfig, port, hostname, config }))
      .then(() => true)
      .catch((msg) => {
        errorlog(msg);
        return false;
      });
  }

  // 小程序构建
  return new Promise(async (resolve, reject) => {
    // 提供给小助手使用环境变量传入小程序插件位置
    const miniPluginPath = plugin && plugin !== '' ? plugin : process.env.DISCUZ_MINI_PLUGIN || null;

    // 只有小程序才会读取自定义的插件目录
    if ( miniPluginPath && miniPluginPath !== 0 && platform === PLATFORM_MINI) {
      infolog(PLUGIN_IMPORT);
      const res = await importPlugin(miniPluginPath);
      if (res) {
        infolog(PLUGIN_IMPORT_SUCCESS);
      } else {
        errorlog(PLUGIN_IMPORT_ERROR);
      }
    } else {
      const PROVATE_PLUGIN_PATH = path.resolve(CURR_RUN_PATH, './node_modules/.plugin');
      clearImportPlugin(PROVATE_PLUGIN_PATH);
    }

    if (!existsTaro(CURR_RUN_PATH)) {
      errorlog(MS_NOT_FIND_TARO_COMMAND);
      resolve(false);
    }

    // 读取配置yaml，修改appid
    const yamlConfig = getProjectConfigYaml(CURR_RUN_PATH);
    if ( yamlConfig && yamlConfig.APPID && yamlConfig.APPID !== '' ) {
      setTaroProjectConfig(CURR_RUN_PATH, yamlConfig.APPID);
    }

    process.env.DISCUZ_ENV = PLATFORM_MINI;

    // 小程序新增页面插件处理
    const res = miniPagePlugin(yamlConfig, true);// 暂时dev也统计
    if ( !res ) {
      resolve(false);
    }
    resolve(runTaroCommand(ENV_DEV, CURR_RUN_PATH, { type }));
  })

}

module.exports = devProject;
