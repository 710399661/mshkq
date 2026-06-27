/**
 * 描述：邀请朋友(生成邀请链接)

 */
import { handleError } from '../utils/handle-error';
import request from '../_example';

/**
 * 描述：邀请朋友(生成邀请链接)
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createInviteLink(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/invite.link.create', // 请求地址
      method: 'GET',
      params,
      data,
      ...others,
    };
    const result = await request.dispatcher(options);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

