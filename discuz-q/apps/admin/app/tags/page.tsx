import { Tags, Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { DataTable, type Column } from '@/components/data-table';
import { Button, Input, Badge, Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface Tag {
  id: number;
  name: string;
  threadCount: number;
  color: string;
  status: string;
}

const tagColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
  'bg-yellow-100 text-yellow-700',
  'bg-red-100 text-red-700',
];

const mockTags: Tag[] = [
  { id: 1, name: 'React', threadCount: 567, color: tagColors[0], status: 'active' },
  { id: 2, name: 'Next.js', threadCount: 345, color: tagColors[1], status: 'active' },
  { id: 3, name: 'TypeScript', threadCount: 432, color: tagColors[2], status: 'active' },
  { id: 4, name: '前端', threadCount: 1234, color: tagColors[3], status: 'active' },
  { id: 5, name: '后端', threadCount: 567, color: tagColors[4], status: 'active' },
  { id: 6, name: 'Node.js', threadCount: 289, color: tagColors[5], status: 'active' },
  { id: 7, name: 'Vue', threadCount: 456, color: tagColors[6], status: 'active' },
  { id: 8, name: 'CSS', threadCount: 178, color: tagColors[7], status: 'inactive' },
  { id: 9, name: 'JavaScript', threadCount: 890, color: tagColors[0], status: 'active' },
  { id: 10, name: '教程', threadCount: 234, color: tagColors[1], status: 'active' },
];

function getBadgeVariant(status: string) {
  return status === 'active' ? 'default' as const : 'secondary' as const;
}

function getStatusText(status: string) {
  return status === 'active' ? '启用' : '禁用';
}

export default function TagsPage() {
  const columns: Column<Tag>[] = [
    { key: 'id', title: 'ID', width: '60px' },
    {
      key: 'name',
      title: '标签名称',
      render: (tag) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tag.color}`}>
          {tag.name}
        </span>
      ),
    },
    { key: 'threadCount', title: '使用次数' },
    {
      key: 'status',
      title: '状态',
      render: (tag) => (
        <Badge variant={getBadgeVariant(tag.status)}>
          {getStatusText(tag.status)}
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
          <h1 className="text-2xl font-bold">标签管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理社区内容标签
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新增标签
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-base font-medium">标签列表</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索标签..." className="w-64 pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<Tag>
            columns={columns}
            data={mockTags}
            total={156}
            page={1}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
