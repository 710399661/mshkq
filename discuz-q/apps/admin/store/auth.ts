'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AdminUser {
  id?: number | string;
  username?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  [key: string]: unknown;
}

interface AdminAuthState {
  token: string | null;
  adminInfo: AdminUser | null;
  login: (token: string, admin: AdminUser) => void;
  logout: () => void;
  updateAdmin: (admin: Partial<AdminUser>) => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      token: null,
      adminInfo: null,
      login: (token, admin) => set({ token, adminInfo: admin }),
      logout: () => set({ token: null, adminInfo: null }),
      updateAdmin: (admin) =>
        set((state) => ({
          adminInfo: state.adminInfo ? { ...state.adminInfo, ...admin } : null,
        })),
    }),
    {
      name: 'discuzq-admin-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, adminInfo: state.adminInfo }),
    },
  ),
);
