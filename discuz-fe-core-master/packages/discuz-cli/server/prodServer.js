
const cwd = process.cwd();
const Koa = require('koa');
const serve = require('koa-static');
const getSSRRouter = require('./ssr.router');
const getCSRRouter = require('./csr.router');
const infolog = require('../utils/console/infoLog');
const getCurrPath = require('../utils/getCurrPath');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const uuid = require('node-uuid');
const clsLog = require('../utils/cloud/clsLog');

const { MS_SERVER_LISTEN_HASTNAME, MS_SERVER_LISTEN_PORT, MS_SERVER_RUNTIME_ADDRESS, DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_SYMBLIC_LINK, DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_LAST } = require('../constants');
module.exports = (ssr, hostname, port, config) => {
  if (ssr) {
    const next = require(`${cwd}/node_modules/next`); // 必须使用目录中的next
    const nextApp = next(config);
    const handle = nextApp.getRequestHandler();
    nextApp.prepare().then(() => {
      infolog(`${MS_SERVER_LISTEN_HASTNAME}${hostname}`);
      infolog(`${MS_SERVER_LISTEN_PORT}${port}`);
      const app = new Koa();
      const router = getSSRRouter(nextApp, handle);

      app
        .use(serve(getCurrPath() + '/public'))
        .use(async (ctx, next) => {
        // eslint-disable-next-line no-param-reassign
          ctx.res.statusCode = 200;
          await next();
        })
        // 心跳检测不走入next
        .use(async (ctx, next) => {
          // eslint-disable-next-line no-param-reassign
            // ctx.res.statusCode = 200;
            const { headers } = ctx.req;
            if ( headers['user-agent'] === 'clb-healthcheck' ) {
              ctx.res.statusCode = 200;
              ctx.body = {
                msg: '心跳检测反馈',
                data: {},
                code: 0
              }
            } else {
                await next();
            }
            
        })
        .use(async (ctx, next) => {
          // console.log(process.env.DZQ_SSR_HOST);
          // console.log('request', headers['user-agent']);
          const url = ctx.path;
          global.clsLog = clsLog;

          clsLog.init({
            LOG_TASKID: uuid.v4(),
            LOG_METHOD: ctx.request.method,
            LOG_HOST: ctx.request.host,
            LOG_URL: ctx.request.url,
            LOG_UA: ctx.request.header['user-agent'],
          });

          await next();
          if ( !url.startsWith('/api') && !url.startsWith('/plugin') && !url.startsWith('/_next/static')) {
            clsLog.console({
              LOG_TYPE: 'page',
              LOG_PAGE_STATUS: ctx.res.statusCode,
              LOG_PAGE_LENGTH: ctx.body ? ctx.body.length : 0
            });
          }
        })
        .use(async (ctx, next) => {
          const url = ctx.path;
          if ( process.env.DZQ_SSR_HOST && (url.startsWith('/api') || url.startsWith('/plugin')) ) {
            ctx.respond = false;
            await k2c(
              createProxyMiddleware({
                target: process.env.DZQ_SSR_HOST || '',
                changeOrigin: true,
                secure: false,
              }),
            )(ctx, next);
          } else {
            await next();
          }
        })
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(port, hostname);
      infolog(`${MS_SERVER_RUNTIME_ADDRESS}http://${hostname}:${port}`);
    });
  } else {
    infolog(`${MS_SERVER_LISTEN_HASTNAME}${hostname}`);
    infolog(`${MS_SERVER_LISTEN_PORT}${port}`);
    const app = new Koa();
    const dir = `${cwd}/${config.conf.distDir}${DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_SYMBLIC_LINK}${DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_LAST}`;
    const router = getCSRRouter(dir);

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
  };
};
