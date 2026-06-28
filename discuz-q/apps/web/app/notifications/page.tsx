'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, MessageSquare, Heart, UserPlus, Settings, CheckCheck, ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { Button } from '@discuzq/ui/button';
import { Card } from '@discuzq/ui/card';
import { Skeleton } from '@discuzq/ui/skeleton';
import { Empty } from '@discuzq/ui/empty';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';
import { formatSmartDate } from '@discuzq/utils/date';

interface NotificationUser {
  id: number;
  username: string;
  avatar: string;
}

interface Notification {
  id: number;
  type: string;
  data: Record<string, unknown>;
  read_at: string | null;
  created_at: string;
  user?: NotificationUser;
  thread?: { id: number; title: string };
}

interface NotificationResponse {
  data: Notification[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

const notificationTabs = [
  { value: 'all', label: '全部', icon: Bell },
  { value: 'reply', label: '回复我的', icon: MessageSquare },
  { value: 'like', label: '赞了我', icon: Heart },
  { value: 'follow', label: '关注我的', icon: UserPlus },
  { value: 'system', label: '系统通知', icon: Settings },
];

export default function NotificationsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token, userInfo } = useAuthStore();
  const isAuthenticated = !!token;
  const [activeTab, setActiveTab] = useState('all');
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading } = useQuery<NotificationResponse>({
    queryKey: ['notifications', activeTab, 1],
    queryFn: async () => {
      const api = getClientApi();
      const result = await api.notifications.list({ page: 1, pageSize: 20 });
      return result as NotificationResponse;
    },
    initialData: {
      data: [],
      meta: { current_page: 1, per_page: 20, total: 0, last_page: 1 },
    },
    enabled: isAuthenticated,
  });

  const { data: unreadData } = useQuery<{ count: number }>({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: async () => {
      const api = getClientApi();
      const result = await api.notifications.unreadCount();
      return result as { count: number };
    },
    initialData: { count: 0 },
    enabled: isAuthenticated,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const api = getClientApi();
      return await api.notifications.read(id);
    },
    onMutate: (id) => {
      setAllNotifications((prev) =>
        prev.map((n) => (String(n.id) === id ? { ...n, read_at: new Date().toISOString() } : n)),
      );
      queryClient.setQueryData<{ count: number }>(['notifications', 'unreadCount'], (old) => ({
        count: Math.max(0, (old?.count || 0) - 1),
      }));
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const api = getClientApi();
      return await api.notifications.readAll();
    },
    onSuccess: () => {
      setAllNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
      queryClient.setQueryData<{ count: number }>(['notifications', 'unreadCount'], { count: 0 });
      toast({ title: '已全部标记为已读' });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: '操作失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (data?.data) {
      setAllNotifications(data.data);
      setPage(1);
      setHasMore(data.meta.current_page < data.meta.last_page);
    }
  }, [data]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || !isAuthenticated) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);
    try {
      const api = getClientApi();
      const result = (await api.notifications.list({ page: nextPage, pageSize: 20 })) as NotificationResponse;
      setAllNotifications((prev) => [...prev, ...result.data]);
      setPage(nextPage);
      setHasMore(result.meta.current_page < result.meta.last_page);
    } catch {
      toast({
        title: '加载失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, hasMore, isLoadingMore, isAuthenticated]);

  const handleNotificationClick = useCallback(
    (notification: Notification) => {
      if (!notification.read_at) {
        markAsReadMutation.mutate(String(notification.id));
      }

      if (notification.type === 'reply' || notification.type === 'like') {
        if (notification.thread?.id) {
          router.push(`/thread/${notification.thread.id}`);
        }
      } else if (notification.type === 'follow') {
        if (notification.user?.id) {
          router.push(`/user/${notification.user.id}`);
        }
      }
    },
    [markAsReadMutation, router],
  );

  const getNotificationText = (notification: Notification): { action: string; target?: string } => {
    switch (notification.type) {
      case 'reply':
        return {
          action: '回复了你的帖子',
          target: notification.thread?.title,
        };
      case 'like':
        return {
          action: '赞了你的帖子',
          target: notification.thread?.title,
        };
      case 'follow':
        return {
          action: '关注了你',
        };
      case 'system':
        return {
          action: (notification.data.title as string) || '系统通知',
          target: notification.data.content as string,
        };
      default:
        return { action: '有新通知' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold">请先登录</h2>
          <p className="mt-2 text-sm text-muted-foreground">登录后才能查看通知</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/login">
              <Button>去登录</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">注册账号</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">通知中心</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            你有 <span className="font-medium text-primary">{unreadData?.count || 0}</span> 条未读通知
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => markAllAsReadMutation.mutate()}
          disabled={markAllAsReadMutation.isPending || !unreadData?.count}
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          {markAllAsReadMutation.isPending ? '处理中...' : '全部标记已读'}
        </Button>
      </div>

      <Card className="p-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-4 py-2">
            <TabsList className="w-full justify-start bg-transparent p-0">
              {notificationTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-muted"
                >
                  <tab.icon className="mr-1.5 h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : allNotifications.length === 0 ? (
              <div className="py-16">
                <Empty description="暂无通知" />
              </div>
            ) : (
              <div className="divide-y">
                {allNotifications.map((notification) => {
                  const { action, target } = getNotificationText(notification);
                  const isUnread = !notification.read_at;

                  return (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className="flex w-full items-start gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={notification.user?.avatar}
                            alt={notification.user?.username}
                          />
                          <AvatarFallback>{notification.user?.username?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        {isUnread && (
                          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-foreground">
                            {notification.user?.username || '系统'}
                          </span>
                          <span className="text-sm text-muted-foreground">{action}</span>
                        </div>
                        {target && (
                          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{target}</p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatSmartDate(notification.created_at)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {hasMore && allNotifications.length > 0 && (
              <div className="flex justify-center p-4">
                <Button
                  variant="ghost"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="w-full"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  {isLoadingMore ? '加载中...' : '加载更多'}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
