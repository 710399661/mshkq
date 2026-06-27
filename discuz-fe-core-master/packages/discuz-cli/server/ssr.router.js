/* eslint-disable no-param-reassign */
const Router = require('koa-router');
const { parse } = require('url');
const { ENV_DEV } = require('../constants');

module.exports = (nextApp, handle) => {
  const router = new Router();

  router.get(/^.*\..*$/, async (ctx, next) => {
    const { req, res } = ctx;
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    ctx.respond = false;
  });

  router.get(/(\/.*)/, async (ctx, next) => {
    const { req, res } = ctx;
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    // 获取变量
    global.dzq_host = process.env.DZQ_SSR_HOST;

    // ssr生产环境暂时使用html输出
    if ( process.env.NODE_ENV === 'development' ) {
      await nextApp.render(ctx.req, ctx.res, pathname, query);
      ctx.respond = false;
    } else {
      const html = await nextApp.renderToHTML(ctx.req, ctx.res, pathname, query);
      ctx.body = html;
    }
  });
  return router;
};

