const fs = require('fs');
const path = require('path');
const getCurrPath = require('./getCurrPath');
const { PACKAGE_FILE_NAME, DEFAULT_BUILD_NEXT_DIR_NAME } = require('../constants');
module.exports = () => {
  const currPath = getCurrPath();
  const FILE_PATH = path.resolve(currPath, PACKAGE_FILE_NAME);
  if (fs.existsSync(FILE_PATH)) {
    const pkg = require(FILE_PATH);
    return pkg || null;
  }
  return DEFAULT_BUILD_NEXT_DIR_NAME;
};
