/**
 * 描述：创建主题视频
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
  data: {
    type: 'object',
    required: true,
    fields: {
      type: {
        type: 'string',
        required: true,
      },
      attributes: {
        type: 'object',
        required: true,
        fields: {
          fileId: {
            type: 'string',
            required: true
          }
        }
      }
    }
  }
};

/**
 * 描述：创建主题视频
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createThreadVideo(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/thread/video.v2', // 请求地址
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

