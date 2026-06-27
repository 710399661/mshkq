/**
 * 描述：获取用户发帖权限
 */
import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 *
 *
 * @example
 *  const validateRules = {
 *
 *  };
 */
const validateRules = {

};

/**
 * 描述：获取站点配置
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readForum(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/forum', // 请求地址
      method: 'GET',
      params,
      data,
      ...others,
      validateRules,
    };
    const result = await request.dispatcher(options);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

