/**
 * TODO: 拷贝自packages\discuz-sdk\src\api\user\delete-follow.js，需统一
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
  // 类型 1 我的关注
  id: {
    type: 'number',
    required: true,
  },
  // 关注id
  type: {
    type: 'number',
    required: true,
  },
};

/**
 * 描述：删除我的关注/我的粉丝
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function deleteFollow(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/follow.delete', // 请求地址
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

