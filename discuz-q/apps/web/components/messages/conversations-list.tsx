'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Card } from '@discuzq/ui/card';
import { Skeleton } from '@discuzq/ui/skeleton';
import { Empty } from '@discuzq/ui/empty';
import { Button } from '@discuzq/ui/button';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { formatSmartDate } from '@discuzq/utils/date';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';

interface ConversationUser {
  id: number;
  username: string;
  avatar: string;
}

interface Conversation {
  id: number;
  user_id: number;
  last_message_id: number;
  last_message_at: string;
  updated_at: string;
  user: ConversationUser;
  last_message?: {
    content: string;
    sender_id: number;
    created_at: string;
  };
  unread_count?: number;
}

export function ConversationsList() {
  const router = useRouter();
  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const { data: conversations, isLoading } = useQuery<{ data: Conversation[] }>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const api = getClientApi();
      return await api.conversations.list({ page: 1, pageSize: 50 });
    },
    initialData: { data: [] },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <Card className="p-12 text-center">
        <h2 className="text-xl font-semibold">请先登录</h2>
        <p className="mt-2 text-sm text-muted-foreground">登录后才能查看私信</p>
        <div className="mt-6">
          <Link href="/login">
            <Button>去登录</Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.data.length === 0) {
    return (
      <Card className="p-12 text-center">
        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h2 className="mt-4 text-xl font-semibold">暂无私信</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          开始与志同道合的人私信交流吧
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.data.map((conversation) => (
        <Card
          key={conversation.id}
          className="p-0 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <Link href={`/messages/${conversation.id}`} className="block p-4">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={conversation.user?.avatar}
                    alt={conversation.user?.username}
                  />
                  <AvatarFallback>{conversation.user?.username?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                {conversation.unread_count && conversation.unread_count > 0 && (
                  <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {conversation.unread_count > 99 ? '99+' : conversation.unread_count}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium truncate">
                    {conversation.user?.username || '未知用户'}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {conversation.last_message_at
                      ? formatSmartDate(conversation.last_message_at)
                      : ''}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {conversation.last_message?.content || '暂无消息'}
                </p>
              </div>

              <div className="shrink-0 self-center">
                <Button variant="ghost" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
