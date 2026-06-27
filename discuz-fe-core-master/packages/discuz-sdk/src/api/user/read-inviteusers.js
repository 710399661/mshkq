import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 描述：邀请用户列表
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
  username: {
    type: 'string'
  },
  sort: {
    type: 'string'
  },
  page: {
    type: 'number'
  },
  perPage: {
    type: 'number'
  },
  scale: {
    type: 'number'
  }
};

/**
 * 描述：邀请用户列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readInviteUsers(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/invite.users.v2', // 请求地址
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

