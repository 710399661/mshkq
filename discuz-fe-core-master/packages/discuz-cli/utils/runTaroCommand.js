const runÇommand = require('./runCommand');
const { ENV_DEV } = require('../constants');
module.exports = (type, cwd, opts) => new Promise(async (resolve, reject) => {
  if (type === ENV_DEV) {
    await runÇommand(cwd, 'taro', ['build', '--type', opts.type, '--watch']);
  } else {
    const result = await runÇommand(cwd, 'taro', ['build', '--type', opts.type]);
    resolve(result);
  }
});
