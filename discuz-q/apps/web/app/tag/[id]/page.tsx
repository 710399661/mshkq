import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Flame, Clock, Award, Hash, FileText } from 'lucide-react';
import { PostCard } from '@discuzq/ui/post-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { Badge } from '@discuzq/ui/badge';
import { buildMetadata } from '@discuzq/seo/metadata';
import { formatCompactNumber } from '@discuzq/utils/format';
import { createServerApi } from '@/lib/api';
import type { Tag, Thread } from '@discuzq/sdk/server';

interface TagPageProps {
  params: Promise<{ id: string }>;
}

async function getTagData(id: string) {
  try {
    const api = createServerApi();
    const tag = await api.tags.getById(id);
    const [latestRes, hotRes, essenceRes] = await Promise.all([
      api.tags.threads(id, { page: 1, per_page: 15, sort: '-created_at' }),
      api.tags.threads(id, { page: 1, per_page: 15, sort: '-view_count' }),
      api.tags.threads(id, { page: 1, per_page: 15, is_essence: true, sort: '-created_at' }).catch(() => ({ data: [] })),
    ]);
    return {
      tag,
      latestThreads: latestRes.data || [],
      hotThreads: hotRes.data || [],
      essenceThreads: (essenceRes as any).data || [],
    };
  } catch (e) {
    console.error('Failed to fetch tag:', e);
    return { tag: null, latestThreads: [], hotThreads: [], essenceThreads: [] };
  }
}

export async function generateMetadata({ params }: TagPageProps) {
  const { id } = await params;
  const { tag } = await getTagData(id);
  if (!tag) return { title: '话题不存在' };

  return buildMetadata({
    title: `#${tag.name}`,
    description: tag.description || `浏览 #${tag.name} 话题下的帖子`,
    type: 'website',
    url: `/tag/${tag.id}`,
    keywords: [tag.name],
  });
}

function mapThreadToCard(thread: Thread) {
  return {
    id: String(thread.id),
    title: thread.title,
    excerpt: thread.summary,
    cover: thread.cover_image || undefined,
    author: {
      id: String(thread.user?.id || thread.user_id),
      username: thread.user?.username || '匿名用户',
      avatar: thread.user?.avatar || '',
    },
    category: thread.category
      ? { id: String(thread.category.id), name: thread.category.name }
      : undefined,
    tags: (thread.tags || []).map((t) => ({ id: String(t.id), name: t.name })),
    stats: {
      views: thread.view_count,
      replies: thread.post_count,
      likes: thread.like_count,
    },
    isSticky: thread.is_sticky,
    isEssence: thread.is_essence,
    createdAt: thread.created_at,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { id } = await params;
  const { tag, latestThreads, hotThreads, essenceThreads } = await getTagData(id);

  if (!tag) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/tags"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        返回话题列表
      </Link>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Hash className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">#{tag.name}</h1>
            </div>
            {tag.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {tag.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-4">
              <Badge variant="secondary">
                <FileText className="mr-1 h-3 w-3" />
                {formatCompactNumber(tag.thread_count)} 帖子
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="latest">
        <TabsList className="w-full justify-start bg-transparent p-0">
          <TabsTrigger value="latest" className="data-[state=active]:bg-card">
            <Clock className="mr-1.5 h-4 w-4" />
            最新
          </TabsTrigger>
          <TabsTrigger value="hot" className="data-[state=active]:bg-card">
            <Flame className="mr-1.5 h-4 w-4" />
            热门
          </TabsTrigger>
          <TabsTrigger value="essence" className="data-[state=active]:bg-card">
            <Award className="mr-1.5 h-4 w-4" />
            精华
          </TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="mt-4 space-y-4">
          {latestThreads.map((thread: Thread) => (
            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
          ))}
          {latestThreads.length === 0 && (
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              暂无帖子
            </div>
          )}
        </TabsContent>

        <TabsContent value="hot" className="mt-4 space-y-4">
          {hotThreads.map((thread: Thread) => (
            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
          ))}
          {hotThreads.length === 0 && (
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              暂无热门帖子
            </div>
          )}
        </TabsContent>

        <TabsContent value="essence" className="mt-4 space-y-4">
          {essenceThreads.map((thread: Thread) => (
            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
          ))}
          {essenceThreads.length === 0 && (
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              暂无精华帖子
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
