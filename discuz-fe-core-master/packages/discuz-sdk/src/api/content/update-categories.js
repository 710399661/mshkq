/**
 * 描述：修改内容分类(批量)
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
        id: {
          type: 'number',
          required: true,
        },
        name: {
          type: 'string',
          required: true,
        },
        sort: {
          type: 'number',
          required: true,
        },
        description: {
          type: 'string',
        },
      }
    }
  }
};

/**
 * 描述：修改内容分类(批量)
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateCategories(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/categories.update.v2', // 请求地址
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

