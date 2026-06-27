/**
 * 描述：支付订单
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
  orderSn: {
    type: 'string',
    required: true,
  },
  // 10微信扫码支付；11微信h5支付；12微信网页、公众号；13微信小程序支付；20钱包支付
  paymentType: {
    type: 'number',
    required: true,
  },
  // 支付密码
  payPassword: {
    type: 'string',
  },
};

/**
 * 描述：支付订单
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createPayOrder(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: 'api/v3/trade/pay/order', // 请求地址
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

