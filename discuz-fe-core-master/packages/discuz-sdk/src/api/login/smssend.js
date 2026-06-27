/**
 * 描述：短信发送
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
  mobile: { // 手机号码
    type: 'string',
    required: true,
  },
  type: { // 验证码
    type: 'string',
    required: true,
  },
  captchaTicket: { // 邀请码
    type: 'string',
    required: false,
  },
  captchaRandStr: { // 邀请码
    type: 'string',
    required: false,
  },
};

/**
 * 描述：短信发送
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function smsSend(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/sms.send', // 请求地址
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

