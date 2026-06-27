/**
 * 描述：对话消息列表
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
  perPage: {
    type: 'number'
  },
  page: {
    type: 'number'
  },
  filter: {
    type: 'object',
    required: true,
    fields: {
      dialogId: {
        type: 'number',
        required: true
      }
    }
  }
};

/**
 * 描述：对话消息列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readDialogMessage(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/dialog.v2/message', // 请求地址
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

