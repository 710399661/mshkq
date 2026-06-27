/**
 * 描述：微信换绑二维码生成
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
const validateRules = {};

/**
 * 描述：微信换绑二维码生成
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createWechatRebindQrCodeGen(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users/pc/wechat.rebind.genqrcode', // 请求地址
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

