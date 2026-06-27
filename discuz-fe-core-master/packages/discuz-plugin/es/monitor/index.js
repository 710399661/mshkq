"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorScript = void 0;
var Monitor;
if (process.env.DISCUZ_ENV === 'mini') {
    // taro项目的小程序
    Monitor = require('./adapter/taro').default;
}
if (process.env.DISCUZ_ENV === 'web') {
    Monitor = require('./adapter/next').default;
}
exports.default = (function (id) {
    return new Monitor({ id: id });
});
function monitorScript() {
    // @ts-ignore
    return (React.createElement("script", { src: "https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js?_bid=3977" }));
}
exports.monitorScript = monitorScript;
;
