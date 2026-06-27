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
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1.5 md:gap-2 text-xs md:text-sm transition-colors min-h-[36px]',
            isLiked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500',
          )}
        >
          <Heart className={cn('h-4 w-4 md:h-5 md:w-5', isLiked && 'fill-current')} />
          <span className="hidden sm:inline">{likes} 点赞</span>
          <span className="sm:hidden">{likes}</span>
        </button>
        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">{commentCount} 评论</span>
          <span className="sm:hidden">{commentCount}</span>
        </div>
        <button
          onClick={handleCollect}
          className={cn(
            'flex items-center gap-1.5 md:gap-2 text-xs md:text-sm transition-colors min-h-[36px]',
            isCollected ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500',
          )}
        >
          <Bookmark className={cn('h-4 w-4 md:h-5 md:w-5', isCollected && 'fill-current')} />
          <span className="hidden sm:inline">{isCollected ? '已收藏' : '收藏'}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground transition-colors hover:text-primary min-h-[36px]"
        >
          <Share2 className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline">分享</span>
        </button>
      </div>
      <button className="text-sm text-muted-foreground transition-colors hover:text-destructive min-h-[36px] min-w-[36px] flex items-center justify-center">
        <Flag className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}
