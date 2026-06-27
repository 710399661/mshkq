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
  postId: {
    // 评论id
    type: 'number',
    required: true,
  },
  threadId: {
    // 帖子id
    type: 'number',
    required: true,
  },
  perPage: {
    // 每页显示个数
    type: 'number',
    required: false,
  },
  page: {
    // 当前页
    type: 'number',
    required: false,
  },
  type: {
    // 0：显示全部 1：点赞 2：付费or打赏
    type: 'number',
    required: true,
  },
};

/**
 * 描述：获取用户点赞列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readLikedUsers(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/thread.likedusers', // 请求地址
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
