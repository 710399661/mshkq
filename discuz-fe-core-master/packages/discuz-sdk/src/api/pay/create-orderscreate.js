/**
 * 描述：创建订单
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
  // 订单类型：1注册，2打赏，3购买主题，4购买权限组，5付费提问，6问答围观，7购买附件，8站点付费，9红包，10悬赏，11合并订单(红包+悬赏合并支付)
  type: {
    type: 'number',
    required: true,
  },
  // 用户购买付费主题、付费附件、围观付费时，需传
  threadId: {
    type: 'number',
  },
  // 用户购买用户组
  groupId: {
    type: 'number',
  },
  // 订单金额
  // 为合并订单时，redAmount+rewardAmount = amount
  amount: {
    type: 'number',
  },
  // 红包金额
  redAmount: {
    type: 'number',
  },
  // 悬赏金额
  rewardAmount: {
    type: 'number',
  },
  isAnonymous: {
    type: 'number',
  },
  // 收款人ID
  payeeId: {
    type: 'number',
  },
};

/**
 * 描述：创建订单
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createOrdersCreate(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: 'api/v3/order.create', // 请求地址
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

