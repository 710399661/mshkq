/**
 * 描述：小程序登录
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
  jsCode: {
    type: 'string',
    require: true,
  },
  iv: {
    type: 'string',
    require: true,
  },
  encryptedData: {
    type: 'string',
    require: true,
  },
  inviteCode: {
    type: 'string',
  },
};

/**
 * 描述：小程序登录
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function miniLogin(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/wechat/miniprogram.login', // 请求地址
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

