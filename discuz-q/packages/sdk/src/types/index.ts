export interface User {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  bio?: string;
  email?: string;
  phone?: string;
  gender?: 0 | 1 | 2;
  birthday?: string;
  location?: string;
  website?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  verifiedDesc?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Thread {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: 'text' | 'video' | 'image' | 'question' | 'good';
  cover?: string;
  images?: string[];
  category: Category;
  tags: Tag[];
  author: User;
  stats: {
    views: number;
    replies: number;
    likes: number;
    shares: number;
    favorites: number;
  };
  isSticky?: boolean;
  isEssence?: boolean;
  isLiked?: boolean;
  isFavorited?: boolean;
  isAnonymous?: boolean;
  price?: number;
  createdAt: string;
  updatedAt: string;
  postedAt: string;
}

export interface Post {
  id: string;
  content: string;
  threadId: string;
  author: User;
  replyTo?: User;
  replyToPostId?: string;
  likes: number;
  isLiked?: boolean;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  sort: number;
  threadCount: number;
  children?: Category[];
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  threadCount: number;
  isRecommended?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  replyTo?: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, unknown>;
}

export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  refreshToken: string;
}

export interface RegisterParams {
  username: string;
  email?: string;
  phone?: string;
  password: string;
  code?: string;
}

export interface CreateThreadParams {
  title: string;
  content: string;
  categoryId: string;
  tags?: string[];
  type?: Thread['type'];
  images?: string[];
  isAnonymous?: boolean;
  price?: number;
}

export interface UpdateThreadParams {
  title?: string;
  content?: string;
  categoryId?: string;
  tags?: string[];
}

export interface CreatePostParams {
  threadId: string;
  content: string;
  replyToPostId?: string;
  images?: string[];
}
