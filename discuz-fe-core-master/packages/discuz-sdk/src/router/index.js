let Router = {};
if (process.env.DISCUZ_ENV === 'mini') {
    // taro项目的小程序
    Router = require('./adapter/taro.js');
}
if (process.env.DISCUZ_ENV === 'web') {
    Router = require('./adapter/next.js');
}

export default Router.default;