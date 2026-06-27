import { handleError } from '../utils/handle-error';
import request from '../_example';

const validateRules = {};

/**
 * 帖子点赞、收藏操作更新
 * @param {*} opts
 * @returns
 */
export async function operateThread(opts) {
  try {
    const { params = {}, data = {}, ...others } = opts;
    const options = {
      url: 'api/v3/threads/operate', // 请求地址
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
