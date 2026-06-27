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
import { formatSmartDate } from '@discuzq/utils/date';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  getNotificationText,
  type NotificationWithUser,
} from '@/lib/mock-notifications';

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
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<NotificationWithUser[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['notifications', activeTab],
    queryFn: async () => {
      const result = await getNotifications({ page: 1, per_page: 10, type: activeTab });
      return result;
    },
    initialData: {
      data: [],
      meta: { current_page: 1, per_page: 10, total: 0, last_page: 1 },
    },
  });

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: getUnreadCount,
    initialData: { count: 0 },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({ title: '已全部标记为已读' });
    },
  });

  useEffect(() => {
    if (data?.data) {
      setAllNotifications(data.data);
      setPage(1);
    }
  }, [data?.data, activeTab]);

  const handleLoadMore = useCallback(async () => {
    const nextPage = page + 1;
    if (nextPage > data.meta.last_page || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const result = await getNotifications({ page: nextPage, per_page: 10, type: activeTab });
      setAllNotifications((prev) => [...prev, ...result.data]);
      setPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, data.meta.last_page, activeTab, isLoadingMore]);

  const handleNotificationClick = useCallback(
    (notification: NotificationWithUser) => {
      if (!notification.read_at) {
        markAsReadMutation.mutate(notification.id);
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

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const hasMore = page < data.meta.last_page;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">通知中心</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            你有 <span className="font-medium text-primary">{unreadData.count}</span> 条未读通知
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={markAllAsReadMutation.isPending || unreadData.count === 0}
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
                {allNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
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

function NotificationItem({
  notification,
  onClick,
}: {
  notification: NotificationWithUser;
  onClick: () => void;
}) {
  const { action, target } = getNotificationText(notification);
  const isUnread = !notification.read_at;

  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50"
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={notification.user?.avatar} alt={notification.user?.username} />
          <AvatarFallback>{notification.user?.username?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        {isUnread && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-foreground">{notification.user?.username}</span>
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
}
