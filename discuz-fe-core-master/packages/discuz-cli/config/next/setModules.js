const cwd = process.cwd();
const path = require('path');
module.exports = (config, options) => {
  config.resolve.modules = [
    path.resolve(cwd, './node_modules'),
    // 联调测试用，本地link
    path.resolve(cwd, './node_modules/@discuzq/cli/node_modules'),
    path.resolve(cwd, './node_modules/@discuzq/sdk/node_modules'),
    path.resolve(cwd, './node_modules/@discuzq/design/node_modules'),

  ];
  return config;
};
