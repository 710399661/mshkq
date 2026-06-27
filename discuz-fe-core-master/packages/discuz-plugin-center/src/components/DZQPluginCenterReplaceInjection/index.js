let DZQPluginCenterInjection = () => {};
if (process.env.DISCUZ_ENV === 'mini') {
    // taro项目的小程序
    DZQPluginCenterInjection = require('./adapters/mini.js');
}
if (process.env.DISCUZ_ENV === 'web') {
  DZQPluginCenterInjection = require('./adapters/web.js');
}

export default DZQPluginCenterInjection.default;