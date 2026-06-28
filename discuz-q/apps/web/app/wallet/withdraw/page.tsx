'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui/card';
import { Input } from '@discuzq/ui/input';
import { toast } from '@discuzq/ui/toast';
import { getClientApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function WithdrawPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const [amount, setAmount] = useState('');
  const [alipayAccount, setAlipayAccount] = useState('');
  const [realName, setRealName] = useState('');

  const { data: wallet } = useQuery<any>({
    queryKey: ['wallet'],
    queryFn: async () => {
      const api = getClientApi();
      return await api.wallet.show();
    },
    enabled: isAuthenticated,
  });

  const withdrawMutation = useMutation({
    mutationFn: async (data: { amount: number; account: string; real_name: string }) => {
      const api = getClientApi();
      return await api.wallet.withdraw(data);
    },
    onSuccess: () => {
      toast({ title: '提现申请已提交' });
      router.push('/wallet');
    },
    onError: (error: any) => {
      toast({
        title: '提现失败',
        description: error?.message || '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount < 1) {
      toast({
        title: '请输入有效金额',
        description: '提现金额最少为 1 元',
        variant: 'destructive',
      });
      return;
    }

    if (numAmount > (wallet?.available_amount || 0)) {
      toast({
        title: '余额不足',
        description: '可提现余额不足',
        variant: 'destructive',
      });
      return;
    }

    if (!alipayAccount.trim()) {
      toast({
        title: '请填写收款账户',
        description: '请输入支付宝账号',
        variant: 'destructive',
      });
      return;
    }

    if (!realName.trim()) {
      toast({
        title: '请填写真实姓名',
        description: '请输入您的真实姓名',
        variant: 'destructive',
      });
      return;
    }

    withdrawMutation.mutate({
      amount: numAmount,
      account: alipayAccount,
      real_name: realName,
    });
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
          <p className="mt-2 text-sm text-muted-foreground">登录后才能提现</p>
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
          <ArrowUpRight className="h-6 w-6" />
          提现
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          可提现余额：¥{(wallet?.available_amount || 0).toFixed(2)}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>提现信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">提现金额</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ¥
              </span>
              <Input
                type="text"
                placeholder="请输入提现金额"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
                className="pl-8 text-lg h-12"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              可提现余额 ¥{(wallet?.available_amount || 0).toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">支付宝账号</label>
            <Input
              type="text"
              placeholder="请输入支付宝账号"
              value={alipayAccount}
              onChange={(e) => setAlipayAccount(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">真实姓名</label>
            <Input
              type="text"
              placeholder="请输入真实姓名"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">提现须知</p>
                <ul className="mt-2 space-y-1 text-orange-700">
                  <li>• 提现申请提交后，将在 1-3 个工作日内处理</li>
                  <li>• 每笔提现将收取 ¥1.00 手续费</li>
                  <li>• 提现仅支持支付宝到账</li>
                  <li>• 请确保账户信息准确，错误自负</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!amount || !alipayAccount || !realName || withdrawMutation.isPending}
            className="w-full h-12 text-lg"
          >
            {withdrawMutation.isPending ? '提交中...' : '提交提现申请'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
