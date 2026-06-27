/**
 * 针对给出的请求实例进行本地化配置
 */
import { apiIns } from '@discuz/sdk/lib/api';

const api = apiIns({
  baseURL: 'https://newdiscuz-dev.dnspod.dev',
});

const { http } = api;

// 响应结果进行设置
http.interceptors.response.use((res) => {
  const { data, status } = res;
  // 可以进行一些针对状态的错误处理 handleError(status)
  return data;
})

export default api;
