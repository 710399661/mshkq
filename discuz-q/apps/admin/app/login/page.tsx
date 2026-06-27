'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@discuzq/ui';
import { useAdminAuthStore } from '@/store/auth';
import { getAdminApi, setAdminToken, resetAdminApi } from '@/lib/api';
import { toast } from '@discuzq/ui/toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAdminAuthStore();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    try {
      const api = getAdminApi();
      const result: any = await api.auth.login(username.trim(), password.trim());

      if (result?.user && result?.token) {
        const roles = result.user.roles || [];
        const isAdmin = roles.some((r: any) => r.name === 'super_admin' || r.name === 'admin') 
          || result.user.status === 1;

        if (!isAdmin) {
          toast({
            title: '登录失败',
            description: '您没有管理员权限',
            variant: 'destructive',
          });
          resetAdminApi();
          return;
        }

        login(result.token, result.user);
        setAdminToken(result.token);

        toast({
          title: '登录成功',
          description: '欢迎回来，管理员',
        });

        router.push(redirect);
      }
    } catch (error: any) {
      toast({
        title: '登录失败',
        description: error?.message || '用户名或密码错误',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">DQ</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Discuz! Q 管理后台</h1>
          <p className="mt-2 text-sm text-slate-400">请登录以继续访问管理面板</p>
        </div>

        <Card className="border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">管理员登录</CardTitle>
            <CardDescription>
              输入您的管理员账号和密码
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-input" />
                  记住我
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  忘记密码？
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '登录中...' : '登 录'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-slate-500">
          返回 <a href="/" className="text-slate-400 hover:text-white">前台首页</a>
        </p>
      </div>
    </div>
  );
}
