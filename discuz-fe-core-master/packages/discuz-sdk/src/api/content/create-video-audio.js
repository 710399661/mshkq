/**
 * 描述：创建视频音频接口
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
const validateRules = {};

/**
 * 创建视频音频接口
 * @param {object} params 请求参数
 * @param {string} params.fileId 要上传的文件
 * @param {number} params.type 要上传的类型，[不必须】视频：0，音频：1
 * @param {string} params.fileName 排序情况【不必须】
 */
export async function createThreadVideoAudio(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/thread/video', // 请求地址
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

