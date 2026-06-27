import { ApiClient } from '@discuzq/sdk/server';

function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('discuzq-admin-auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.token || null;
    }
  } catch {
    return null;
  }
  return null;
}

let adminApiInstance: ReturnType<typeof createAdminApi> | null = null;

export function createAdminApi(token?: string) {
  const client = new ApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    token,
    timeout: 30000,
    onUnauthorized: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('discuzq-admin-auth');
        if (window.location.pathname !== '/login') {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    },
  });

  return {
    client,
    auth: {
      login: async (username: string, password: string) => {
        const res = await client.post<any>('/auth/login', { account: username, password });
        return res;
      },
      logout: async () => {
        return client.post('/auth/logout');
      },
      me: async () => {
        return client.get('/auth/me');
      },
    },
    stats: {
      get: async () => {
        return client.get('/admin/stats');
      },
    },
    users: {
      list: async (params?: Record<string, unknown>) => {
        return client.get('/admin/users', params);
      },
      get: async (id: string | number) => {
        return client.get(`/admin/users/${id}`);
      },
      ban: async (id: string | number) => {
        return client.post(`/admin/users/${id}/ban`);
      },
      unban: async (id: string | number) => {
        return client.post(`/admin/users/${id}/unban`);
      },
    },
    threads: {
      list: async (params?: Record<string, unknown>) => {
        return client.get('/admin/threads', params);
      },
      get: async (id: string | number) => {
        return client.get(`/admin/threads/${id}`);
      },
      delete: async (id: string | number) => {
        return client.delete(`/admin/threads/${id}`);
      },
      sticky: async (id: string | number) => {
        return client.post(`/admin/threads/${id}/sticky`);
      },
      unsticky: async (id: string | number) => {
        return client.post(`/admin/threads/${id}/unsticky`);
      },
      essence: async (id: string | number) => {
        return client.post(`/admin/threads/${id}/essence`);
      },
      unessence: async (id: string | number) => {
        return client.post(`/admin/threads/${id}/unessence`);
      },
    },
    posts: {
      list: async (params?: Record<string, unknown>) => {
        return client.get('/admin/posts', params);
      },
      delete: async (id: string | number) => {
        return client.delete(`/admin/posts/${id}`);
      },
    },
    categories: {
      list: async () => {
        return client.get('/admin/categories');
      },
      create: async (data: Record<string, unknown>) => {
        return client.post('/admin/categories', data);
      },
      update: async (id: string | number, data: Record<string, unknown>) => {
        return client.put(`/admin/categories/${id}`, data);
      },
      delete: async (id: string | number) => {
        return client.delete(`/admin/categories/${id}`);
      },
    },
    tags: {
      list: async (params?: Record<string, unknown>) => {
        return client.get('/admin/tags', params);
      },
      create: async (data: Record<string, unknown>) => {
        return client.post('/admin/tags', data);
      },
      update: async (id: string | number, data: Record<string, unknown>) => {
        return client.put(`/admin/tags/${id}`, data);
      },
      delete: async (id: string | number) => {
        return client.delete(`/admin/tags/${id}`);
      },
    },
  };
}

export function getAdminApi() {
  if (typeof window === 'undefined') {
    throw new Error('adminApi can only be used in the browser');
  }

  if (adminApiInstance) {
    return adminApiInstance;
  }

  const token = getTokenFromStorage();
  adminApiInstance = createAdminApi(token || undefined);
  return adminApiInstance;
}

export function setAdminToken(token: string | null) {
  if (typeof window === 'undefined') return;

  const api = getAdminApi();
  api.client.setToken(token || undefined);
}

export function resetAdminApi() {
  adminApiInstance = null;
}
