const { spawnSync } = require('child_process');
const errorLog = require('./console/errorLog');
module.exports = function runCommand(cwd, command, opt) {

  return new Promise((resolve) => {
    try {
      const result = spawnSync(command, opt, {
        cwd,
        stdio: 'inherit',
        env: process.env,
        shell: true,
        windowsHide: true
      });
      if ( result.status !== 0 ) {
        errorLog(result);
      }
      resolve(result.status === 0);
    } catch(err) {
      errorLog(err.message);
      errorLog(err.stack);
      resolve(false);
    }
  });
};
