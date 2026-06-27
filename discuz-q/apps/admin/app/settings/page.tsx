import { Settings, Save } from 'lucide-react';
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@discuzq/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">系统设置</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          配置社区基本参数
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">基本设置</CardTitle>
            <CardDescription>
              站点基本信息配置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="site-name" className="text-sm font-medium">站点名称</label>
              <Input id="site-name" defaultValue="Discuz! Q" />
            </div>
            <div className="space-y-2">
              <label htmlFor="site-description" className="text-sm font-medium">站点描述</label>
              <Input id="site-description" defaultValue="新一代社区系统" />
            </div>
            <div className="space-y-2">
              <label htmlFor="site-url" className="text-sm font-medium">站点地址</label>
              <Input id="site-url" defaultValue="https://discuzq.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm font-medium">管理员邮箱</label>
              <Input id="admin-email" type="email" defaultValue="admin@discuzq.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">内容设置</CardTitle>
            <CardDescription>
              内容审核和发布规则
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="post-per-page" className="text-sm font-medium">每页帖子数</label>
              <Input id="post-per-page" type="number" defaultValue="20" />
            </div>
            <div className="space-y-2">
              <label htmlFor="comment-per-page" className="text-sm font-medium">每页评论数</label>
              <Input id="comment-per-page" type="number" defaultValue="10" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="need-review"
                className="h-4 w-4 rounded border-input"
                defaultChecked
              />
              <label htmlFor="need-review" className="text-sm">新用户发帖需要审核</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allow-register"
                className="h-4 w-4 rounded border-input"
                defaultChecked
              />
              <label htmlFor="allow-register" className="text-sm">允许用户注册</label>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">邮件设置</CardTitle>
            <CardDescription>
              邮件通知服务配置
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP 服务器</Label>
                <Input id="smtp-host" placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">端口</Label>
                <Input id="smtp-port" type="number" placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">用户名</Label>
                <Input id="smtp-user" placeholder="noreply@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-pass">密码</Label>
                <Input id="smtp-pass" type="password" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">重置</Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          保存设置
        </Button>
      </div>
    </div>
  );
}
