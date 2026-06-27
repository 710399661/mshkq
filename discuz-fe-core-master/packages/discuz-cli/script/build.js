const path = require('path');
const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const projectNextCommandPath = require('../utils/getProjectNextCommandPath');
const runÇommand = require('../utils/runCommand');
const getCurrPath = require('../utils/getCurrPath');
const getProjectName = require('../utils/getProjectName')();
const existsTaro = require('../utils/existsTaro');
const runTaroCommand = require('../utils/runTaroCommand');
const getProjectConfigYaml = require('../utils/getProjectConfigYaml');
const setTaroProjectConfig = require('../utils/setTaroProjectConfig');
const miniPagePlugin = require('../utils/miniPagePlugin');
const importPlugin = require('../utils/importPlugin');
const clearImportPlugin = require('../utils/clearImportPlugin');

const {
  ENV_PROD,
  ENV_STATIC,
  ENV_SSR,
  MS_STATIC_EXPORT_START,
  MS_STATIC_EXPORT_SUCCESS,
  MS_STATIC_EXPORT_ERROR,
  MS_BUILD_SUCCESS,
  MS_BUILD_ERROR,
  PLATFORM_WEB,
  PLATFORM_MINI,
  MS_BUILD_START,
  MS_NOT_FIND_NEXT_COMMAND,
  MS_NOT_FIND_TARO_COMMAND,
  DEFAULT_BUILD_NEXT_DIR_NAME,
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME,
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_LAST,
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_SYMBLIC_LINK,
  PLUGIN_IMPORT, PLUGIN_IMPORT_SUCCESS, PLUGIN_IMPORT_ERROR
} = require('../constants');
// eslint-disable-next-line no-unused-vars
function buildProject(options) {
  const { platform, staticSite, type, plugin } = options;
  const CURR_RUN_PATH = getCurrPath();

  infolog(MS_BUILD_START);
  if (platform === PLATFORM_WEB) {
    process.env.DISCUZ_ENV = PLATFORM_WEB;
    process.env.DISCUZ_RUN = staticSite ? ENV_STATIC : ENV_SSR;

    return new Promise(async (resolve, reject) => {
      const commandPath = projectNextCommandPath();
      if (!commandPath) {
        reject(MS_NOT_FIND_NEXT_COMMAND);
      }
      const result = runÇommand(CURR_RUN_PATH, commandPath, ['build']);
      if (result) {
        infolog(MS_BUILD_SUCCESS);
      } else {
        reject(MS_BUILD_ERROR);
      }

      // 静态输出
      if (staticSite) {
        infolog(MS_STATIC_EXPORT_START);
        const result = runÇommand(CURR_RUN_PATH, commandPath, ['export', '-o', getProjectName === DEFAULT_BUILD_NEXT_DIR_NAME ? DEFAULT_STATIC_BUILD_NEXT_DIR_NAME : `${getProjectName}${DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_SYMBLIC_LINK}${DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_LAST}`]);
        if (result) {
          infolog(MS_STATIC_EXPORT_SUCCESS);
        } else {
          reject(MS_STATIC_EXPORT_ERROR);
        }
      }
      resolve(true);
    })
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
    const res = miniPagePlugin(yamlConfig, true);
    if ( !res ) {
      resolve(false);
    }

    resolve(runTaroCommand(ENV_PROD, CURR_RUN_PATH, { type }));
  })
  
}

module.exports = buildProject;
