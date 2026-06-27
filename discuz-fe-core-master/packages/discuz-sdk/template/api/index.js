/**
 * 描述：<%= desc %>
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
const validateRules = {};

/**
 * 描述：<%= desc %>
 * 请求方式：<%= requestMethod %>
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function <%= requestNamePrefix %><%= requestName %>(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '', // 请求地址
      method: '<%= requestMethod %>',
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

