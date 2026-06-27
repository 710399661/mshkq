import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { I18nProvider } from '@discuzq/i18n';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Discuz! Q - 新一代社区系统',
    template: '%s - Discuz! Q',
  },
  description: 'Discuz! Q 新一代社区系统，轻量、高效、现代化',
  keywords: ['社区', '论坛', 'discuz', 'discuz q', '社区系统'],
  authors: [{ name: 'Discuz! Q Team' }],
  openGraph: {
    type: 'website',
    siteName: 'Discuz! Q',
    title: 'Discuz! Q - 新一代社区系统',
    description: 'Discuz! Q 新一代社区系统，轻量、高效、现代化',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discuz! Q - 新一代社区系统',
    description: 'Discuz! Q 新一代社区系统，轻量、高效、现代化',
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
