import { handleError } from '../utils/handle-error';
import request from '../_example';

const validateRules = {};

/**
 * 获取评论详情
 * @param {*} opts
 * @returns
 */
export async function readCommentDetail(opts) {
  try {
    const { params = {}, data = {}, ...others } = opts;
    const options = {
      url: '/api/v3/posts.detail', // 请求地址
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
}
