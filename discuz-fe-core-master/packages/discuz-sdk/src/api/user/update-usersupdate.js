import { handleError } from '../utils/handle-error';
import request from '../_example';
/**
 * 描述：用户资料修改
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
  },
  data: {
    type: 'object',
    fields: {
      passWord: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      newPassword: {
        type: 'string',
      },
      passwordConfirmation: {
        type: 'string',
      },
      payPassword: {
        type: 'string',
      },
      payPasswordConfirmation: {
        type: 'string',
      },
      payPasswordToken: {
        type: 'string',
      },
      mobile: {
        type: 'string',
      },
      status: {
        type: 'number',
      },
      refuseMessage: {
        type: 'string',
      },
      signature: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      nickname: {
        type: 'string',
      },
      registerReason: {
        type: 'string',
      },
    },
  },
};

/**
 * 描述：用户资料修改
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateUsersUpdate(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: 'api/v3/users/update.user', // 请求地址
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

