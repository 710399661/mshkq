const path = require('path');
const getCurrPath = require('../utils/getCurrPath');
const createDir = require('../utils/fs/createDir');
const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const log = require('../utils/console/log');
const copyFile = require('../utils/fs/copyFile');
const runÇommand = require('../utils/runCommand');
const {
  MS_INIT_PROJECT,
  PLATFORM_MINI,
  DEFAULT_NEXT_PROJECT_TEMPLATE_PATH,
  DEFAULT_TARO_PROJECT_TEMPLATE_PATH,
  MS_INIT_SUCCESS,
  MS_INSTALL_START,
  MS_INSTALL_SUCCESS,
  MS_INSTALL_ERROR,
} = require('../constants');

// eslint-disable-next-line no-unused-vars
function initProject(projectName, options) {
  const { platform } = options;
  const CURR_RUN_PATH = getCurrPath();
  const TARGET_PROJECT_PATH = path.join(CURR_RUN_PATH, projectName);
  infolog(MS_INIT_PROJECT);
  return createDir(TARGET_PROJECT_PATH)
    .then(() => {
      let DEFAULT_TEMPLATE_PATH;
      if (platform === PLATFORM_MINI) {
        DEFAULT_TEMPLATE_PATH = DEFAULT_TARO_PROJECT_TEMPLATE_PATH;
      } else {
        DEFAULT_TEMPLATE_PATH = DEFAULT_NEXT_PROJECT_TEMPLATE_PATH;
      }
      const SOURCE_TEMPLATE_PATH = path.join(__dirname, DEFAULT_TEMPLATE_PATH);
      return copyFile(SOURCE_TEMPLATE_PATH, TARGET_PROJECT_PATH);
    })
    .then(() => {
      log(MS_INIT_SUCCESS);
      infolog(MS_INSTALL_START);
      const result = runÇommand(TARGET_PROJECT_PATH, 'npm', ['install']);
      if (result) {
        infolog(MS_INSTALL_SUCCESS);
      } else {
        errorlog(MS_INSTALL_ERROR);
      }
      return true;
    })
    .catch((msg) => {
      errorlog(msg);
      return false;
    });
}

module.exports = initProject;
