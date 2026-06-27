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
      dialogId: {
        type: 'number',
        required: true,
      },
    },
  },
};

/**
 * 描述：获取具体对话中的消息内容
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readDialogMessageList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/dialog/message', // 请求地址
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

