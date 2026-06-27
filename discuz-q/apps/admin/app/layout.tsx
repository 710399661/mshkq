import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AdminLayout } from '@/components/admin-layout';
import { I18nProvider } from '@discuzq/i18n';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: '管理后台 - Discuz! Q',
    template: '%s - Discuz! Q 管理后台',
  },
  description: 'Discuz! Q 管理后台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <I18nProvider>
          <AdminLayout>{children}</AdminLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
