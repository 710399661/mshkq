import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 描述：删除用户微信信息
 */
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
  id: {
    type: 'number',
    required: true,
  }
};

/**
 * 描述：删除用户微信信息
 * 请求方式：DELETE
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function deleteWechat(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/users.v2/wechat', // 请求地址
      method: 'DELETE',
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

