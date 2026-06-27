'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, MessageCircle, Share2, Bookmark, Flag } from 'lucide-react';
import { cn } from '@discuzq/ui';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';

interface ThreadDetailActionsProps {
  threadId: string;
  initialLiked?: boolean;
  initialCollected?: boolean;
  likeCount: number;
  commentCount: number;
}

export function ThreadDetailActions({
  threadId,
  initialLiked = false,
  initialCollected = false,
  likeCount,
  commentCount,
}: ThreadDetailActionsProps) {
  const { token } = useAuthStore();
  const isAuthenticated = !!token;
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isCollected, setIsCollected] = useState(initialCollected);

  const likeMutation = useMutation({
    mutationFn: async () => {
      const api = getClientApi();
      return await api.threads.like(threadId);
    },
    onMutate: async () => {
      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    onError: () => {
      setIsLiked(isLiked);
      setLikes(likeCount);
      toast({
        title: '操作失败',
        description: '点赞失败，请稍后重试',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      setIsLiked(data.liked);
      queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
    },
  });

  const collectMutation = useMutation({
    mutationFn: async () => {
      const api = getClientApi();
      return await api.threads.collect(threadId);
    },
    onMutate: async () => {
      setIsCollected((prev) => !prev);
    },
    onError: () => {
      setIsCollected(isCollected);
      toast({
        title: '操作失败',
        description: '收藏失败，请稍后重试',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      setIsCollected(data.collected);
      queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能点赞',
        variant: 'destructive',
      });
      return;
    }
    likeMutation.mutate();
  };

  const handleCollect = () => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能收藏',
        variant: 'destructive',
      });
      return;
    }
    collectMutation.mutate();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: '复制成功',
        description: '链接已复制到剪贴板',
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-2 text-sm transition-colors',
            isLiked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500',
          )}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
          <span>{likes} 点赞</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-5 w-5" />
          <span>{commentCount} 评论</span>
        </div>
        <button
          onClick={handleCollect}
          className={cn(
            'flex items-center gap-2 text-sm transition-colors',
            isCollected ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500',
          )}
        >
          <Bookmark className={cn('h-5 w-5', isCollected && 'fill-current')} />
          <span>{isCollected ? '已收藏' : '收藏'}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <Share2 className="h-5 w-5" />
          <span>分享</span>
        </button>
      </div>
      <button className="text-sm text-muted-foreground transition-colors hover:text-destructive">
        <Flag className="h-5 w-5" />
      </button>
    </div>
  );
}
