'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Input } from '@discuzq/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@discuzq/ui/card';
import { toast } from '@discuzq/ui/toast';
import { useLogin } from '@/hooks/useAuth';

interface FormErrors {
  account?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const redirect = (searchParams.get('redirect') || '/') as string;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!account.trim()) {
      newErrors.account = '请输入用户名/邮箱/手机号';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少6位';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const isEmail = account.includes('@');
    const isMobile = /^1[3-9]\d{9}$/.test(account);

    const params: { username?: string; email?: string; mobile?: string; password: string } = {
      password,
    };

    if (isEmail) {
      params.email = account;
    } else if (isMobile) {
      params.mobile = account;
    } else {
      params.username = account;
    }

    loginMutation.mutate(params as any, {
      onSuccess: () => {
        toast({ title: '登录成功' });
        router.push(redirect as any);
      },
      onError: (error: { message?: string }) => {
        toast({
          title: '登录失败',
          description: error.message || '请检查账号和密码',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">Discuz! Q</h1>
              <p className="text-lg text-muted-foreground">新一代社区系统</p>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">✓</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">轻量高效</p>
                  <p className="text-sm">现代化的技术栈，极速响应</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">✓</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">开放自由</p>
                  <p className="text-sm">丰富的插件生态，高度可定制</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">✓</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">安全可靠</p>
                  <p className="text-sm">企业级安全防护，数据加密存储</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">欢迎回来</CardTitle>
            <CardDescription>登录您的账号，参与社区讨论</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="account" className="text-sm font-medium">
                  用户名 / 邮箱 / 手机号
                </label>
                <Input
                  id="account"
                  type="text"
                  placeholder="请输入用户名、邮箱或手机号"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                    if (errors.account) {
                      setErrors((prev) => ({ ...prev, account: undefined }));
                    }
                  }}
                  className={errors.account ? 'border-destructive' : ''}
                  disabled={loginMutation.isPending}
                />
                {errors.account && (
                  <p className="text-sm text-destructive">{errors.account}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  密码
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={loginMutation.isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-input accent-primary"
                    disabled={loginMutation.isPending}
                  />
                  <span>记住我</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  忘记密码？
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登录中...
                  </>
                ) : (
                  '登录'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link href="/register" className="text-primary hover:underline">
                立即注册
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
