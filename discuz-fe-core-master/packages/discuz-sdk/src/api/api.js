import Request from '../request';
import { validateParameter } from '../request/validator';
import qs from 'qs';

/**
 * 请求的 API 基类
 * 目前主要是用于初始化
 */
export default class RequestAPI {
  /**
   * 请求api的构造函数
   * @param {axios config} options axios 的配置
   */
  constructor(options) {
    this.axiosConfig = { ...options, timeoutErrorMessage: '' };
    this.createHttp();
  }

  /**
   * 初始化默认请求实例
   */
  createHttp() {
    this.http = Request.create({
      isValidate: true,
      withCredentials: true,
      timeout: 1000,
      paramsSerializer(params) {
        // https://www.npmjs.com/package/qs
        return qs.stringify(params, { arrayFormat: 'indices', encode: false });
      },
      ...this.axiosConfig,
    });
    this.setHttpRequestInterceptors();
    this.setHttpResponseInterceptors();
  }

  /**
   * 设置默认的请求拦截器
   */
  setHttpRequestInterceptors() {
    // 校验参数处理
    this.http.interceptors.request.use(validateParameter, e => e, { synchronous: true });
  }

  /**
   * 设置默认的响应实例
   */
  setHttpResponseInterceptors() {
    // 请求响应处理，可以写多个请求响应的拦截处理
  }
}
