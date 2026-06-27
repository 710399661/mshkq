/* eslint-disable no-param-reassign */
const Router = require('koa-router');
const { parse } = require('url');
const send = require('koa-send');

module.exports = (dir) => {
  const router = new Router();

  router.get(/.*/, async (ctx, next) => {
    const { req, res } = ctx;
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    await send(ctx, pathname, {
      root: dir,
      index: 'index.html',
    });
  });
  return router;
};

