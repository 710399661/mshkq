'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

interface AuthState {
  token: string | null;
  userInfo: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      login: (token, user) => set({ token, userInfo: user }),
      logout: () => set({ token: null, userInfo: null }),
      updateUser: (user) =>
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...user } : null,
        })),
    }),
    {
      name: 'discuzq-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, userInfo: state.userInfo }),
    },
  ),
);
