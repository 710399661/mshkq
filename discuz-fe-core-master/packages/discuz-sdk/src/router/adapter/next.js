import router from 'next/router';

// https://www.nextjs.cn/docs/api-reference/next/router#routerpush
class WebRouter {
  _options = {
    scroll: true,
    shallow: true,
  }
  router = router;
  push({url, as = '', options = {}} = opt) {
    this.router.push(url, as, { ...this._options, ...options });
  }
  replace({url, as = '', options = {}} = opt) {
    this.router.replace(url, as, { ...this._options, ...options });
  }
  // 预读取页面，只对没有Link标签包裹的路径有效
  prefetch({url, as = ''} = opt) {
    this.router.prefetch(url, as);
  }
  switchTab() {
    console.warn('浏览器不支持switchTab');
  }
  beforePopState(cb) {
    this.router.beforePopState(cb);
  }
  back() {
    this.router.back();
  }
  redirect({url, as = '', options = {}} = opt) {
    if (options.res) {
      options.res.writeHead(ops.status || 302, { Location: url });
      options.res.end();
    } else {
      this.replace({url, as, options});
    }
  }
}

export default new WebRouter();
