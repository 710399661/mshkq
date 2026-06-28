'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useAdminAuthStore } from '@/store/auth';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAdminAuthStore();

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || isLoginPage) return;
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, isLoginPage, pathname, router, hasHydrated]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!hasHydrated || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
