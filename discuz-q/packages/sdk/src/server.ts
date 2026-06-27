import { ApiClient } from './client';
import type {
  User,
  Thread,
  Post,
  Category,
  Tag,
  PaginatedResponse,
  PaginationParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  CreateThreadParams,
  UpdateThreadParams,
  CreatePostParams,
  Notification,
  ApiResponse,
  ApiError,
  PaginatedData,
} from './types';

export type {
  User,
  Thread,
  Post,
  Category,
  Tag,
  PaginatedResponse,
  PaginationParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  CreateThreadParams,
  UpdateThreadParams,
  CreatePostParams,
  Notification,
  ApiResponse,
  ApiError,
  PaginatedData,
};

export class DiscuzApi {
  private client: ApiClient;

  constructor(client: ApiClient);
  constructor(options: ConstructorParameters<typeof ApiClient>[0]);
  constructor(arg: ApiClient | ConstructorParameters<typeof ApiClient>[0]) {
    this.client = arg instanceof ApiClient ? arg : new ApiClient(arg);
  }

  getClient(): ApiClient {
    return this.client;
  }

  auth = {
    login: (params: LoginParams): Promise<LoginResponse> =>
      this.client.post<LoginResponse>('/auth/login', params),

    register: (params: RegisterParams): Promise<LoginResponse> =>
      this.client.post<LoginResponse>('/auth/register', params),

    logout: (): Promise<void> => this.client.post('/auth/logout'),

    me: (): Promise<User> => this.client.get<User>('/auth/me'),
  };

  users = {
    getById: (id: number | string): Promise<User> =>
      this.client.get<User>(`/users/${id}`),

    threads: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>(`/users/${id}/threads`, params),

    posts: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<Post>> =>
      this.client.get<PaginatedResponse<Post>>(`/users/${id}/posts`, params),

    followers: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>(`/users/${id}/followers`, params),

    following: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>(`/users/${id}/following`, params),

    updateProfile: (data: Partial<User>): Promise<User> =>
      this.client.put<User>('/user/profile', data),

    follow: (id: number | string): Promise<{ is_following: boolean }> =>
      this.client.post(`/users/${id}/follow`),
  };

  threads = {
    list: (
      params?: PaginationParams & {
        category_id?: number | string;
        tag_id?: number | string;
        user_id?: number | string;
        type?: number;
        is_essence?: boolean;
        is_sticky?: boolean;
        sort?: string;
        search?: string;
      },
    ): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>('/threads', params),

    getById: (id: number | string): Promise<Thread> =>
      this.client.get<Thread>(`/threads/${id}`),

    create: (params: CreateThreadParams): Promise<Thread> =>
      this.client.post<Thread>('/threads', params),

    update: (id: number | string, params: UpdateThreadParams): Promise<Thread> =>
      this.client.put<Thread>(`/threads/${id}`, params),

    delete: (id: number | string): Promise<void> =>
      this.client.delete(`/threads/${id}`),

    like: (id: number | string): Promise<{ liked: boolean }> =>
      this.client.post(`/threads/${id}/like`),

    collect: (id: number | string): Promise<{ collected: boolean }> =>
      this.client.post(`/threads/${id}/collect`),
  };

  posts = {
    list: (
      threadId: number | string,
      params?: PaginationParams & { sort?: string },
    ): Promise<PaginatedResponse<Post>> =>
      this.client.get<PaginatedResponse<Post>>(`/threads/${threadId}/posts`, params),

    create: (params: CreatePostParams): Promise<Post> =>
      this.client.post<Post>('/posts', params),

    update: (id: number | string, content: string): Promise<Post> =>
      this.client.put<Post>(`/posts/${id}`, { content }),

    delete: (id: number | string): Promise<void> =>
      this.client.delete(`/posts/${id}`),

    like: (id: number | string): Promise<{ liked: boolean }> =>
      this.client.post(`/posts/${id}/like`),
  };

  categories = {
    list: (): Promise<Category[]> => this.client.get<Category[]>('/categories'),

    getById: (id: number | string): Promise<Category> =>
      this.client.get<Category>(`/categories/${id}`),

    threads: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>(`/categories/${id}/threads`, params),
  };

  tags = {
    list: (params?: PaginationParams & { keyword?: string; sort?: string }): Promise<PaginatedResponse<Tag>> =>
      this.client.get<PaginatedResponse<Tag>>('/tags', params),

    search: (keyword: string): Promise<Tag[]> =>
      this.client.get<Tag[]>('/tags/search', { keyword }),

    getById: (id: number | string): Promise<Tag> =>
      this.client.get<Tag>(`/tags/${id}`),

    threads: (id: number | string, params?: PaginationParams): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>(`/tags/${id}/threads`, params),
  };

  notifications = {
    list: (params?: PaginationParams): Promise<PaginatedResponse<Notification>> =>
      this.client.get<PaginatedResponse<Notification>>('/notifications', params),

    unreadCount: (): Promise<{ count: number }> =>
      this.client.get('/notifications/unread-count'),

    readAll: (): Promise<void> =>
      this.client.post('/notifications/read-all'),

    read: (id: string): Promise<void> =>
      this.client.post(`/notifications/${id}/read`),
  };
}

export function createApi(clientOrOptions?: unknown): DiscuzApi {
  if (clientOrOptions instanceof ApiClient) {
    return new DiscuzApi(clientOrOptions);
  }
  return new DiscuzApi((clientOrOptions || { baseUrl: '/api' }) as ConstructorParameters<typeof ApiClient>[0]);
}

export { ApiClient };
