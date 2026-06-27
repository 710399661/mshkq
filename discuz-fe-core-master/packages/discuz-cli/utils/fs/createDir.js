const { DZQ_DEBUG_ERROR, MS_DIR_EXIST, MS_BUILD_ERROR } = require('../../constants');
const fs = require('fs');
const debug = require('debug')(DZQ_DEBUG_ERROR);
module.exports = path => new Promise((resolve, reject) => {
  if (fs.existsSync(path)) {
    reject(MS_DIR_EXIST);
  } else {
    try {
      fs.mkdirSync(path);
      resolve();
    } catch (err) {
      debug(err.message);
      debug(err.stack);
      reject(MS_BUILD_ERROR);
    }
  }
});
