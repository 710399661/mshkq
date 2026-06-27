
/**
 * 描述：过渡阶段，微信登录创建账号并登陆
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
  sessionToken: { // 请求session
    type: 'string',
    required: true,
  },
  inviteCode: {
    type: 'string',
  },
  type: {
    type: 'number',
  },
};

/**
 * 描述：过渡阶段，微信登录创建账号并登陆

 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function usernameAutoBind(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/wechat/transition/username.autobind', // 请求地址
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
}

