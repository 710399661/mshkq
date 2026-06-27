import { handleError } from '../utils/handle-error';
import request from '../_example';

const validateRules = {};

/**
 * 获取帖子详情
 * @param {*} opts
 * @returns
 */
export async function readThreadDetail(opts) {
  try {
    const { params = {}, data = {}, ...others } = opts;
    const options = {
      url: '/api/v3/thread.detail', // 请求地址
      method: 'GET',
      params,
      data,
      validateRules,
      ...others,
    };
    const result = await request.dispatcher(options);
    return result;
  } catch (error) {
    return handleError(error);
  }
}
