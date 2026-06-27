export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface ApiError {
  code: number | string;
  message: string;
  details?: unknown;
}

export interface PaginatedData<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export type PaginatedResponse<T> = PaginatedData<T>;

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email?: string;
  avatar: string;
  bio: string | null;
  signature: string;
  gender: number;
  birthday: string | null;
  location: string;
  website: string;
  mobile?: string;
  thread_count: number;
  post_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
  last_login_ip?: string;
  last_login_at?: string | null;
  register_ip?: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort: number;
  parent_id: number | null;
  depth: number;
  thread_count: number;
  is_enabled: boolean;
  is_home: boolean;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  thread_count: number;
  sort: number;
  created_at: string;
  updated_at: string;
}

export interface Thread {
  id: number;
  user_id: number;
  category_id: number;
  last_posted_user_id: number | null;
  type: number;
  title: string;
  summary: string;
  price: string | number;
  cover_image: string;
  images: string[] | null;
  post_count: number;
  view_count: number;
  like_count: number;
  share_count: number;
  collect_count: number;
  is_approved: boolean;
  is_sticky: boolean;
  is_essence: boolean;
  is_locked: boolean;
  last_posted_at: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
  category?: Category;
  tags?: Tag[];
  firstPost?: Post;
}

export interface Post {
  id: number;
  thread_id: number;
  user_id: number | null;
  parent_id: number | null;
  reply_post_id: number | null;
  reply_user_id: number | null;
  content: string;
  content_html: string | null;
  ip?: string;
  reply_count: number;
  like_count: number;
  is_first: boolean;
  is_comment: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  replyUser?: User;
  replies?: Post[];
}

export interface LoginParams {
  username?: string;
  email?: string;
  mobile?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterParams {
  username: string;
  password: string;
  password_confirmation?: string;
  email?: string;
  mobile?: string;
}

export interface CreateThreadParams {
  category_id: number;
  title: string;
  content: string;
  type?: number;
  tags?: number[];
}

export interface UpdateThreadParams {
  category_id?: number;
  title?: string;
  content?: string;
  type?: number;
  tags?: number[];
}

export interface CreatePostParams {
  thread_id: number;
  content: string;
  parent_id?: number;
  reply_post_id?: number;
  reply_user_id?: number;
}

export interface Notification {
  id: string;
  type: string;
  data: Record<string, unknown>;
  read_at: string | null;
  created_at: string;
}
