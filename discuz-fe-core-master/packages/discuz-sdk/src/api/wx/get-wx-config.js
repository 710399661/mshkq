/**
 * 描述：创建对话
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
  messageText: {
    type: 'string',
    required: true,
  },
  recipientUsername: {
    type: 'string',
    required: true,
  },
  imageUrl: {
    type: 'string',
  },
  attachmentId: {
    type: 'number',
  },
};

/**
  * 描述：创建对话
  * 请求方式：POST
  * @param {axios config} opt 请求配置信息
  * @returns {promise}
  */
export async function getWXConfig(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/offiaccount/jssdk', // 请求地址
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


