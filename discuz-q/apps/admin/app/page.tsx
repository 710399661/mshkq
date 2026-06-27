import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import { Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, Badge } from '@discuzq/ui';

const mockStats = [
  {
    title: '用户总数',
    value: '12,580',
    icon: Users,
    change: '128',
    changeType: 'increase' as const,
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-50',
  },
  {
    title: '帖子总数',
    value: '8,432',
    icon: FileText,
    change: '56',
    changeType: 'increase' as const,
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-50',
  },
  {
    title: '评论总数',
    value: '25,641',
    icon: MessageSquare,
    change: '234',
    changeType: 'increase' as const,
    iconColor: 'text-purple-600',
    iconBgColor: 'bg-purple-50',
  },
  {
    title: '今日新增',
    value: '89',
    icon: TrendingUp,
    change: '12%',
    changeType: 'increase' as const,
    iconColor: 'text-orange-600',
    iconBgColor: 'bg-orange-50',
  },
];

const mockUserRegistrations = [65, 78, 92, 85, 120, 105, 128];
const mockThreadCreations = [45, 52, 38, 67, 72, 58, 56];
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const latestUsers = [
  { id: 1, username: '张三', email: 'zhangsan@example.com', createdAt: '2024-01-15 10:30', status: 'active' },
  { id: 2, username: '李四', email: 'lisi@example.com', createdAt: '2024-01-15 09:15', status: 'active' },
  { id: 3, username: '王五', email: 'wangwu@example.com', createdAt: '2024-01-14 16:45', status: 'pending' },
  { id: 4, username: '赵六', email: 'zhaoliu@example.com', createdAt: '2024-01-14 14:20', status: 'active' },
  { id: 5, username: '钱七', email: 'qianqi@example.com', createdAt: '2024-01-14 11:00', status: 'banned' },
];

const latestThreads = [
  { id: 1, title: '欢迎来到 Discuz! Q 社区', author: '张三', views: 1256, replies: 32, createdAt: '2024-01-15 10:00' },
  { id: 2, title: '新手入门指南：如何发布第一篇帖子', author: '李四', views: 892, replies: 18, createdAt: '2024-01-15 08:30' },
  { id: 3, title: '关于社区规则的重要通知', author: '管理员', views: 2341, replies: 56, createdAt: '2024-01-14 20:00' },
  { id: 4, title: '技术分享：Next.js 15 新特性解析', author: '王五', views: 678, replies: 12, createdAt: '2024-01-14 15:30' },
  { id: 5, title: '周末活动：线下技术沙龙报名中', author: '赵六', views: 456, replies: 28, createdAt: '2024-01-14 10:00' },
];

function getBadgeVariant(status: string) {
  switch (status) {
    case 'active':
      return 'default' as const;
    case 'pending':
      return 'secondary' as const;
    case 'banned':
      return 'destructive' as const;
    default:
      return 'secondary' as const;
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'active':
      return '正常';
    case 'pending':
      return '待审核';
    case 'banned':
      return '已封禁';
    default:
      return status;
  }
}

export default function DashboardPage() {
  const maxRegistrations = Math.max(...mockUserRegistrations);
  const maxThreads = Math.max(...mockThreadCreations);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          欢迎回来，这是您的社区数据概览
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">最近 7 天注册趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {mockUserRegistrations.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                    style={{ height: `${(value / maxRegistrations) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{weekDays[index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">最近 7 天发帖趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {mockThreadCreations.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-green-500 transition-all hover:bg-green-600"
                    style={{ height: `${(value / maxThreads) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{weekDays[index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">最新用户</CardTitle>
            <a href="/users" className="text-sm text-primary hover:underline">
              查看全部
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(user.status)}>
                    {getStatusText(user.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">最新帖子</CardTitle>
            <a href="/threads" className="text-sm text-primary hover:underline">
              查看全部
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestThreads.map((thread) => (
                <div key={thread.id} className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium line-clamp-1">{thread.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {thread.author} · {thread.createdAt}
                    </p>
                  </div>
                  <div className="ml-4 text-right text-xs text-muted-foreground">
                    <p>{thread.views} 浏览</p>
                    <p>{thread.replies} 回复</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
