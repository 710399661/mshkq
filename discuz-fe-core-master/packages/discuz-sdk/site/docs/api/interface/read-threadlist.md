---
title: readThreadList 获取文章列表
---

## 使用

```jsx
import { readThreadList } from '@discuz/sdk/lib/api';

const params = {
  page: 1,
  perPage: 10,
  filter: {
    sticky: 1,
    essence: 1,
    categoryids: [1],
  },
};

readThreadList({ params })
  .then(result => console.log(result));
```

## 入参校验规则
```jsx
const validateRules = {
  /**
   * 页码
   */
  page: {
    type: 'number',
  },
  /**
   * 每页数据条数，不传默认20，最大值50
   */
  perPage: {
    type: 'number',
  },
  /**
   * 筛选条件
   */
  filter: {
    type: 'object',
    required: true,
    fields: {
      /**
       * 是否置顶：1 - 置顶，0 - 不筛选
       */
      sticky: {
        type: 'number',
        required: true,
      },
      /**
       * 是否精华：1 - 精华，0 - 不筛选
       */
      essence: {
        type: 'number',
        required: true,
      },
      /**
       * 筛选帖子类型
       */
      types: {
        type: 'array',
      },
      /**
       * 筛选帖子分组 id
       */
      categoryids: {
        type: 'array',
      },
      /**
       * 帖子排序：1 - 不限，2 - 发帖时间，3 - 评论时间
       */
      sort: {
        type: 'number',
      },
      /**
       * 是否关注：1 - 关注，0 - 不关注
       */
      attention: {
        type: 'number',
      },
    },
  },
};
```