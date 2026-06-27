/**
 * TODO: 类似于packages\discuz-sdk\src\api\content\read-topicslist.js，需统一
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
      // 话题内容
      content: {
        type: 'string',
      },
      // 潮流话题标识，传1将返回潮流话题(热度排序)，传0将展示话题列表(时间倒序)
      hot: {
        type: 'number',
      },
      // 话题ID，传话题ID获取该话题详情
      topicId: {
        type: 'number',
      },
      // 排序规则，传1：按热度排序 传2：按内容数排序
      sortBy: {
        type: 'number',
      },
      // 是否推荐(0未推荐,1推荐)
      recommended: {
        type: 'number',
      },
      // 话题作者用户名，(管理后台搜索专属)
      username: {
        type: 'string',
      },
      // 话题创建时间范围-开始，(管理后台搜索专属)
      createdAtBegin: {
        type: 'date',
      },
      // 话题创建时间范围-截止，(管理后台搜索专属)
      createdAtEnd: {
        type: 'date',
      },
      // 话题内容数范围-起始，(管理后台搜索专属)
      threadCountBegin: {
        type: 'number',
      },
      // 话题内容数范围-截至，(管理后台搜索专属)
      threadCountEnd: {
        type: 'number',
      },
      // 话题热度范围-起始，(管理后台搜索专属)
      viewCountBegin: {
        type: 'number',
      },
      // 话题热度范围-截止，(管理后台搜索专属)
      viewCountEnd: {
        type: 'number',
      },
    },
  },
};

/**
 * 描述：潮流话题/话题搜索
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readTopicsList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/topics.list', // 请求地址
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

