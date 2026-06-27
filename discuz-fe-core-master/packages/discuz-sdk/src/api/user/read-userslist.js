import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 描述：用户搜索接口
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
  perPage: {
    type: 'number'
  },
  page: {
    type: 'number'
  },
  sort: {
    type: 'object',
    required: true,
    fields: {
      createdAt: {
        type: 'string',
        required: true
      }
    }
  },
  filter: {
    type: 'object',
    fields: {
      id: {
        type: 'string'
      },
      userName: {
        type: 'string'
      },
      mobile: {
        type: 'string'
      },
      status: {
        type: 'number'
      },
      groupId: {
        type: 'object',
        fields: {
          group_id: {
            type: 'array',
            defaultField: {
              type: 'number'
            }
          }
        }
      },
      isReal: {
        type: 'string'
      },
      wechat: {
        type: 'string'
      },
      canBeAsked: {
        type: 'string'
      },
    }
  },
};

/**
 * 描述：用户搜索接口
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readUsersList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/users.v2/list', // 请求地址
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

