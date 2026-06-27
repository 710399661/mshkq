/**
 * 描述：订单列表
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
  page:{
    type: 'number',
  },
  perPage:{
    type: 'number',
  },
  user:{
    type: 'number',
  },
  status:{
    type: 'number',
  },
  orderSn:{
    type: 'string',
  },
  startTime:{
    type: 'string',
  },
  endTime:{
    type: 'string',
  },
  username:{
    type: 'string',
  },
  payeeUsername:{
    type: 'string',
  },
  product:{
    type: 'string',
  },
};

/**
 * 描述：订单列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readOrdersList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/orders.v2', // 请求地址
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

