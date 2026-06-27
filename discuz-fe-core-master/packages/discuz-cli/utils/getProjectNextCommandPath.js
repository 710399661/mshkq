const getCurrPath = require('./getCurrPath');
const fs = require('fs');
const path = require('path');
module.exports = () => {
  const cwd = getCurrPath();
  const PROJECT_NEXT_CLI_PATH = path.resolve(cwd, './node_modules/.bin/next');
  if (fs.existsSync(PROJECT_NEXT_CLI_PATH)) {
    return PROJECT_NEXT_CLI_PATH;
  }
  return null;
};
