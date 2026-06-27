/**
 * 描述：用户扩展字段添加
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
  data:{
    filter: {
      type: 'object',
      required: true,
      fields: {
        name: { // 名称
          type: 'string',
          required: true
        },
        type: { // 类型
          type: 'number',
          required: true
        },
        fieldsExt: { // 字段扩展信息
          type: 'string',
        },
        fieldsDesc: { // 字段介绍
          type: 'string',
        },
        remark: { // 审核意见
          type: 'number',
        },
        sort: { // 排序
          type: 'number',
          required: true
        },
        status: { // 状态
          type: 'number',
        },
        required: { // 是否必填
          type: 'number',
        },
      }
    }
  }
};

/**
 * 描述：用户扩展字段添加
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createUserSigninfieldsCreate(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/admin/signinfields.create.v2', // 请求地址
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

