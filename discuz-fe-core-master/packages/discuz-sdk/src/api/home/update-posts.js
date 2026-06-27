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
  pid: {
    // 评论id
    type: 'number',
    required: false,
  },
  data: {
    type: 'array',
    required: true,
  },
  id: {
    // 帖子id
    type: 'number',
    required: true,
  },
  isLiked: {
    // 是否喜欢，false取消true点赞
    type: 'boolean',
    required: false,
  },
  isApproved: {
    // 是否合法 0 不合法 1 正常 2 忽略
    type: 'number',
    required: false,
  },
  isDeleted: {
    // 是否删除
    type: 'boolean',
    required: false,
  },
  content: {
    // 内容
    type: 'string',
    required: false,
  },
  likePayCount: {
    // 点赞和付费数量
    type: 'number',
    required: false,
  },
  attachments: {
    // 点赞和付费数量
    type: 'array',
    required: false,
    data: {
      type: 'object',
      required: false,
      id: {
        // 附件id
        type: 'number',
        required: false,
      },
      type: {
        // 附件类型，填attachments
        type: 'string',
        required: false,
      },
    },
  },
};


/**
 * 描述：修改评论接口
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updatePosts(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/posts.update', // 请求地址
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
