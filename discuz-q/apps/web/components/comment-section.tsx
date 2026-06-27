'use client';

import { useState, useMemo } from 'react';
import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Send, Loader2, ThumbsUp, Reply, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Textarea } from '@discuzq/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { cn } from '@discuzq/ui';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';
import { formatSmartDate } from '@discuzq/utils/date';
import type { Post } from '@discuzq/sdk/server';

interface CommentItemData {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replyCount: number;
  replies: CommentReplyData[];
  replyUser?: string;
}

interface CommentReplyData {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  replyTo?: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  threadId: string;
  initialPosts: Post[];
  totalCount: number;
}

function mapPostToComment(post: Post): CommentItemData {
  return {
    id: String(post.id),
    content: post.content_html || post.content,
    author: {
      id: String(post.user?.id || post.user_id),
      username: post.user?.username || '匿名用户',
      avatar: post.user?.avatar || '',
    },
    createdAt: post.created_at,
    likes: post.like_count,
    isLiked: false,
    replyCount: post.reply_count || 0,
    replies: (post.replies || []).map((r) => ({
      id: String(r.id),
      content: r.content_html || r.content,
      author: {
        id: String(r.user?.id || r.user_id),
        username: r.user?.username || '匿名用户',
        avatar: r.user?.avatar || '',
      },
      replyTo: r.replyUser?.username,
      createdAt: r.created_at,
      likes: r.like_count,
      isLiked: false,
    })),
  };
}

