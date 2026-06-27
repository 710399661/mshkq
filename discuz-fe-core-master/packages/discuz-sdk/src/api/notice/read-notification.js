/**
 * 描述：举报反馈创建
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
  page: {
    type: 'number',
  },
  perPage: {
    type: 'number',
  },
  filter: {
    type: 'object',
    required: true,
    fields: {
      /**
       * 消息类型
       * related - '@我的'
       * replied - 回复
       * liked - 点赞
       * system - 系统账号消息
       * rewarded - 普通财务通知
       * receiveredpacket - 获得红包
       * threadrewarded - 获得悬赏赏金
       * withdrawal - 提现通知
       */
      type: {
        type: 'string',
        required: true,
      },
    },
  },
};

/**
 * 描述：读取消息通知
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readNotification(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/notification', // 请求地址
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
