/**
 * 描述：提交扩展字段
 */
import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 入参验证规则，具体配置请看：https://github.com/yiminghe/async-validator
 *
 * @example
 *  const validateRules = {
 *    name: {
 *      type: 'number',
 *      required: true,
 *    },
 *  };
 */

const validateRules = {
};

/**
 * 描述：提交扩展字段
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function setSignInFields(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/user/signinfields.create', // 请求地址
      method: 'POST',
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

