const getCurrPath = require('../utils/getCurrPath');
const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const getDevNextConfig = require('../config/next.prod.config');
const createServer = require('../server/create');
const existsNext = require('../utils/existsNext');
const {
  MS_SERVER_START,
  ENV_PROD,
  MS_NOT_FIND_NEXT_COMMAND,
  PLATFORM_WEB
} = require('../constants');
// eslint-disable-next-line no-unused-vars
function startProject(options) {
  process.env.DISCUZ_ENV = PLATFORM_WEB;
  const { port, hostname, ssr } = options;
  const CURR_RUN_PATH = getCurrPath();
  if (!existsNext(CURR_RUN_PATH)) {
    errorlog(MS_NOT_FIND_NEXT_COMMAND);
    return false;
  }

  infolog(MS_SERVER_START);
  const envConfig = { cwd: CURR_RUN_PATH, env: ENV_PROD };
  return getDevNextConfig(envConfig)
    .then(config => createServer(ssr, { ...envConfig, port, hostname, config }))
    .then(() => true)
    .catch((msg) => {
      errorlog(msg);
      return false;
    });
}

module.exports = startProject;
