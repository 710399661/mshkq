/**
 * TODO: 类似于packages\discuz-sdk\src\api\user\read-userslist.js，需统一
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
  // 页码
  page: {
    type: 'number',
  },
  // 每页数据条数，不传则默认20，最大值50
  perPage: {
    type: 'number',
  },
  // 搜索数据
  filter: {
    type: 'object',
    fields: {
      // 用户名
      username: {
        type: 'string',
      },
      // 昵称
      nickname: {
        type: 'string',
      },
    },
  },
};

/**
 * 描述：PC端成员列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readUsersList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/users.list', // 请求地址
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
};

