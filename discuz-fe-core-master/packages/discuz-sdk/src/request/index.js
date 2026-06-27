/**
 * Request 请求
 */
import axios from 'axios';
import defaultConfig from './defaults';

const Request = axios;

// 设置默认配置
Request.defaults = { ...Request.defaults, ...defaultConfig };

if (process.env.DISCUZ_ENV === 'mini') {
  // taro项目的小程序
  const adapter = require('./adapter/taro.js');
  Request.defaults.adapter = adapter.taroAdapter;
}
if (process.env.DISCUZ_ENV === 'uniapp') {
  // 给 uniapp 项目预留的口子，主要是因为要兼容老的项目的使用
  const adapter = require('./adapter/uniapp.js');
  Request.defaults.adapter = adapter.uniAdapter;
}

export { Request };
export default Request;
