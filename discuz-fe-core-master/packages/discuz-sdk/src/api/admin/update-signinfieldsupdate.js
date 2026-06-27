/**
 * 描述：管理员审核用户扩展信息修改
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
  id: { // id
    type: 'number',
    required: true,
  },
  status: { // 审核状态	0:废弃 1:待审核 2:驳回 3:审核通过
    type: 'number',
    required: true,
  },
};

/**
 * 描述：管理员审核用户扩展信息修改
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateSigninfieldsUpdate(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/admin/signinfields.update.v2', // 请求地址
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

