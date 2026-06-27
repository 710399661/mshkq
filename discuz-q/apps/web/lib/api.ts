import { DiscuzApi, ApiClient } from '@discuzq/sdk/server';

const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
});

export const api = new DiscuzApi(apiClient);

export function createServerApi(token?: string): DiscuzApi {
  const client = new ApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    token,
    timeout: 30000,
  });
  return new DiscuzApi(client);
}

export default api;
