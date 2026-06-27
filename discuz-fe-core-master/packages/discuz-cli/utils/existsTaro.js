const findUp = require('find-up');
const path = require('path');

module.exports = (cwd) => {
  if (!findUp.sync('taro', { cwd: path.resolve(cwd, './node_modules/.bin') })) {
    return false;
  }
  return true;
};
