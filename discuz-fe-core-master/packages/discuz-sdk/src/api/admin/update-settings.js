/**
 * 描述：添加网站配置
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
  data: {
    type: 'array',
    required: true,
    defaultField: {
      type: 'object',
      required: true,
      fields: {
        key: {
          type: 'string',
          required: true,
        },
        value: {
          type: 'number',
          required: true,
        },
        tag: {
          type: 'string',
          required: true,
        },
      }
    }
  }
};

/**
 * 描述：添加网站配置
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateSettings(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/settings.v2 ', // 请求地址
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

