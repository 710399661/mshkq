'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Eye, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { Tag } from '../tag';
import { Badge } from '../badge';

export interface PostCardProps {
  id: string;
  title: string;
  excerpt?: string;
  cover?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
  };
  tags?: { id: string; name: string; color?: string }[];
  stats: {
    views: number;
    replies: number;
    likes: number;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
  isEssence?: boolean;
  isSticky?: boolean;
  createdAt: string;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onMore?: (id: string) => void;
  className?: string;
}

function PostCard({
  id,
  title,
  excerpt,
  cover,
  author,
  category,
  tags = [],
  stats,
  isLiked,
  isBookmarked,
  isEssence,
  isSticky,
  createdAt,
  onLike,
  onBookmark,
  onMore,
  className,
}: PostCardProps) {
  return (
    <article
      className={cn(
        'group rounded-lg border bg-card p-4 transition-colors hover:bg-accent/30',
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {isSticky && (
              <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                置顶
              </Badge>
            )}
            {isEssence && (
              <Badge variant="success" className="text-[10px] px-1.5 py-0">
                精华
              </Badge>
            )}
            {category && (
              <Link
                href={`/category/${category.id}`}
                className="text-xs text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {category.name}
              </Link>
            )}
            <span className="text-xs text-muted-foreground">{createdAt}</span>
          </div>

          <Link href={`/thread/${id}`} className="block">
            <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>

          {excerpt && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          )}

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag.id} variant="blue" className="text-[11px]">
                  {tag.name}
                </Tag>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/user/${author.id}`}
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={author.avatar} alt={author.username} />
                <AvatarFallback>{author.username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground hover:text-foreground">
                {author.username}
              </span>
            </Link>

            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1 text-xs">
                <Eye className="h-3.5 w-3.5" />
                {stats.views}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <MessageCircle className="h-3.5 w-3.5" />
                {stats.replies}
              </span>
              <button
                className={cn(
                  'flex items-center gap-1 text-xs transition-colors hover:text-primary',
                  isLiked && 'text-rose-500',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike?.(id);
                }}
              >
                <Heart className={cn('h-3.5 w-3.5', isLiked && 'fill-current')} />
                {stats.likes}
              </button>
              <button
                className={cn(
                  'flex items-center gap-1 text-xs transition-colors hover:text-primary',
                  isBookmarked && 'text-amber-500',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark?.(id);
                }}
              >
                <Bookmark className={cn('h-3.5 w-3.5', isBookmarked && 'fill-current')} />
              </button>
              <button
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onMore?.(id);
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {cover && (
          <Link
            href={`/thread/${id}`}
            className="shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-20 w-28 overflow-hidden rounded-md bg-muted">
              <img
                src={cover}
                alt={title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}

export { PostCard };
