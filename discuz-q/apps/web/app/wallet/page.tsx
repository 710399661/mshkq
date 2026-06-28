'use client';

import { useQuery } from '@tanstack/react-query';
import { Wallet, TrendingUp, TrendingDown, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui/card';
import { Skeleton } from '@discuzq/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { formatCompactNumber } from '@discuzq/utils/format';
import { formatSmartDate } from '@discuzq/utils/date';
import { getClientApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import { Button } from '@discuzq/ui/button';

interface WalletData {
  balance: number;
  freeze_amount: number;
  available_amount: number;
  total_income: number;
  total_expense: number;
}

interface WalletLog {
  id: number;
  type: string;
  amount: number;
  balance: number;
  description: string;
  created_at: string;
}

export default function WalletPage() {
  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const { data: wallet, isLoading: isLoadingWallet } = useQuery<WalletData>({
    queryKey: ['wallet'],
    queryFn: async () => {
      const api = getClientApi();
      const result = await api.wallet.show();
      return (result as any).data || result;
    },
    enabled: isAuthenticated,
  });

  const { data: logsData } = useQuery<{ data: WalletLog[] }>({
    queryKey: ['wallet', 'logs'],
    queryFn: async () => {
      const api = getClientApi();
      return await api.wallet.logs({ page: 1, pageSize: 20 });
    },
    enabled: isAuthenticated,
  });

  const logs = logsData?.data || [];

  const getLogTypeInfo = (type: string) => {
    const typeMap: Record<string, { label: string; icon: any; color: string }> = {
      recharge: { label: '充值', icon: TrendingUp, color: 'text-green-600' },
      withdraw: { label: '提现', icon: TrendingDown, color: 'text-orange-600' },
      income: { label: '收入', icon: TrendingUp, color: 'text-green-600' },
      expense: { label: '支出', icon: TrendingDown, color: 'text-red-600' },
      purchase: { label: '购买', icon: TrendingDown, color: 'text-red-600' },
      reward: { label: '打赏', icon: TrendingUp, color: 'text-green-600' },
      refund: { label: '退款', icon: TrendingUp, color: 'text-green-600' },
    };
    return typeMap[type] || { label: type, icon: Wallet, color: 'text-gray-600' };
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">我的钱包</h1>
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold">请先登录</h2>
          <p className="mt-2 text-sm text-muted-foreground">登录后才能使用钱包功能</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          我的钱包
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              可用余额
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingWallet ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div className="text-3xl font-bold">
                ¥{formatCompactNumber(wallet?.available_amount || 0)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              冻结金额
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingWallet ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div className="text-3xl font-bold text-orange-600">
                ¥{formatCompactNumber(wallet?.freeze_amount || 0)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              总资产
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingWallet ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div className="text-3xl font-bold">
                ¥{formatCompactNumber(wallet?.balance || 0)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/wallet/recharge" className="flex-1">
          <Button className="w-full h-12 text-lg">
            <CreditCard className="mr-2 h-5 w-5" />
            充值
          </Button>
        </Link>
        <Link href="/wallet/withdraw" className="flex-1">
          <Button variant="outline" className="w-full h-12 text-lg">
            <ArrowUpRight className="mr-2 h-5 w-5" />
            提现
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>账户明细</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无交易记录
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => {
                const info = getLogTypeInfo(log.type);
                const Icon = info.icon;
                const isPositive = log.amount > 0;

                return (
                  <div
                    key={log.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${info.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.description || '无说明'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{log.amount > 0 ? '+' : ''}¥{Math.abs(log.amount).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatSmartDate(log.created_at)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
