import { FileText, Search, Plus } from 'lucide-react';
import { DataTable, type Column } from '@/components/data-table';
import { Button, Input, Badge, Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  views: number;
  replies: number;
  status: string;
  createdAt: string;
}

const mockThreads: Thread[] = [
  { id: 1, title: '欢迎来到 Discuz! Q 社区', author: 'admin', category: '公告', views: 2341, replies: 56, status: 'published', createdAt: '2024-01-15 10:00' },
  { id: 2, title: '新手入门指南：如何发布第一篇帖子', author: '张三', category: '教程', views: 892, replies: 18, status: 'published', createdAt: '2024-01-15 08:30' },
  { id: 3, title: '关于社区规则的重要通知', author: 'admin', category: '公告', views: 1567, replies: 34, status: 'published', createdAt: '2024-01-14 20:00' },
  { id: 4, title: '技术分享：Next.js 15 新特性解析', author: '王五', category: '技术', views: 678, replies: 12, status: 'pending', createdAt: '2024-01-14 15:30' },
  { id: 5, title: '周末活动：线下技术沙龙报名中', author: '赵六', category: '活动', views: 456, replies: 28, status: 'published', createdAt: '2024-01-14 10:00' },
  { id: 6, title: '求助：如何自定义头像？', author: '李四', category: '问答', views: 234, replies: 8, status: 'published', createdAt: '2024-01-13 16:45' },
  { id: 7, title: '分享一个很好用的 VS Code 插件', author: '孙八', category: '分享', views: 567, replies: 15, status: 'published', createdAt: '2024-01-13 14:20' },
  { id: 8, title: '违规广告帖子测试001', author: '测试用户', category: '其他', views: 12, replies: 0, status: 'deleted', createdAt: '2024-01-13 12:00' },
  { id: 9, title: '讨论：2024 年最值得学习的前端框架', author: '周九', category: '讨论', views: 1234, replies: 67, status: 'published', createdAt: '2024-01-12 09:00' },
  { id: 10, title: '资源分享：免费图标网站合集', author: '郑十一', category: '分享', views: 789, replies: 23, status: 'published', createdAt: '2024-01-11 11:30' },
];

function getBadgeVariant(status: string) {
  switch (status) {
    case 'published':
      return 'default' as const;
    case 'pending':
      return 'secondary' as const;
    case 'deleted':
      return 'destructive' as const;
    default:
      return 'secondary' as const;
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'published':
      return '已发布';
    case 'pending':
      return '待审核';
    case 'deleted':
      return '已删除';
    default:
      return status;
  }
}

export default function ThreadsPage() {
  const columns: Column<Thread>[] = [
    {
      key: 'title',
      title: '标题',
      render: (thread) => (
        <div className="max-w-xs">
          <p className="font-medium line-clamp-1">{thread.title}</p>
          <p className="text-xs text-muted-foreground">作者: {thread.author}</p>
        </div>
      ),
    },
    { key: 'category', title: '分类' },
    {
      key: 'status',
      title: '状态',
      render: (thread) => (
        <Badge variant={getBadgeVariant(thread.status)}>
          {getStatusText(thread.status)}
        </Badge>
      ),
    },
    { key: 'views', title: '浏览' },
    { key: 'replies', title: '回复' },
    { key: 'createdAt', title: '发布时间' },
    {
      key: 'actions',
      title: '操作',
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">编辑</Button>
          <Button variant="destructive" size="sm">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">帖子管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理社区所有帖子内容
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          发布帖子
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">帖子列表</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索帖子..." className="w-64 pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<Thread>
            columns={columns}
            data={mockThreads}
            total={8432}
            page={1}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