export function CommentSection({ threadId, initialPosts, totalCount }: CommentSectionProps) {
  const { token, userInfo } = useAuthStore();
  const isAuthenticated = !!token;
  const user = userInfo;
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<{
    commentId: string;
    replyPostId?: string;
    username: string;
  } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', threadId],
    queryFn: async ({ pageParam = 1 }) => {
      const api = getClientApi();
      const result = await api.posts.list(threadId, {
        page: pageParam,
        per_page: 20,
      });
      return {
        posts: result.data || [],
        meta: result.meta,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1;
      }
      return undefined;
    },
    initialData: {
      pages: [
        {
          posts: initialPosts,
          meta: {
            current_page: 1,
            per_page: 20,
            total: totalCount,
            last_page: Math.ceil(totalCount / 20),
          },
        },
      ],
      pageParams: [1],
    },
  });

  const comments = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.posts.filter((p) => !p.is_first).map(mapPostToComment),
    );
  }, [data]);

  const createCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const api = getClientApi();
      return await api.posts.create({
        thread_id: Number(threadId),
        content,
      });
    },
    onSuccess: () => {
      setCommentText('');
      toast({
        title: '评论成功',
        description: '你的评论已发布',
      });
      queryClient.invalidateQueries({ queryKey: ['comments', threadId] });
      queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
    },
    onError: (error: { message?: string }) => {
      toast({
        title: '评论失败',
        description: error?.message || '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const createReplyMutation = useMutation({
    mutationFn: async ({
      content,
      parentId,
      replyPostId,
      replyUserId,
    }: {
      content: string;
      parentId: number;
      replyPostId?: number;
      replyUserId?: number;
    }) => {
      const api = getClientApi();
      return await api.posts.create({
        thread_id: Number(threadId),
        content,
        parent_id: parentId,
        reply_post_id: replyPostId,
        reply_user_id: replyUserId,
      });
    },
    onSuccess: () => {
      setReplyText('');
      setReplyTo(null);
      toast({
        title: '回复成功',
        description: '你的回复已发布',
      });
      queryClient.invalidateQueries({ queryKey: ['comments', threadId] });
      queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
    },
    onError: (error: { message?: string }) => {
      toast({
        title: '回复失败',
        description: error?.message || '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async (postId: string) => {
      const api = getClientApi();
      return await api.posts.like(postId);
    },
    onMutate: async (postId) => {
      queryClient.setQueryData(['comments', threadId], (old: unknown) => {
        const oldData = old as { pages: { posts: Post[] }[] };
        if (!oldData) return old;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => {
              if (String(post.id) === postId) {
                return {
                  ...post,
                  like_count: post.like_count + 1,
                };
              }
              if (post.replies) {
                return {
                  ...post,
                  replies: post.replies.map((r) =>
                    String(r.id) === postId
                      ? { ...r, like_count: r.like_count + 1 }
                      : r,
                  ),
                };
              }
              return post;
            }),
          })),
        };
      });
    },
    onError: (_, postId) => {
      queryClient.setQueryData(['comments', threadId], (old: unknown) => {
        const oldData = old as { pages: { posts: Post[] }[] };
        if (!oldData) return old;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => {
              if (String(post.id) === postId) {
                return {
                  ...post,
                  like_count: Math.max(0, post.like_count - 1),
                };
              }
              if (post.replies) {
                return {
                  ...post,
                  replies: post.replies.map((r) =>
                    String(r.id) === postId
                      ? { ...r, like_count: Math.max(0, r.like_count - 1) }
                      : r,
                  ),
                };
              }
              return post;
            }),
          })),
        };
      });
      toast({
        title: '操作失败',
        description: '点赞失败，请稍后重试',
        variant: 'destructive',
      });
    },
  });

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能发表评论',
        variant: 'destructive',
      });
      return;
    }
    if (!commentText.trim()) return;
    createCommentMutation.mutate(commentText.trim());
  };

  const handleSubmitReply = () => {
    if (!replyTo) return;
    if (!replyText.trim()) return;

    createReplyMutation.mutate({
      content: replyText.trim(),
      parentId: Number(replyTo.commentId),
      replyPostId: replyTo.replyPostId ? Number(replyTo.replyPostId) : undefined,
    });
  };

  const handleLike = (postId: string) => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能点赞',
        variant: 'destructive',
      });
      return;
    }
    likeCommentMutation.mutate(postId);
  };

  const handleReply = (
    commentId: string,
    replyPostId?: string,
    username?: string,
  ) => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '登录后才能回复',
        variant: 'destructive',
      });
      return;
    }
    setReplyTo({
      commentId,
      replyPostId,
      username: username || '',
    });
    setReplyText('');
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  return (
    <div className="rounded-lg border bg-card p-4 md:p-6">
      <h2 className="mb-3 md:mb-4 text-base md:text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
        全部评论 <span className="text-sm font-normal text-muted-foreground">({totalCount})</span>
      </h2>

      <div className="mb-4 md:mb-6">
        {isAuthenticated ? (
          <div className="flex gap-2 md:gap-3">
            <Avatar className="h-8 w-8 md:h-9 md:w-9 shrink-0">
              <AvatarImage src={user?.avatar || ''} alt={user?.username || ''} />
              <AvatarFallback className="text-xs">
                {(user?.username || 'U')[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="发表你的评论..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[60px] md:min-h-[80px] resize-y text-sm"
              />
              <div className="mt-2 flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim() || createCommentMutation.isPending}
                  size="sm"
                  className="min-h-[36px]"
                >
                  {createCommentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      发布中...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      发表评论
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed p-4 md:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                登录
              </Link>
              {' '}后发表评论
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 md:space-y-5">
        {comments.length === 0 && (
          <div className="py-6 md:py-8 text-center text-sm text-muted-foreground">
            暂无评论，快来抢沙发吧
          </div>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2 md:gap-3">
            <Link href={`/user/${comment.author.id}`} className="shrink-0">
              <Avatar className="h-8 w-8 md:h-9 md:w-9">
                <AvatarImage
                  src={comment.author.avatar}
                  alt={comment.author.username}
                />
                <AvatarFallback className="text-xs">
                  {comment.author.username[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/user/${comment.author.id}`}
                  className="text-sm font-medium hover:text-primary"
                >
                  {comment.author.username}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {formatSmartDate(comment.createdAt)}
                </span>
              </div>
              <div className="mt-1 text-sm text-foreground break-words whitespace-pre-wrap">
                {comment.content}
              </div>
              <div className="mt-2 flex items-center gap-3 md:gap-4 text-muted-foreground">
                <button
                  className={cn(
                    'flex items-center gap-1 text-xs transition-colors hover:text-primary min-h-[32px]',
                  )}
                  onClick={() => handleLike(comment.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {comment.likes > 0 && <span>{comment.likes}</span>}
                  {comment.likes === 0 && <span>点赞</span>}
                </button>
                <button
                  className="flex items-center gap-1 text-xs transition-colors hover:text-primary min-h-[32px]"
                  onClick={() => handleReply(comment.id, undefined, comment.author.username)}
                >
                  <Reply className="h-3.5 w-3.5" />
                  <span>回复</span>
                </button>
              </div>

              {replyTo?.commentId === comment.id && !replyTo.replyPostId && (
                <div className="mt-3 ml-2 border-l-2 border-muted pl-3">
                  <div className="text-xs text-muted-foreground mb-2">
                    回复 @{replyTo.username}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder={`回复 @${replyTo.username}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[60px] text-sm"
                      autoFocus
                    />
                  </div>
                  <div className="mt-2 flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyTo(null);
                        setReplyText('');
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim() || createReplyMutation.isPending}
                    >
                      {createReplyMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        '回复'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline min-h-[28px]"
                  >
                    {expandedReplies.has(comment.id) ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                    {comment.replyCount} 条回复
                  </button>

                  {expandedReplies.has(comment.id) && (
                    <div className="mt-3 space-y-3 md:space-y-4 ml-2 border-l-2 border-muted pl-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <Link
                            href={`/user/${reply.author.id}`}
                            className="shrink-0"
                          >
                            <Avatar className="h-6 w-6 md:h-7 md:w-7">
                              <AvatarImage
                                src={reply.author.avatar}
                                alt={reply.author.username}
                              />
                              <AvatarFallback className="text-[10px]">
                                {reply.author.username[0]}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link
                                href={`/user/${reply.author.id}`}
                                className="text-xs font-medium hover:text-primary"
                              >
                                {reply.author.username}
                              </Link>
                              {reply.replyTo && (
                                <>
                                  <span className="text-xs text-muted-foreground">
                                    回复
                                  </span>
                                  <Link
                                    href={`/user/${reply.replyTo}`}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    @{reply.replyTo}
                                  </Link>
                                </>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatSmartDate(reply.createdAt)}
                              </span>
                            </div>
                            <div className="mt-0.5 text-xs text-foreground break-words whitespace-pre-wrap">
                              {reply.content}
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-muted-foreground">
                              <button
                                className="flex items-center gap-1 text-[11px] transition-colors hover:text-primary min-h-[28px]"
                                onClick={() => handleLike(reply.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                {reply.likes > 0 && <span>{reply.likes}</span>}
                              </button>
                              <button
                                className="flex items-center gap-1 text-[11px] transition-colors hover:text-primary min-h-[28px]"
                                onClick={() =>
                                  handleReply(
                                    comment.id,
                                    reply.id,
                                    reply.author.username,
                                  )
                                }
                              >
                                <Reply className="h-3 w-3" />
                                <span>回复</span>
                              </button>
                            </div>

                            {replyTo?.replyPostId === reply.id && (
                              <div className="mt-2">
                                <div className="text-[11px] text-muted-foreground mb-1">
                                  回复 @{replyTo.username}
                                </div>
                                <div className="flex gap-2">
                                  <Textarea
                                    placeholder={`回复 @${replyTo.username}...`}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="min-h-[50px] text-xs"
                                    autoFocus
                                  />
                                </div>
                                <div className="mt-1 flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => {
                                      setReplyTo(null);
                                      setReplyText('');
                                    }}
                                  >
                                    取消
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={handleSubmitReply}
                                    disabled={
                                      !replyText.trim() ||
                                      createReplyMutation.isPending
                                    }
                                  >
                                    {createReplyMutation.isPending ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : (
                                      '回复'
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-4 md:mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="min-h-[40px]"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                加载中...
              </>
            ) : (
              '加载更多评论'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
