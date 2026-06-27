import { handleError } from '../utils/handle-error';
import request from '../_example';

const validateRules = {};

/**
 * 帖子采纳
 * @param {*} opts
 * @returns
 */
export async function reward(opts) {
  try {
    const { params = {}, data = {}, ...others } = opts;
    const options = {
      url: '/api/v3/posts.reward', // 请求地址
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
}
