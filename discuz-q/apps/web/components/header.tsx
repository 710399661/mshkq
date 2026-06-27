'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, MessageCircle, User, LogOut, Settings, FileText, UserCircle, PenSquare } from 'lucide-react';
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

export function Header() {
  const router = useRouter();
  const { userInfo, token } = useAuthStore();
  const logoutMutation = useLogout();
  const isLoggedIn = !!token;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: '已退出登录' });
        router.push('/');
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Discuz! Q</span>
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

          <div className="flex items-center gap-3">
            <div className="hidden w-72 md:block">
              <SearchBar placeholder="搜索帖子、用户、话题..." />
            </div>

            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                </Button>

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
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      个人主页
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      我的帖子
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      消息通知
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {logoutMutation.isPending ? '退出中...' : '退出登录'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" asChild>
                  <Link href="/post/new">
                    <PenSquare className="mr-1.5 h-4 w-4" />
                    发帖
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">登录</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">注册</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
