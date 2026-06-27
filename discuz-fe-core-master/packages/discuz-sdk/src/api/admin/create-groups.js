/**
 * 描述：用户组添加
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
  name: {
    type: 'string',
    required: true,
  },
  type: {
    type: 'string',
  },
  color: {
    type: 'string',
  },
  icon: {
    type: 'string',
  },
  isPaid: {
    type: 'number',
  },
  fee: {
    type: 'number',
  },
  days: {
    type: 'number',
  },
};

/**
 * 描述：用户组添加
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createGroups(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/groups.create.v2 ', // 请求地址
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

