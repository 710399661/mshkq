const cwd = process.cwd();
const Koa = require('koa');
const getSSRRouter = require('./ssr.router');
const infolog = require('../utils/console/infoLog');
const log = require('../utils/console/log');
const { MS_BUILD_DONE, MS_SERVER_LISTEN_HASTNAME, MS_SERVER_LISTEN_PORT, MS_SERVER_RUNTIME_ADDRESS } = require('../constants');
module.exports = (hostname, port, config) => {
  const next = require(`${cwd}/node_modules/next`); // 必须使用目录中的next
  const nextApp = next(config);
  const handle = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    log(MS_BUILD_DONE);
    infolog(`${MS_SERVER_LISTEN_HASTNAME}${hostname}`);
    infolog(`${MS_SERVER_LISTEN_PORT}${port}`);
    const app = new Koa();
    const router = getSSRRouter(nextApp, handle);

    app
      .use(async (ctx, next) => {
        // eslint-disable-next-line no-param-reassign
        ctx.res.statusCode = 200;
        await next();
      })
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(port, hostname);
    infolog(`${MS_SERVER_RUNTIME_ADDRESS}http://${hostname}:${port}`);
  });
};
