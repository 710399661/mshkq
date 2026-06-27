'use client';

import { useRouter } from 'next/navigation';
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Globe,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Input,
} from '@discuzq/ui';
import { useAdminAuthStore } from '@/store/auth';
import { getAdminApi, resetAdminApi } from '@/lib/api';
import { toast } from '@discuzq/ui/toast';
import { useI18n } from '@discuzq/i18n';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { adminInfo, logout } = useAdminAuthStore();
  const { t, locale, setLocale } = useI18n();

  const handleLogout = async () => {
    try {
      const api = getAdminApi();
      await api.auth.logout();
    } catch {
    } finally {
      logout();
      resetAdminApi();
      toast({
        title: t('tips.loggedOut'),
        description: t('tips.loggedOutDesc'),
      });
      router.push('/login');
    }
  };

  const username = adminInfo?.username || t('common.users');
  const email = adminInfo?.email || '';
  const avatar = adminInfo?.avatar;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
          <span>{t('admin.adminPanel')}</span>
          <ChevronDown className="h-4 w-4" />
          <span className="text-foreground">{t('admin.dashboard')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('common.search') + '...'}
            className="w-64 pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Language">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setLocale('zh-CN')}
              className={locale === 'zh-CN' ? 'bg-accent' : ''}
            >
              {t('language.zhCN')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLocale('en-US')}
              className={locale === 'en-US' ? 'bg-accent' : ''}
            >
              {t('language.enUS')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 px-2">
              <Avatar className="h-8 w-8">
                {avatar ? (
                  <AvatarImage src={avatar} alt={username} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {username[0]?.toUpperCase() || 'A'}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="hidden text-sm font-medium md:inline">
                {username}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{username}</p>
                {email && (
                  <p className="text-xs text-muted-foreground">
                    {email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t('actions.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              {t('actions.accountSettings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('actions.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
