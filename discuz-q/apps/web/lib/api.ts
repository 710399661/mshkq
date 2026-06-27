import { DiscuzApi, ApiClient } from '@discuzq/sdk/server';

const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
});

export const api = new DiscuzApi(apiClient);

export function createServerApi(token?: string): DiscuzApi {
  const client = new ApiClient({
    baseUrl: 'http://localhost:8000/api/v1',
    token,
    timeout: 30000,
  });
  return new DiscuzApi(client);
}

let clientApiInstance: DiscuzApi | null = null;

export function getClientApi(): DiscuzApi {
  if (typeof window === 'undefined') {
    throw new Error('clientApi can only be used in the browser');
  }

  if (clientApiInstance) {
    return clientApiInstance;
  }

  const client = new ApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000,
    onUnauthorized: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('discuzq-auth');
        if (window.location.pathname !== '/login') {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    },
  });

  const token = getTokenFromStorage();
  if (token) {
    client.setToken(token);
  }

  clientApiInstance = new DiscuzApi(client);
  return clientApiInstance;
}

export function setClientToken(token: string | null) {
  if (typeof window === 'undefined') return;

  const api = getClientApi();
  const client = api.getClient();
  client.setToken(token || undefined);
}

function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('discuzq-auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.token || null;
    }
  } catch {
    return null;
  }
  return null;
}

export default api;
