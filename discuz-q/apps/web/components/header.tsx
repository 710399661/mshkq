import Link from 'next/link';
import { Search, Bell, MessageCircle, User } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Input } from '@discuzq/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@discuzq/ui/dropdown-menu';

export function Header() {
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
            <div className="hidden w-64 md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索帖子..."
                  className="w-full pl-8 h-9 text-sm"
                />
              </div>
            </div>

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
                    <AvatarImage src="" alt="user" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>个人主页</DropdownMenuItem>
                <DropdownMenuItem>我的帖子</DropdownMenuItem>
                <DropdownMenuItem>消息通知</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>设置</DropdownMenuItem>
                <DropdownMenuItem>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm">发布</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
