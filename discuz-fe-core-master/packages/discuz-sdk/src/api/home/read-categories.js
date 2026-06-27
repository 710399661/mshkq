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
  name: {
    // 分类名称
    type: 'string',
    required: false,
  },
  description: {
    // 分类描述
    type: 'string',
    required: false,
  },
  icon: {
    // 图标
    type: 'string',
    required: false,
  },
  sort: {
    // 排序序号
    type: 'number',
    required: false,
  },
  property: {
    // 属性
    type: 'number',
    required: false,
  },
  threadCount: {
    // 分类下帖子总数数
    type: 'number',
    required: false,
  },
  canCreateThread: {
    // 是否可以在此分类下创建帖子
    type: 'boolean',
    required: false,
  },
  parentid: {
    // 一级分类id
    type: 'number',
    required: false,
  },
  searchIds: {
    // 用于搜索内容分类帖子的id数组，只有一个id时为数值，有多个时为数组
    type: 'array',
    required: false,
  },
  children: {
    // 二级分类
    type: 'array',
    required: false,
  },
};

/**
 * 描述：获取分类列表接口
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readCategories(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/categories', // 请求地址
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
