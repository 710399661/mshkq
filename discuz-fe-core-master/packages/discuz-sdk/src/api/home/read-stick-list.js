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
  threadId: {
    // 帖子id
    type: 'number',
    required: false,
  },
  categoryId: {
    // 所在分类id
    type: 'number',
    required: false,
  },
  title: {
    // 显示标题内容
    type: 'string',
    required: false,
  },
  canViewPost: {
    // 是否可以查看详情
    type: 'boolean',
    required: false,
  },
};


/**
 * 描述：置顶列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readStickList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/thread.stick', // 请求地址
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
