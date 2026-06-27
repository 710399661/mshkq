'use client';

import { FolderTree, Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { DataTable, type Column } from '@/components/data-table';
import { Button, Input, Badge, Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface Category {
  id: number;
  name: string;
  description: string;
  threadCount: number;
  sort: number;
  status: string;
}

const mockCategories: Category[] = [
  { id: 1, name: '公告', description: '社区公告和重要通知', threadCount: 45, sort: 1, status: 'active' },
  { id: 2, name: '技术讨论', description: '技术交流与分享', threadCount: 1256, sort: 2, status: 'active' },
  { id: 3, name: '问答求助', description: '问题求助与解答', threadCount: 892, sort: 3, status: 'active' },
  { id: 4, name: '资源分享', description: '优质资源分享', threadCount: 678, sort: 4, status: 'active' },
  { id: 5, name: '闲聊灌水', description: '轻松闲聊话题', threadCount: 2341, sort: 5, status: 'active' },
  { id: 6, name: '活动聚会', description: '线下线上活动', threadCount: 156, sort: 6, status: 'active' },
  { id: 7, name: '教程分享', description: '原创教程分享', threadCount: 432, sort: 7, status: 'active' },
  { id: 8, name: '意见反馈', description: '社区意见和建议', threadCount: 89, sort: 8, status: 'inactive' },
];

function getBadgeVariant(status: string) {
  return status === 'active' ? 'default' as const : 'secondary' as const;
}

function getStatusText(status: string) {
  return status === 'active' ? '启用' : '禁用';
}

export default function CategoriesPage() {
  const columns: Column<Category>[] = [
    { key: 'id', title: 'ID', width: '60px' },
    {
      key: 'name',
      title: '分类名称',
      render: (category) => (
        <div>
          <p className="font-medium">{category.name}</p>
          <p className="text-xs text-muted-foreground">{category.description}</p>
        </div>
      ),
    },
    { key: 'threadCount', title: '帖子数' },
    { key: 'sort', title: '排序' },
    {
      key: 'status',
      title: '状态',
      render: (category) => (
        <Badge variant={getBadgeVariant(category.status)}>
          {getStatusText(category.status)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      title: '操作',
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">分类管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理社区帖子分类
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新增分类
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">分类列表</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索分类..." className="w-64 pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<Category>
            columns={columns}
            data={mockCategories}
            total={mockCategories.length}
            page={1}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
