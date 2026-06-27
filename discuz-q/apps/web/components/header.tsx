'use client';

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Bell, MessageCircle, User, LogOut, Settings, FileText, UserCircle, PenSquare, Search, Menu, Globe } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { SearchBar } from '@/components/search-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@discuzq/ui/dropdown-menu';
import { useAuthStore } from '@/store/auth';
import { useLogout } from '@/hooks/useAuth';
import { toast } from '@discuzq/ui/toast';
import { getUnreadCount } from '@/lib/mock-notifications';

const MobileNav = lazy(() =>
  import('@/components/mobile-nav').then((mod) => ({
    default: mod.MobileNav,
  }))
);

function MobileMenuButton({ onClick }: { onClick: () => void }) {
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

export function Header() {
  const router = useRouter();
  const { userInfo, token } = useAuthStore();
  const logoutMutation = useLogout();
  const isLoggedIn = !!token;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: getUnreadCount,
    initialData: { count: 0 },
    enabled: isLoggedIn,
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: '已退出登录' });
        router.push('/');
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-8">
            <MobileMenuButton onClick={() => setMobileNavOpen(true)} />

            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary md:text-xl">Discuz! Q</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary">
                首页
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                分类
              </Link>
              <Link
                href="/tags"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                话题
              </Link>
              <Link
                href="/users"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                用户
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <div className="hidden w-72 md:block">
              <SearchBar placeholder="搜索帖子、用户、话题..." />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="搜索"
            >
              <Search className="h-5 w-5" />
            </Button>

            {isLoggedIn ? (
              <>
                <Link href="/notifications" className="hidden md:block">
                  <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                    <Bell className="h-5 w-5" />
                    {unreadData.count > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                        {unreadData.count > 99 ? '99+' : unreadData.count}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="hidden md:block text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                </Button>

                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-full ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <Avatar className="h-8 w-8 border">
                          <AvatarImage src={userInfo?.avatar || ''} alt={userInfo?.username || 'user'} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span className="font-medium">{userInfo?.username || '用户'}</span>
                          <span className="text-xs text-muted-foreground font-normal">
                            {userInfo?.email || ''}
                          </span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push(`/user/${userInfo?.id}`)}>
                        <UserCircle className="mr-2 h-4 w-4" />
                        个人主页
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        我的帖子
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/notifications')}>
                        <Bell className="mr-2 h-4 w-4" />
                        消息通知
                        {unreadData.count > 0 && (
                          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            {unreadData.count}
                          </span>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        设置
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {logoutMutation.isPending ? '退出中...' : '退出登录'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={`/user/${userInfo?.id}`} className="md:hidden">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={userInfo?.avatar || ''} alt={userInfo?.username || 'user'} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <Button size="sm" asChild className="hidden md:inline-flex">
                  <Link href="/post/new">
                    <PenSquare className="mr-1.5 h-4 w-4" />
                    发帖
                  </Link>
                </Button>
                <Button size="icon" asChild className="md:hidden">
                  <Link href="/post/new" aria-label="发帖">
                    <PenSquare className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
                  <Link href="/login">登录</Link>
                </Button>
                <Button size="sm" asChild className="hidden md:inline-flex">
                  <Link href="/register">注册</Link>
                </Button>
                <Button size="sm" asChild className="md:hidden">
                  <Link href="/login">登录</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="pb-3 md:hidden">
            <SearchBar placeholder="搜索帖子、用户、话题..." />
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      </Suspense>
    </header>
  );
}
