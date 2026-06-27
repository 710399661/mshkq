/**
 * 描述：批量修改举报反馈
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
  data: { // 举报信息
    type: 'object',
    required: true,
    fields:{
      id:{ // 举报记录id
        type: 'string',
        required: true,
      },
      status:{ // 举报状态 0未处理 1已处理
        type: 'number',
        required: true,
      },
    }
  },
};

/**
 * 描述：批量修改举报反馈
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function updateBatchReports(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/reports/batch.v2', // 请求地址
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

