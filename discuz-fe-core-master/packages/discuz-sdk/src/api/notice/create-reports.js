/**
 * 描述：举报反馈列表
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
  page: { // 页码
    type: 'number',
  },
  perPage: { // 每页数据条数
    type: 'number',
  },
  filter: { // 筛选条件
    type: 'object',
    fields: {
      username: { // 用户名
        type: 'string',
      },
      status: { // 举报状态
        type: 'number',
      },
      type: { // 举报类型
        type: 'number',
      },
      startTime: { // 开始时间
        type: 'string',
      },
      endTime: { // 结束时间
        type: 'string',
      },
    }
  },

};

/**
 * 描述：举报反馈列表
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createReports(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/reports.v2', // 请求地址
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

