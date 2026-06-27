'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Settings, UserPlus, UserMinus } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';

interface UserProfileActionsProps {
  userId: string;
  isOwnProfile: boolean;
  initialIsFollowing?: boolean;
}

export function UserProfileActions({
  userId,
  isOwnProfile,
  initialIsFollowing = false,
}: UserProfileActionsProps) {
  const { token } = useAuthStore();
  const isAuthenticated = !!token;
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const followMutation = useMutation({
    mutationFn: async () => {
      const api = getClientApi();
      return await api.users.follow(userId);
    },
    onMutate: async () => {
      const prev = isFollowing;
      setIsFollowing(!prev);
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        setIsFollowing(context.prev);
      }
      toast({
        title: '操作失败',
        description: isFollowing ? '取消关注失败，请稍后重试' : '关注失败，请稍后重试',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      setIsFollowing(data.is_following);
      toast({
        title: data.is_following ? '关注成功' : '已取消关注',
      });
    },
  });

  const handleFollow = () => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能关注用户',
        variant: 'destructive',
      });
      return;
    }
    followMutation.mutate();
  };

  const handleEditProfile = () => {
    window.location.href = '/settings/profile';
  };

  if (isOwnProfile) {
    return (
      <Button onClick={handleEditProfile}>
        <Settings className="mr-1.5 h-4 w-4" />
        编辑资料
      </Button>
    );
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={followMutation.isPending}
      variant={isFollowing ? 'outline' : 'default'}
    >
      {isFollowing ? (
        <>
          <UserMinus className="mr-1.5 h-4 w-4" />
          已关注
        </>
      ) : (
        <>
          <UserPlus className="mr-1.5 h-4 w-4" />
          关注
        </>
      )}
    </Button>
  );
}
