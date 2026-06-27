/**
 * 描述：审核提现
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
  ids: { // 申请提现id数组
    type: 'array',
    required: true,
  },
  cashStatus: { // 提现状态：1：待审核，2：审核通过，3：审核不通过，4：待打款， 5，已打款， 6：打款失败
    type: 'number',
    required: true,
  },
  remark: { // 说明
    type: 'string',
    required: true,
  },
};

/**
 * 描述：审核提现
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readWalletReview(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/wallet/cash/review.v2', // 请求地址
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

