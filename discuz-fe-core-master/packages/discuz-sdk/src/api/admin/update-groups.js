/**
 * 描述：用户组批量修改
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
        type: {
          type: 'string',
          required: true,
        },
        scale: {
          type: 'number',
          required: true,
        },
        isSubordinate: {
          type: 'boolean',
        },
        isCommission: {
          type: 'boolean',
        }
      }
    }
  }
};

/**
 * 描述：用户组批量修改
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateGroups(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/groups/batchupdate.v2', // 请求地址
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

