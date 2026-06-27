/**
 * 描述：用户名密码注册
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
  username: { // 用户名
    type: 'string',
    required: true,
  },
  password: { // 密码
    type: 'string',
    required: true,
  },
  code: { // 注册邀请码
    type: 'string',
    required: false,
  },
  registerReason: { // 注册原因
    type: 'string',
    required: false,
  },
  nickname: {
    type: 'string',
    required: false,
  },
  captchaTicket: { // 验证码参数 开启新用户注册时传
    type: 'string',
    required: false,
  },
  captchaRandStr: { // 验证码参数 开启新用户注册时传
    type: 'string',
    required: false,
  },
};

/**
 * 描述：用户名密码注册
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function usernameRegister(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/username.register', // 请求地址
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

