import type { ApiError, ApiResponse, PaginatedResponse } from './types';

export interface ApiClientOptions {
  baseUrl: string;
  token?: string;
  timeout?: number;
  onError?: (error: ApiError) => void;
  onUnauthorized?: () => void;
}

export class ApiClient {
  private baseUrl: string;
  private token?: string;
  private timeout: number;
  private onError?: (error: ApiError) => void;
  private onUnauthorized?: () => void;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.endsWith('/') ? options.baseUrl : `${options.baseUrl}/`;
    this.token = options.token;
    this.timeout = options.timeout || 30000;
    this.onError = options.onError;
    this.onUnauthorized = options.onUnauthorized;
  }

  setToken(token?: string) {
    this.token = token;
  }

  private getHeaders(headers: Record<string, string> = {}): Record<string, string> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };
    if (this.token) {
      defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }
    return defaultHeaders;
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    options?: {
      body?: unknown;
      query?: Record<string, string | number | boolean | undefined>;
      headers?: Record<string, string>;
      next?: NextFetchRequestConfig;
      cache?: RequestCache;
    },
  ): Promise<T> {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const url = new URL(normalizedPath, this.baseUrl);

    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: this.getHeaders(options?.headers),
        body: options?.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
        next: options?.next,
        cache: options?.cache,
      });

      clearTimeout(timeoutId);

      const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;

      if (!response.ok) {
        const error: ApiError = {
          code: data?.code ?? response.status,
          message: data?.message || response.statusText,
          details: (data as unknown as Record<string, unknown>)?.details as unknown,
        };

        if (response.status === 401) {
          this.onUnauthorized?.();
        }

        this.onError?.(error);
        throw error;
      }

      if (data && typeof data === 'object' && 'code' in data) {
        if (data.code !== 0) {
          const error: ApiError = {
            code: data.code,
            message: data.message || '请求失败',
          };
          this.onError?.(error);
          throw error;
        }
        return data.data as T;
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === 'AbortError') {
        const timeoutError: ApiError = { code: -1, message: '请求超时' };
        this.onError?.(timeoutError);
        throw timeoutError;
      }
      throw error;
    }
  }

  get<T>(path: string, query?: unknown, options?: {
    headers?: Record<string, string>;
    next?: NextFetchRequestConfig;
    cache?: RequestCache;
  }): Promise<T> {
    return this.request<T>('GET', path, { query: query as Record<string, string | number | boolean | undefined>, ...options });
  }

  post<T>(path: string, body?: unknown, options?: {
    headers?: Record<string, string>;
  }): Promise<T> {
    return this.request<T>('POST', path, { body, ...options });
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, { body });
  }

  patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, { body });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

export function createClient(options: Omit<ApiClientOptions, 'baseUrl'> & { baseUrl?: string } = {}) {
  const baseUrl = options.baseUrl || process.env.NEXT_PUBLIC_API_URL || '/api';
  return new ApiClient({ baseUrl, ...options });
}
