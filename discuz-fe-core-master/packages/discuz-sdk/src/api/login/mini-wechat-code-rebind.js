
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
  },
  sessionToken: {
    type: 'string',
  },
};

/**
  * 描述：H5微信授权之后的登录绑定接口
  * 请求方式：POST
  * @param {axios config} opt 请求配置信息
  * @returns {promise}
  */
export async function MiniWechatCodeRebind(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/wechat/miniprogram.rebind', // 请求地址
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
}


