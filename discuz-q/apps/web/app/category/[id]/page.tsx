import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Flame, Clock, Award, FileText, Folder } from 'lucide-react';
import { PostCard } from '@discuzq/ui/post-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { Badge } from '@discuzq/ui/badge';
import { buildMetadata } from '@discuzq/seo/metadata';
import { formatCompactNumber } from '@discuzq/utils/format';
import { createServerApi } from '@/lib/api';
import type { Category, Thread } from '@discuzq/sdk/server';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

async function getCategoryData(id: string) {
  try {
    const api = createServerApi();
    const category = await api.categories.getById(id);
    const [latestRes, hotRes, essenceRes] = await Promise.all([
      api.categories.threads(id, { page: 1, per_page: 15, sort: '-created_at' }),
      api.categories.threads(id, { page: 1, per_page: 15, sort: '-view_count' }),
      api.categories.threads(id, { page: 1, per_page: 15, is_essence: true, sort: '-created_at' }).catch(() => ({ data: [] })),
    ]);
    return {
      category,
      latestThreads: latestRes.data || [],
      hotThreads: hotRes.data || [],
      essenceThreads: (essenceRes as any).data || [],
    };
  } catch (e) {
    console.error('Failed to fetch category:', e);
    return { category: null, latestThreads: [], hotThreads: [], essenceThreads: [] };
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const { category } = await getCategoryData(id);
  if (!category) return { title: '分类不存在' };

  return buildMetadata({
    title: category.name,
    description: category.description || `${category.name} 分类下的帖子`,
    type: 'website',
    url: `/category/${category.id}`,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const { category, latestThreads, hotThreads, essenceThreads } = await getCategoryData(id);

  if (!category) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/categories"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        返回分类列表
      </Link>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {category.icon ? (
              <img
                src={category.icon}
                alt={category.name}
                className="h-8 w-8"
              />
            ) : (
              <Folder className="h-7 w-7" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-4">
              <Badge variant="secondary">
                <FileText className="mr-1 h-3 w-3" />
                {formatCompactNumber(category.thread_count)} 帖子
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
