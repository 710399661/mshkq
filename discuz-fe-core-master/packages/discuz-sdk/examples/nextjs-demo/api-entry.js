/**
 * 针对给出的请求实例进行本地化配置
 */
import { feApi } from '@discuz/sdk';

const { apiIns, RESPONSE_CODE } = feApi;
console.log('code', RESPONSE_CODE);

const api = apiIns({
  baseURL: 'https://newdiscuz-dev.dnspod.dev',
});

const { http } = api;

// 响应结果进行设置
http.interceptors.response.use((res) => {
  console.log('response', res);
  const { data } = res;
  // const { Data, Code, Message } = data;
  // cons
  // 可以进行一些针对状态的错误处理 handleError(status)
  return data;
});

export default api;
