'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart, MessageSquare, MoreHorizontal, Reply, ThumbsUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { Button } from '../button';

export interface CommentProps {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replyCount?: number;
  isReply?: boolean;
  replyTo?: string;
  onLike?: (id: string) => void;
  onReply?: (id: string) => void;
  onMore?: (id: string) => void;
  className?: string;
}

function Comment({
  id,
  content,
  author,
  createdAt,
  likes,
  isLiked,
  replyCount,
  isReply,
  replyTo,
  onLike,
  onReply,
  onMore,
  className,
}: CommentProps) {
  return (
    <div className={cn('flex gap-3', isReply && 'ml-10', className)}>
      <Link href={`/user/${author.id}`} className="shrink-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={author.avatar} alt={author.username} />
          <AvatarFallback className="text-xs">{author.username[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/user/${author.id}`}
            className="text-sm font-medium hover:text-primary"
          >
            {author.username}
          </Link>
          {replyTo && (
            <>
              <span className="text-xs text-muted-foreground">回复</span>
              <Link href={`/user/${replyTo}`} className="text-sm text-primary hover:underline">
                @{replyTo}
              </Link>
            </>
          )}
          <span className="text-xs text-muted-foreground">{createdAt}</span>
        </div>
        <div className="mt-1 text-sm text-foreground break-words whitespace-pre-wrap">
          {content}
        </div>
        <div className="mt-2 flex items-center gap-4 text-muted-foreground">
          <button
            className={cn(
              'flex items-center gap-1 text-xs transition-colors hover:text-primary',
              isLiked && 'text-rose-500',
            )}
            onClick={() => onLike?.(id)}
          >
            <ThumbsUp className={cn('h-3.5 w-3.5', isLiked && 'fill-current')} />
            {likes > 0 && <span>{likes}</span>}
          </button>
          <button
            className="flex items-center gap-1 text-xs transition-colors hover:text-primary"
            onClick={() => onReply?.(id)}
          >
            <Reply className="h-3.5 w-3.5" />
            {replyCount !== undefined && replyCount > 0 && <span>{replyCount}</span>}
            {replyCount === undefined && <span>回复</span>}
          </button>
          <button
            className="ml-auto opacity-0 hover:opacity-100 transition-opacity"
            onClick={() => onMore?.(id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export interface CommentListProps {
  comments: CommentProps[];
  onReply?: (id: string) => void;
  onLike?: (id: string) => void;
  className?: string;
}

function CommentList({ comments, onReply, onLike, className }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className={cn('py-8 text-center text-sm text-muted-foreground', className)}>
        暂无评论，快来抢沙发吧
      </div>
    );
  }

  return (
    <div className={cn('space-y-5', className)}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          onLike={onLike}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export { Comment, CommentList };
