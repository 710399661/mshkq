import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Eye,
  ChevronLeft,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Button } from '@discuzq/ui/button';
import { Tag } from '@discuzq/ui/tag';
import { Badge } from '@discuzq/ui/badge';
import { RichText } from '@discuzq/ui/rich-text';
import { buildThreadMetadata } from '@discuzq/seo/metadata';
import { articleJsonLd } from '@discuzq/seo/jsonld';
import { formatSmartDate } from '@discuzq/utils/date';
import { formatCompactNumber } from '@discuzq/utils/format';
import { createServerApi } from '@/lib/api';
import { ThreadDetailActions } from '@/components/thread-detail-actions';
import { CommentSection } from '@/components/comment-section';
import type { Thread, Post, User as UserType, Category } from '@discuzq/sdk/server';

interface ThreadPageProps {
  params: Promise<{ id: string }>;
}

async function getThreadData(id: string) {
  try {
    const api = createServerApi();
    const thread = await api.threads.getById(id);
    const posts = await api.posts.list(id, { page: 1, per_page: 20 });
    return { thread, posts: posts.data || [] };
  } catch (e) {
    console.error('Failed to fetch thread:', e);
    return { thread: null, posts: [] };
  }
}

export async function generateMetadata({ params }: ThreadPageProps) {
  const { id } = await params;
  const { thread } = await getThreadData(id);
  if (!thread) return { title: '帖子不存在' };

  return buildThreadMetadata({
    title: thread.title,
    excerpt: thread.summary,
    cover: thread.cover_image || undefined,
    url: `/thread/${thread.id}`,
    author: thread.user?.username || '匿名',
    createdAt: thread.created_at,
    tags: (thread.tags || []).map((t) => t.name),
  });
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { id } = await params;
  const { thread, posts } = await getThreadData(id);

  if (!thread) notFound();

  const firstPost = posts.find((p) => p.is_first);
  const content = firstPost?.content_html || firstPost?.content || thread.summary || '';
  const author = thread.user;
  const category = thread.category;
  const tags = thread.tags || [];

  const jsonLd = articleJsonLd({
    headline: thread.title,
    description: thread.summary,
    image: thread.cover_image ? [thread.cover_image] : undefined,
    authorName: author?.username || '匿名',
    authorUrl: `/user/${author?.id || 0}`,
    publisherName: 'Discuz! Q',
    datePublished: thread.created_at,
    dateModified: thread.updated_at,
    url: `/thread/${thread.id}`,
    keywords: tags.map((t) => t.name),
    articleSection: category?.name,
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回列表
        </Link>

        <article className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              {thread.is_sticky && (
                <Badge variant="warning" className="text-xs">
                  置顶
                </Badge>
              )}
              {thread.is_essence && (
                <Badge variant="success" className="text-xs">
                  精华
                </Badge>
              )}
              {category && (
                <Link
                  href={`/category/${category.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  {category.name}
                </Link>
              )}
            </div>

            <h1 className="text-2xl font-bold">{thread.title}</h1>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href={`/user/${author?.id || 0}`}>
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={author?.avatar || ''} alt={author?.username || ''} />
                    <AvatarFallback>{(author?.username || 'U')[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    href={`/user/${author?.id || 0}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {author?.username || '匿名用户'}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    发布于 {formatSmartDate(thread.created_at)}
                    <span className="mx-2">·</span>
                    <Eye className="inline h-3.5 w-3.5" />
                    {formatCompactNumber(thread.view_count)} 浏览
                  </div>
                </div>
              </div>

              <Button size="sm">关注</Button>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="border-b px-6 py-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag.id} href={`/tag/${tag.id}`}>
                    <Tag variant="blue">{tag.name}</Tag>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-6">
            <RichText content={content} />
          </div>

          <div className="border-t p-4">
            <ThreadDetailActions
              threadId={String(thread.id)}
              likeCount={thread.like_count}
              commentCount={thread.post_count}
            />
          </div>
        </article>

        <div className="mt-6">
          <CommentSection
            threadId={String(thread.id)}
            initialPosts={posts}
            totalCount={thread.post_count}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">作者</h3>
          <Link
            href={`/user/${author?.id || 0}`}
            className="flex items-center gap-3"
          >
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={author?.avatar || ''} alt={author?.username || ''} />
              <AvatarFallback>{(author?.username || 'U')[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author?.username || '匿名用户'}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {author?.bio || ''}
              </p>
            </div>
          </Link>
          <Button size="sm" className="mt-3 w-full">
            + 关注
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">相关推荐</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/thread/${i}`} className="block group">
                <p className="line-clamp-2 text-sm group-hover:text-primary">
                  相关推荐帖子 {i}：更多社区系统架构设计
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i * 1234} 浏览 · {i * 56} 评论
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
