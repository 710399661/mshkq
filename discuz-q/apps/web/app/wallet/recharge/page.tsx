'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui/card';
import { Input } from '@discuzq/ui/input';
import { toast } from '@discuzq/ui/toast';
import { getClientApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

const presetAmounts = [10, 50, 100, 200, 500, 1000];

export default function RechargePage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const [amount, setAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setAmount(String(value));
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setSelectedPreset(null);
    setAmount(value);
  };

  const rechargeMutation = useMutation({
    mutationFn: async (amount: number) => {
      const api = getClientApi();
      return await api.wallet.recharge({ amount });
    },
    onSuccess: (result: any) => {
      if (result?.data?.payment_url) {
        window.location.href = result.data.payment_url;
      } else {
        toast({ title: '充值成功' });
        router.push('/wallet');
      }
    },
    onError: () => {
      toast({
        title: '充值失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount < 1) {
      toast({
        title: '请输入有效金额',
        description: '充值金额最少为 1 元',
        variant: 'destructive',
      });
      return;
    }

    rechargeMutation.mutate(numAmount);
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <Link
          href="/wallet"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回钱包
        </Link>
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold">请先登录</h2>
          <p className="mt-2 text-sm text-muted-foreground">登录后才能充值</p>
          <div className="mt-6">
            <Link href="/login">
              <Button>去登录</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Link
        href="/wallet"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        返回钱包
      </Link>

      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          充值
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          选择或输入充值金额
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>选择充值金额</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handlePresetClick(value)}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-medium ${
                  selectedPreset === value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                ¥{value}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">自定义金额</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ¥
              </span>
              <Input
                type="text"
                placeholder="请输入金额"
                value={amount}
                onChange={handleCustomAmount}
                className="pl-8 text-lg h-12"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!amount || rechargeMutation.isPending}
            className="w-full h-12 text-lg"
          >
            {rechargeMutation.isPending ? '处理中...' : '立即充值'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            充值将跳转到支付页面完成付款
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">充值说明</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5" />
            <span>充值金额将即时到账</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5" />
            <span>支持支付宝、微信支付等主流支付方式</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-600 mt-0.5" />
            <span>充值金额不可提现，可用于购买付费内容</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
