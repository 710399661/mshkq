/**
 * 描述：举报反馈创建
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
 const validateRules = {
  userId: { // 举报人id
    type: 'number',
    required: true,
  },
  threadId: { // 主题id
    type: 'number',
    required: true,
  },
  type: { // 举报类型 0个人主页 1主题 2评论/回复
    type: 'number',
    required: true,
  },
  reason: { // 举报原因
    type: 'string',
    required: true,
  },
  postId: { // 回复id
    type: 'number',
    required: true,
  },
};

/**
 * 描述：举报反馈创建
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createPsotReports(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/reports.v2', // 请求地址
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

