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
  page: {
    // 页码
    type: 'number',
    required: false,
  },
  perPage: {
    // 每页数据条数。不传则默认20，最大值50
    type: 'number',
    required: false,
  },
  sequence: {
    // 默认排序如果使用这个参数，在为0或者为空的情况下才会执行filter.complex参数
    // 0.返回正常列表 1.默认智能排序列表
    type: 'number',
    required: false,
  },
  preload: {
    // 预加载数据，在第一页异步调用该接口，可以触发后端提前缓存数据
    type: 'boolean',
    required: false,
  },
  filter: {
    type: 'object',
    required: false,
    fields: {
      // 多类型筛选
      // 0:为不使用 1:我的草稿 2:我的点赞 3:我的收藏 4:我的购买 5:我的/他人主题
      complex: {
        type: 'number',
        required: false,
      },
      // 他人主题id，0为我的主题 1为他人主题
      toUserId: {
        type: 'number',
        required: false,
      },
      // 是否置顶 1：置顶 0：不筛选
      sticky: {
        type: 'number',
        required: false,
      },
      // 是否精华 1:精华 0：不筛选
      essence: {
        type: 'number',
        required: false,
      },
      // 筛选帖子类型，参看字典
      essence: {
        type: 'array',
        required: false,
      },
      // 筛选帖子分组id
      categoryids: {
        type: 'array',
        required: false,
      },
      // 帖子排序 1：发帖时间倒序 2：评论时间倒序 3：热门内容倒序。不传默认按照发帖时间排序
      sort: {
        type: 'number',
        required: false,
      },
      // 是否关注 1：关注 0：不筛选关注
      attention: {
        type: 'number',
        required: false,
      },
      // 搜索内容
      search: {
        type: 'number',
        required: false,
      },
    },
  },
};


/**
 * 描述：首页列表/热门内容
 * 请求方式：GET
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function readThreadList(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '/api/v3/thread.list', // 请求地址
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
