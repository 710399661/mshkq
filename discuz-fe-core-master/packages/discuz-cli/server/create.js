const devServer = require('./devServer');
const prodServer = require('./prodServer');
const { ENV_DEV } = require('../constants');
module.exports = (ssr, options) => new Promise((res) => {
  const { env, config, port, hostname } = options;
  if (env === ENV_DEV) {
    devServer(hostname, port, config);
  } else {
    prodServer(ssr, hostname, port, config);
  }
});
