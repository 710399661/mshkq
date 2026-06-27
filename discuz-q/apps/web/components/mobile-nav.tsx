'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Home,
  Grid3X3,
  Tags,
  Users,
  Bell,
  Settings,
  Moon,
  Sun,
  LogOut,
  UserCircle,
  FileText,
  X,
  Menu,
  MessageCircle,
  Globe,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@discuzq/ui/dialog';
import { Button } from '@discuzq/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { cn } from '@discuzq/ui';
import { useAuthStore } from '@/store/auth';
import { useLogout } from '@/hooks/useAuth';
import { toast } from '@discuzq/ui/toast';
import { getUnreadCount } from '@/lib/mock-notifications';
import { useI18n } from '@discuzq/i18n';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/', labelKey: 'nav.home', icon: Home },
  { href: '/categories', labelKey: 'nav.categories', icon: Grid3X3 },
  { href: '/tags', labelKey: 'nav.topics', icon: Tags },
  { href: '/users', labelKey: 'nav.users', icon: Users },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo, token } = useAuthStore();
  const logoutMutation = useLogout();
  const { t, locale, setLocale } = useI18n();
  const isLoggedIn = !!token;

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: getUnreadCount,
    initialData: { count: 0 },
    enabled: isLoggedIn,
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: t('tips.loggedOut') });
        onClose();
        router.push('/');
      },
    });
  };

  const handleNavClick = (href: string) => {
    onClose();
    router.push(href as any);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="left-0 top-0 h-full w-[85%] max-w-sm translate-x-0 translate-y-0 rounded-none p-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm">
        <DialogTitle className="sr-only">{t('nav.home')}</DialogTitle>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-bold text-primary">Discuz! Q</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {isLoggedIn && userInfo && (
            <div className="border-b p-4">
              <Link
                href={`/user/${userInfo.id}`}
                className="flex items-center gap-3"
                onClick={onClose}
              >
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={userInfo.avatar || ''} alt={userInfo.username || 'user'} />
                  <AvatarFallback className="text-base">
                    {(userInfo.username || 'U')[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{userInfo.username}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userInfo.email || ''}
                  </p>
                </div>
              </Link>
            </div>
          )}

          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </div>

            {isLoggedIn && (
              <>
                <div className="my-3 border-t" />
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('/notifications')}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      {t('actions.myNotifications')}
                    </div>
                    {unreadData.count > 0 && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {unreadData.count > 99 ? '99+' : unreadData.count}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => handleNavClick(`/user/${userInfo?.id}`)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <UserCircle className="h-5 w-5" />
                    {t('actions.profile')}
                  </button>
                  <button
                    onClick={() => handleNavClick('/user/' + (userInfo?.id || '') + '#posts')}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <FileText className="h-5 w-5" />
                    {t('actions.myPosts')}
                  </button>
                </div>
              </>
            )}

            <div className="my-3 border-t" />
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('/settings')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                {t('common.settings')}
              </button>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <span>{t('language.' + (locale === 'zh-CN' ? 'zhCN' : 'enUS'))}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setLocale('zh-CN')}
                    className={cn(
                      'px-2 py-1 text-xs rounded',
                      locale === 'zh-CN'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80',
                    )}
                  >
                    中
                  </button>
                  <button
                    onClick={() => setLocale('en-US')}
                    className={cn(
                      'px-2 py-1 text-xs rounded',
                      locale === 'en-US'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80',
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Moon className="h-5 w-5" />
                深色模式
              </button>
            </div>
          </nav>

          {isLoggedIn ? (
            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-5 w-5" />
                {logoutMutation.isPending ? t('actions.loggingOut') : t('actions.logout')}
              </Button>
            </div>
          ) : (
            <div className="border-t p-4 space-y-2">
              <Button
                className="w-full"
                onClick={() => handleNavClick('/login')}
              >
                {t('common.login')}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavClick('/register')}
              >
                {t('common.register')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onClick}
      aria-label="打开菜单"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
