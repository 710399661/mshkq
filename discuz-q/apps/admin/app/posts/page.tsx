'use client';

import { MessageSquare, Search } from 'lucide-react';
import { DataTable, type Column } from '@/components/data-table';
import { Button, Input, Badge, Avatar, AvatarFallback, Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface Post {
  id: number;
  content: string;
  author: string;
  threadTitle: string;
  likes: number;
  status: string;
  createdAt: string;
}

const mockPosts: Post[] = [
  { id: 1, content: '非常棒的分享，学到了很多！感谢楼主的整理。', author: '张三', threadTitle: '新手入门指南：如何发布第一篇帖子', likes: 23, status: 'published', createdAt: '2024-01-15 10:30' },
  { id: 2, content: '请问这个插件在哪里下载？有没有官网链接？', author: '李四', threadTitle: '分享一个很好用的 VS Code 插件', likes: 5, status: 'published', createdAt: '2024-01-15 09:15' },
  { id: 3, content: '支持！期待更多类似的技术分享内容。', author: '王五', threadTitle: '技术分享：Next.js 15 新特性解析', likes: 12, status: 'published', createdAt: '2024-01-14 18:00' },
  { id: 4, content: '违规内容测试评论，需要删除处理。', author: '测试用户', threadTitle: '求助：如何自定义头像？', likes: 0, status: 'deleted', createdAt: '2024-01-14 16:45' },
  { id: 5, content: '我也遇到了同样的问题，同问！', author: '赵六', threadTitle: '求助：如何自定义头像？', likes: 2, status: 'published', createdAt: '2024-01-14 15:20' },
  { id: 6, content: '活动很有意思，已经报名参加了！', author: '钱七', threadTitle: '周末活动：线下技术沙龙报名中', likes: 8, status: 'pending', createdAt: '2024-01-14 14:00' },
  { id: 7, content: '总结得很全面，收藏了慢慢看。', author: '孙八', threadTitle: '资源分享：免费图标网站合集', likes: 15, status: 'published', createdAt: '2024-01-13 20:30' },
  { id: 8, content: '个人更倾向于 React，生态更完善一些。', author: '周九', threadTitle: '讨论：2024 年最值得学习的前端框架', likes: 6, status: 'published', createdAt: '2024-01-13 16:00' },
  { id: 9, content: 'Vue 也很不错，上手更快。', author: '吴十', threadTitle: '讨论：2024 年最值得学习的前端框架', likes: 4, status: 'published', createdAt: '2024-01-13 14:30' },
  { id: 10, content: '请问管理员，头像尺寸有限制吗？', author: '郑十一', threadTitle: '求助：如何自定义头像？', likes: 1, status: 'published', createdAt: '2024-01-12 10:00' },
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

export default function PostsPage() {
  const columns: Column<Post>[] = [
    {
      key: 'content',
      title: '评论内容',
      render: (post) => (
        <div className="max-w-xs">
          <p className="line-clamp-2">{post.content}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Avatar className="h-4 w-4">
                <AvatarFallback className="text-[10px]">{post.author.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {post.author}
            </span>
          </p>
        </div>
      ),
    },
    {
      key: 'threadTitle',
      title: '所属帖子',
      render: (post) => (
        <p className="max-w-[180px] line-clamp-1 text-sm">{post.threadTitle}</p>
      ),
    },
    {
      key: 'status',
      title: '状态',
      render: (post) => (
        <Badge variant={getBadgeVariant(post.status)}>
          {getStatusText(post.status)}
        </Badge>
      ),
    },
    { key: 'likes', title: '点赞' },
    { key: 'createdAt', title: '发布时间' },
    {
      key: 'actions',
      title: '操作',
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">查看</Button>
          <Button variant="destructive" size="sm">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">评论管理</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          管理社区所有评论内容
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">评论列表</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索评论..." className="w-64 pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<Post>
            columns={columns}
            data={mockPosts}
            total={25641}
            page={1}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
