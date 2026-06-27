import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 描述：粉丝关注列表
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
    type: 'number',
  },
  page: {
    type: 'number',
  },
  sort: {
    type: 'string',
  },
  filter: {
    type: 'object',
    fields: {
      userName: {
        type: 'string',
      },
      nickName: {
        type: 'string',
      },
      userId: {
        type: 'number',
        transform(value) {
          if (typeof value === 'string') {
            return Number(value);
          }
          return value;
        },
      },
      type: {
        type: 'number',
      },
    },
  },
};

/**
 * 描述：粉丝关注列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readFollow(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/follow.list', // 请求地址
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

