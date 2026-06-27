'use client';

import { Users, Search, Plus } from 'lucide-react';
import { DataTable, type Column } from '@/components/data-table';
import { Button, Input, Badge, Avatar, AvatarFallback, Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  posts: number;
}

const mockUsers: User[] = [
  { id: 1, username: 'admin', email: 'admin@discuzq.com', role: '管理员', status: 'active', createdAt: '2024-01-01', posts: 156 },
  { id: 2, username: '张三', email: 'zhangsan@example.com', role: '用户', status: 'active', createdAt: '2024-01-10', posts: 45 },
  { id: 3, username: '李四', email: 'lisi@example.com', role: '用户', status: 'active', createdAt: '2024-01-12', posts: 23 },
  { id: 4, username: '王五', email: 'wangwu@example.com', role: '用户', status: 'pending', createdAt: '2024-01-14', posts: 0 },
  { id: 5, username: '赵六', email: 'zhaoliu@example.com', role: '版主', status: 'active', createdAt: '2024-01-05', posts: 89 },
  { id: 6, username: '钱七', email: 'qianqi@example.com', role: '用户', status: 'banned', createdAt: '2024-01-08', posts: 12 },
  { id: 7, username: '孙八', email: 'sunba@example.com', role: '用户', status: 'active', createdAt: '2024-01-13', posts: 34 },
  { id: 8, username: '周九', email: 'zhoujiu@example.com', role: '用户', status: 'active', createdAt: '2024-01-11', posts: 56 },
  { id: 9, username: '吴十', email: 'wushi@example.com', role: '用户', status: 'pending', createdAt: '2024-01-15', posts: 0 },
  { id: 10, username: '郑十一', email: 'zheng11@example.com', role: '用户', status: 'active', createdAt: '2024-01-09', posts: 28 },
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

export default function UsersPage() {
  const columns: Column<User>[] = [
    {
      key: 'username',
      title: '用户',
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', title: '角色' },
    {
      key: 'status',
      title: '状态',
      render: (user) => (
        <Badge variant={getBadgeVariant(user.status)}>
          {getStatusText(user.status)}
        </Badge>
      ),
    },
    { key: 'posts', title: '发帖数' },
    { key: 'createdAt', title: '注册时间' },
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
          <h1 className="text-2xl font-bold">用户管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理社区所有用户账户
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">用户列表</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索用户..." className="w-64 pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<User>
            columns={columns}
            data={mockUsers}
            total={12580}
            page={1}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
