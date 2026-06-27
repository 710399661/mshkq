# API 集合

> API SDK 的引入方式可以在 API栏目下 进行快捷复制

## 使用

```javascript
// 现在只是一个例子，还有很多需要完善
// 引入想要的 api
import { apiIns } from '@discuzq/sdk/lib/api';

// 实例化请求，传的参数是 axios request config 的配置
const api = apiIns({
  baseURL: 'https://www.qq.com',
  ...,
});

const { http } = api;
// 可以另外设置请求拦截
http.interceptors.request.use((res) => console.log(res));
// 可以另外设置响应拦截
http.interceptors.response.use((res) => {
  const { data, status } = res;
  // 可以进行一些针对状态的错误处理 handleError(status)
  return data;
})

// 请求参数
const params = {
  page: 1,
  perPage: 10,
  filter: {
    sticky: 0,
    essence: 1,
  },
};
// 获取文章列表
api.readThreadList({ params })
  .then(result => console.log('read', result));
```