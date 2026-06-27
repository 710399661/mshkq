const { DZQ_DEBUG_ERROR, MS_INIT_FAIL } = require('../../constants');
const debug = require('debug')(DZQ_DEBUG_ERROR);
const cpy = require('cpy');
module.exports = (sourcePath, targetPath) => new Promise(async (resolve, reject) => {
  try {
    await cpy(['./**', '.babelrc', '.*', '.gitignore', '!package-lock.json', '!node_modules/**'], targetPath, {
      parents: true,
      cwd: sourcePath,
      ignoreJunk: false,
    });
    resolve();
  } catch (err) {
    debug(err.message);
    debug(err.stack);
    reject(MS_INIT_FAIL);
  }
});
