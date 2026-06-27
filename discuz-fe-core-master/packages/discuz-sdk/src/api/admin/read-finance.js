/**
 * 描述：获取资金概况列表
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
  totalIncome: { // 用户总充值
    type: 'string',
    required: true,
  },
  totalWithdrawal: { // 用户总提现
    type: 'string',
    required: true,
  },
  totalWallet: { // 用户钱包总金额
    type: 'string',
    required: true,
  },
  totalProfit: { // 平台总盈利
    type: 'string',
    required: true,
  },
  withdrawalProfit: { // 提现手续费收入
    type: 'string',
    required: true,
  },
  orderRoyalty: { // 打赏提成收入
    type: 'string',
    required: true,
  },
  totalRegisterProfit: { // 注册加入收入
    type: 'string',
    required: true,
  },
  orderCount: { // 用户订单总数
    type: 'number',
    required: true,
  },
};

/**
 * 描述：获取资金概况列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readFinance(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/statistic/finance.v2', // 请求地址
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

