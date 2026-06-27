/**
 * 前端页面所有的新 api
 */
import RequestAPI from './api';
import { RESPONSE_CODE } from './code';
import request from './_example';
/**
 * 初始化实例
 * @param {axios config} options axios 的配置
 */
const apiIns = (options = {}) => {
  // 实例化请求 api
  const api = new RequestAPI(options);
  request.setRequestContext(api);
  return api;
};

export {
  apiIns,
  RESPONSE_CODE,
};
