import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui/card';
import { Badge } from '@discuzq/ui/badge';
import { BookOpen, Code, Key, MessageSquare, Users, FileText, Bell, Wallet, Shield } from 'lucide-react';

const apiGroups = [
  {
    name: '认证',
    icon: Key,
    color: 'text-blue-600',
    endpoints: [
      { method: 'POST', path: '/api/v1/auth/register', desc: '用户注册' },
      { method: 'POST', path: '/api/v1/auth/login', desc: '用户登录' },
      { method: 'POST', path: '/api/v1/auth/logout', desc: '退出登录' },
      { method: 'GET', path: '/api/v1/auth/me', desc: '获取当前用户信息' },
    ],
  },
  {
    name: '用户',
    icon: Users,
    color: 'text-green-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/users/{id}', desc: '获取用户信息' },
      { method: 'GET', path: '/api/v1/users/{id}/threads', desc: '获取用户帖子列表' },
      { method: 'GET', path: '/api/v1/users/{id}/posts', desc: '获取用户回复列表' },
      { method: 'POST', path: '/api/v1/users/{id}/follow', desc: '关注用户' },
      { method: 'PUT', path: '/api/v1/user/profile', desc: '更新个人资料' },
    ],
  },
  {
    name: '帖子',
    icon: FileText,
    color: 'text-purple-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/threads', desc: '获取帖子列表' },
      { method: 'GET', path: '/api/v1/threads/{id}', desc: '获取帖子详情' },
      { method: 'POST', path: '/api/v1/threads', desc: '发布帖子' },
      { method: 'PUT', path: '/api/v1/threads/{id}', desc: '更新帖子' },
      { method: 'DELETE', path: '/api/v1/threads/{id}', desc: '删除帖子' },
      { method: 'POST', path: '/api/v1/threads/{id}/like', desc: '点赞帖子' },
      { method: 'POST', path: '/api/v1/threads/{id}/collect', desc: '收藏帖子' },
    ],
  },
  {
    name: '分类与标签',
    icon: BookOpen,
    color: 'text-orange-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/categories', desc: '获取分类列表' },
      { method: 'GET', path: '/api/v1/categories/{id}/threads', desc: '获取分类下帖子' },
      { method: 'GET', path: '/api/v1/tags', desc: '获取标签列表' },
      { method: 'GET', path: '/api/v1/tags/search', desc: '搜索标签' },
    ],
  },
  {
    name: '评论',
    icon: MessageSquare,
    color: 'text-teal-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/threads/{id}/posts', desc: '获取评论列表' },
      { method: 'POST', path: '/api/v1/posts', desc: '发布评论' },
      { method: 'PUT', path: '/api/v1/posts/{id}', desc: '更新评论' },
      { method: 'DELETE', path: '/api/v1/posts/{id}', desc: '删除评论' },
      { method: 'POST', path: '/api/v1/posts/{id}/like', desc: '点赞评论' },
    ],
  },
  {
    name: '通知',
    icon: Bell,
    color: 'text-red-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/notifications', desc: '获取通知列表' },
      { method: 'GET', path: '/api/v1/notifications/unread-count', desc: '获取未读数量' },
      { method: 'POST', path: '/api/v1/notifications/read-all', desc: '全部标记已读' },
      { method: 'POST', path: '/api/v1/notifications/{id}/read', desc: '标记单条已读' },
    ],
  },
  {
    name: '钱包',
    icon: Wallet,
    color: 'text-yellow-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/wallet', desc: '获取钱包信息' },
      { method: 'GET', path: '/api/v1/wallet/logs', desc: '获取交易记录' },
      { method: 'POST', path: '/api/v1/wallet/recharge', desc: '申请充值' },
      { method: 'POST', path: '/api/v1/wallet/withdraw', desc: '申请提现' },
    ],
  },
  {
    name: '私信',
    icon: MessageSquare,
    color: 'text-indigo-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/conversations', desc: '获取会话列表' },
      { method: 'POST', path: '/api/v1/conversations', desc: '创建会话' },
      { method: 'GET', path: '/api/v1/conversations/{id}/messages', desc: '获取消息列表' },
      { method: 'POST', path: '/api/v1/conversations/{id}/messages', desc: '发送消息' },
    ],
  },
  {
    name: '管理后台',
    icon: Shield,
    color: 'text-gray-600',
    endpoints: [
      { method: 'GET', path: '/api/v1/admin/stats', desc: '获取统计数据' },
      { method: 'GET', path: '/api/v1/admin/users', desc: '用户列表' },
      { method: 'POST', path: '/api/v1/admin/users/{id}/ban', desc: '封禁用户' },
      { method: 'GET', path: '/api/v1/admin/threads', desc: '帖子列表' },
      { method: 'POST', path: '/api/v1/admin/threads/{id}/sticky', desc: '置顶帖子' },
      { method: 'POST', path: '/api/v1/admin/threads/{id}/essence', desc: '精华帖子' },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-yellow-100 text-yellow-700',
  DELETE: 'bg-red-100 text-red-700',
};

export default function ApiDocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="h-8 w-8" />
          API 文档
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discuz! Q RESTful API v1 接口文档
        </p>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">快速开始</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">基础 URL</p>
              <code className="block mt-1 p-2 bg-background rounded text-primary">
                http://localhost:8000/api/v1
              </code>
            </div>
            <div>
              <p className="font-medium">认证方式</p>
              <p className="mt-1 text-muted-foreground">
                使用 Sanctum Token 认证，在请求头中添加：
              </p>
              <code className="block mt-1 p-2 bg-background rounded text-primary">
                Authorization: Bearer {'{token}'}
              </code>
            </div>
            <div>
              <p className="font-medium">响应格式</p>
              <p className="mt-1 text-muted-foreground">
                所有接口返回统一 JSON 格式：
              </p>
              <pre className="mt-1 p-2 bg-background rounded text-xs overflow-x-auto">
{`{
  "code": 0,
  "message": "success",
  "data": {}
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apiGroups.map((group) => {
          const Icon = group.icon;
          return (
            <Card key={group.name}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${group.color}`} />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {group.endpoints.map((endpoint) => (
                    <div
                      key={endpoint.path}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Badge
                          variant="secondary"
                          className={`shrink-0 font-mono text-xs ${methodColors[endpoint.method]}`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs truncate">{endpoint.path}</code>
                      </div>
                      <span className="text-muted-foreground text-xs shrink-0">
                        {endpoint.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>错误码说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-600">0</p>
              <p className="text-muted-foreground">成功</p>
            </div>
            <div>
              <p className="font-medium text-yellow-600">400</p>
              <p className="text-muted-foreground">请求参数错误</p>
            </div>
            <div>
              <p className="font-medium text-red-600">401</p>
              <p className="text-muted-foreground">未授权</p>
            </div>
            <div>
              <p className="font-medium text-red-600">403</p>
              <p className="text-muted-foreground">权限不足</p>
            </div>
            <div>
              <p className="font-medium text-red-600">404</p>
              <p className="text-muted-foreground">资源不存在</p>
            </div>
            <div>
              <p className="font-medium text-yellow-600">422</p>
              <p className="text-muted-foreground">验证失败</p>
            </div>
            <div>
              <p className="font-medium text-red-600">429</p>
              <p className="text-muted-foreground">请求过于频繁</p>
            </div>
            <div>
              <p className="font-medium text-red-600">500</p>
              <p className="text-muted-foreground">服务器错误</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
