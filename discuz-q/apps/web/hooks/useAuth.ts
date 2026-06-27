'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import { getClientApi, setClientToken } from '@/lib/api';

interface User {
  id?: number | string;
  username?: string;
  name?: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  bio?: string | null;
  [key: string]: unknown;
}

interface LoginParams {
  username?: string;
  email?: string;
  mobile?: string;
  password: string;
}

interface RegisterParams {
  username: string;
  email?: string;
  mobile?: string;
  password: string;
  password_confirmation?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export function useUser() {
  const { token, userInfo } = useAuthStore();

  return useQuery<User | null>({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      if (!token) return null;
      try {
        const api = getClientApi() as any;
        const user = await api.auth.me();
        useAuthStore.getState().updateUser(user);
        return user;
      } catch {
        return null;
      }
    },
    initialData: userInfo,
    enabled: !!token,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: async (params): Promise<LoginResponse> => {
      const api = getClientApi() as any;
      return api.auth.login(params);
    },
    onSuccess: (data) => {
      const { token, user } = data;
      useAuthStore.getState().login(token, user);
      setClientToken(token);
      queryClient.setQueryData(['user', 'me'], user);
    },
    onError: () => {
      useAuthStore.getState().logout();
      setClientToken(null);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, RegisterParams>({
    mutationFn: async (params): Promise<LoginResponse> => {
      const api = getClientApi() as any;
      return api.auth.register(params);
    },
    onSuccess: (data) => {
      const { token, user } = data;
      useAuthStore.getState().login(token, user);
      setClientToken(token);
      queryClient.setQueryData(['user', 'me'], user);
    },
    onError: () => {
      useAuthStore.getState().logout();
      setClientToken(null);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async (): Promise<void> => {
      try {
        const api = getClientApi() as any;
        await api.auth.logout();
      } catch {
      }
    },
    onSuccess: () => {
      useAuthStore.getState().logout();
      setClientToken(null);
      queryClient.setQueryData(['user', 'me'], null);
      queryClient.clear();
    },
    onError: () => {
      useAuthStore.getState().logout();
      setClientToken(null);
      queryClient.setQueryData(['user', 'me'], null);
      queryClient.clear();
    },
  });
}
