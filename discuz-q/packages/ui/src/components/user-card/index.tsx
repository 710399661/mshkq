'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { Button } from '../button';
import { Badge } from '../badge';

export interface UserCardProps {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing?: boolean;
  showFollowButton?: boolean;
  onFollow?: (id: string) => void;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

function UserCard({
  id,
  username,
  avatar,
  bio,
  stats,
  isFollowing,
  showFollowButton = true,
  onFollow,
  variant = 'horizontal',
  className,
}: UserCardProps) {
  if (variant === 'vertical') {
    return (
      <div
        className={cn(
          'flex flex-col items-center rounded-lg border bg-card p-4 text-center',
          className,
        )}
      >
        <Link href={`/user/${id}`}>
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback className="text-lg">{username[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <Link href={`/user/${id}`} className="mt-3 font-medium hover:text-primary">
          {username}
        </Link>
        {bio && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{bio}</p>}
        <div className="mt-3 flex w-full items-center justify-around border-t pt-3">
          <div>
            <div className="text-sm font-semibold">{stats.posts}</div>
            <div className="text-xs text-muted-foreground">帖子</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">粉丝</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{stats.following}</div>
            <div className="text-xs text-muted-foreground">关注</div>
          </div>
        </div>
        {showFollowButton && (
          <Button
            size="sm"
            variant={isFollowing ? 'outline' : 'default'}
            className="mt-3 w-full"
            onClick={() => onFollow?.(id)}
          >
            {isFollowing ? '已关注' : '关注'}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3 rounded-lg border bg-card p-3', className)}>
      <Link href={`/user/${id}`}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/user/${id}`} className="font-medium hover:text-primary">
          {username}
        </Link>
        {bio && <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{bio}</p>}
        <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
          <span>{stats.posts} 帖子</span>
          <span>{stats.followers} 粉丝</span>
        </div>
      </div>
      {showFollowButton && (
        <Button
          size="sm"
          variant={isFollowing ? 'outline' : 'default'}
          onClick={() => onFollow?.(id)}
        >
          {isFollowing ? '已关注' : '关注'}
        </Button>
      )}
    </div>
  );
}

export { UserCard };
