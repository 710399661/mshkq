// import {deleteDeny} from '@discuzq/sdk/dist/api/user/delete-deny';
import { handleError } from '../utils/handle-error';
import request from '../_example';

const validateRules = {};

/**
 * 创建评论
 * @param {*} opts
 * @returns
 */
export async function createPosts(opts) {
  try {
    const { params = {}, data = {}, ...others } = opts;
    const options = {
      url: '/api/v3/posts.create', // 请求地址
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
