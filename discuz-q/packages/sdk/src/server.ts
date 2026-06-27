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
} from './types';

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

    refreshToken: (refreshToken: string): Promise<LoginResponse> =>
      this.client.post<LoginResponse>('/auth/refresh', { refreshToken }),

    me: (): Promise<User> => this.client.get<User>('/auth/me'),
  };

  users = {
    getById: (id: string): Promise<User> => this.client.get<User>(`/users/${id}`),

    getByUsername: (username: string): Promise<User> =>
      this.client.get<User>(`/users/username/${username}`),

    list: (params?: PaginationParams & { keyword?: string }): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>('/users', params),

    update: (id: string, data: Partial<User>): Promise<User> =>
      this.client.patch<User>(`/users/${id}`, data),

    follow: (id: string): Promise<void> => this.client.post(`/users/${id}/follow`),

    unfollow: (id: string): Promise<void> => this.client.delete(`/users/${id}/follow`),

    followers: (id: string, params?: PaginationParams): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>(`/users/${id}/followers`, params),

    following: (id: string, params?: PaginationParams): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>(`/users/${id}/following`, params),

    threads: (id: string, params?: PaginationParams): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>(`/users/${id}/threads`, params),
  };

  threads = {
    list: (
      params?: PaginationParams & {
        categoryId?: string;
        tagId?: string;
        userId?: string;
        sort?: 'latest' | 'hot' | 'essence';
        keyword?: string;
      },
    ): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>('/threads', params),

    getById: (id: string): Promise<Thread> => this.client.get<Thread>(`/threads/${id}`),

    create: (params: CreateThreadParams): Promise<Thread> =>
      this.client.post<Thread>('/threads', params),

    update: (id: string, params: UpdateThreadParams): Promise<Thread> =>
      this.client.patch<Thread>(`/threads/${id}`, params),

    delete: (id: string): Promise<void> => this.client.delete(`/threads/${id}`),

    like: (id: string): Promise<{ likes: number; isLiked: boolean }> =>
      this.client.post(`/threads/${id}/like`),

    unlike: (id: string): Promise<{ likes: number; isLiked: boolean }> =>
      this.client.delete(`/threads/${id}/like`),

    favorite: (id: string): Promise<void> => this.client.post(`/threads/${id}/favorite`),

    unfavorite: (id: string): Promise<void> => this.client.delete(`/threads/${id}/favorite`),

    view: (id: string): Promise<void> => this.client.post(`/threads/${id}/view`),
  };

  posts = {
    list: (
      threadId: string,
      params?: PaginationParams & { sort?: 'asc' | 'desc' },
    ): Promise<PaginatedResponse<Post>> =>
      this.client.get<PaginatedResponse<Post>>(`/threads/${threadId}/posts`, params),

    create: (params: CreatePostParams): Promise<Post> => this.client.post<Post>('/posts', params),

    update: (id: string, content: string): Promise<Post> =>
      this.client.patch<Post>(`/posts/${id}`, { content }),

    delete: (id: string): Promise<void> => this.client.delete(`/posts/${id}`),

    like: (id: string): Promise<{ likes: number; isLiked: boolean }> =>
      this.client.post(`/posts/${id}/like`),

    unlike: (id: string): Promise<{ likes: number; isLiked: boolean }> =>
      this.client.delete(`/posts/${id}/like`),
  };

  categories = {
    list: (): Promise<Category[]> => this.client.get<Category[]>('/categories'),

    getById: (id: string): Promise<Category> => this.client.get<Category>(`/categories/${id}`),
  };

  tags = {
    list: (params?: PaginationParams & { keyword?: string; hot?: boolean }): Promise<PaginatedResponse<Tag>> =>
      this.client.get<PaginatedResponse<Tag>>('/tags', params),

    getById: (id: string): Promise<Tag> => this.client.get<Tag>(`/tags/${id}`),

    hot: (limit = 10): Promise<Tag[]> => this.client.get<Tag[]>('/tags/hot', { limit }),
  };

  upload = {
    getToken: (): Promise<{ token: string; url: string; key: string }> =>
      this.client.get('/upload/token'),

    image: (file: File): Promise<{ url: string; path: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      return this.client.post('/upload/image', formData, {
        headers: {},
      });
    },
  };

  search = {
    threads: (
      keyword: string,
      params?: PaginationParams,
    ): Promise<PaginatedResponse<Thread>> =>
      this.client.get<PaginatedResponse<Thread>>('/search/threads', { keyword, ...params }),

    users: (
      keyword: string,
      params?: PaginationParams,
    ): Promise<PaginatedResponse<User>> =>
      this.client.get<PaginatedResponse<User>>('/search/users', { keyword, ...params }),
  };
}

export function createApi(clientOrOptions?: unknown): DiscuzApi {
  if (clientOrOptions instanceof ApiClient) {
    return new DiscuzApi(clientOrOptions);
  }
  return new DiscuzApi((clientOrOptions || { baseUrl: '/api' }) as ConstructorParameters<typeof ApiClient>[0]);
}

export { ApiClient };
