/**
 * 描述：附件上传
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
  file: {
    required: true,
  },
  type: {
    type: 'number',
  },
  order: {
    type: 'number',
  },
};

/**
 * 描述：附件上传
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createAttachments(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/attachments',
      method: 'post',
      transformRequest: [function (data) {
        return data;
      }],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

