'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Button } from '@discuzq/ui/button';
import { Card } from '@discuzq/ui/card';
import { Skeleton } from '@discuzq/ui/skeleton';
import { Textarea } from '@discuzq/ui/textarea';
import { toast } from '@discuzq/ui/toast';
import { formatSmartDate } from '@discuzq/utils/date';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  type: string;
  read_at: string | null;
  created_at: string;
  sender?: {
    id: number;
    username: string;
    avatar: string;
  };
}

export default function ConversationPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const conversationId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { token, userInfo } = useAuthStore();
  const isAuthenticated = !!token;
  const currentUserId = userInfo?.id;

  const [message, setMessage] = useState('');

  const { data: conversation, isLoading: isLoadingConversation } = useQuery<{ data: any }>({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      const api = getClientApi();
      const result = await api.conversations.list({ page: 1, pageSize: 100 });
      const found = result.data?.find((c: any) => String(c.id) === conversationId);
      return { data: found || { id: conversationId, user: null } };
    },
    initialData: { data: { id: '', user: null } },
    enabled: isAuthenticated && !!conversationId,
  });

  const { data: messagesData, isLoading: isLoadingMessages } = useQuery<{ data: Message[] }>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const api = getClientApi();
      return await api.conversations.messages(conversationId, { page: 1, pageSize: 50 });
    },
    initialData: { data: [] },
    enabled: isAuthenticated && !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const api = getClientApi();
      return await api.conversations.sendMessage(conversationId, { content });
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: () => {
      toast({
        title: '发送失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      const api = getClientApi();
      return await api.conversations.read(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    },
  });

  useEffect(() => {
    if (messagesData?.data?.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesData]);

  useEffect(() => {
    if (isAuthenticated && conversationId) {
      markAsReadMutation.mutate();
    }
  }, [conversationId, isAuthenticated]);

  const handleSend = useCallback(() => {
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message.trim());
  }, [message, sendMessageMutation]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const otherUser = conversation?.data?.user;
  const messages = messagesData?.data || [];

  if (!isAuthenticated) {
    return (
      <div className="space-y-4">
        <Link
          href="/messages"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回私信列表
        </Link>
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold">请先登录</h2>
          <p className="mt-2 text-sm text-muted-foreground">登录后才能查看私信</p>
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
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/messages"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回
        </Link>
        {isLoadingConversation ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={otherUser?.avatar} alt={otherUser?.username} />
              <AvatarFallback>{otherUser?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{otherUser?.username || '私信'}</span>
          </div>
        )}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoadingMessages ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-16 flex-1" />
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground">暂无消息，开始对话吧</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.sender_id === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={msg.sender?.avatar} alt={msg.sender?.username} />
                    <AvatarFallback>{msg.sender?.username?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatSmartDate(msg.created_at)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="输入消息..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim() || sendMessageMutation.isPending}
              size="icon"
              className="h-[80px] w-12 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
