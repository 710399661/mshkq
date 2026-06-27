const findUp = require('find-up');

module.exports = (cwd, env) => {
  const DEFAULT_NEXT_CONFIG_FILE_NAME = 'next.config.js';
  const OPTION = {
    cwd,
  };
  const defaultNextConfigPath = findUp.sync(DEFAULT_NEXT_CONFIG_FILE_NAME, OPTION);
  if (defaultNextConfigPath) {
    return require(defaultNextConfigPath);
  }
  return null;
};
