'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  FolderTree,
  Tags,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@discuzq/ui';
import { useI18n } from '@discuzq/i18n';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const menuItems = [
    {
      titleKey: 'admin.dashboard',
      href: '/' as const,
      icon: LayoutDashboard,
    },
    {
      titleKey: 'admin.userManagement',
      href: '/users' as const,
      icon: Users,
    },
    {
      titleKey: 'admin.threadManagement',
      href: '/threads' as const,
      icon: FileText,
    },
    {
      titleKey: 'admin.commentManagement',
      href: '/posts' as const,
      icon: MessageSquare,
    },
    {
      titleKey: 'admin.categoryManagement',
      href: '/categories' as const,
      icon: FolderTree,
    },
    {
      titleKey: 'admin.tagManagement',
      href: '/tags' as const,
      icon: Tags,
    },
    {
      titleKey: 'admin.systemSettings',
      href: '/settings' as const,
      icon: Settings,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">DQ</span>
            </div>
            <span className="text-lg font-semibold">Discuz! Q</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
                )}
              >
                <Icon className="h-5 w-5" />
                {t(item.titleKey)}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="text-xs text-slate-500">
            {t('admin.version')} v0.1.0
          </div>
        </div>
      </aside>
    </>
  );
}
