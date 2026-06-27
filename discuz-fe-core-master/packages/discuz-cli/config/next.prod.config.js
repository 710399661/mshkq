const { DZQ_DEBUG_WARN, MS_NOT_FIND_NEXT_CONFIG, ENV_PROD } = require('../constants');
const debug = require('debug')(DZQ_DEBUG_WARN);
const getBaseConfig = require('./next.base.config');
const getRuntimeConfig = require('./next.runtime.config');
const getNextConfig = require('../utils/getConfigFile');
module.exports = options => new Promise((res) => {
  const { cwd, env } = options;
  const baseConfig = getBaseConfig(cwd);
  const nextConfig = getNextConfig(cwd);
  if (nextConfig) debug(MS_NOT_FIND_NEXT_CONFIG);
  res(Object.assign({}, getRuntimeConfig, { conf: Object.assign({}, baseConfig, nextConfig ), dev: env !== ENV_PROD }));
});
