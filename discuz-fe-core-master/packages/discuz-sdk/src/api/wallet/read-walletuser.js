/**
 * 描述：查看钱包信息
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
  uid: { // 用户id
    type: 'number',
    required: false,
  },
};

/**
 * 描述：查看钱包信息
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readWalletUser(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: 'api/v3/wallet/user', // 请求地址
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

