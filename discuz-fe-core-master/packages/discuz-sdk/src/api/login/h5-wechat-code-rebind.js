
/**
 * 描述：H5微信授权之后的换绑接口
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
  code: {
    type: 'string',
    require: true,
  },
  sessionId: {
    type: 'string',
    require: true,
  },
  sessionToken: {
    type: 'string',
  },
};

/**
 * 描述：H5微信授权之后的登录绑定接口
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function h5WechatCodeRebind(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/wechat/h5.rebind', // 请求地址
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

