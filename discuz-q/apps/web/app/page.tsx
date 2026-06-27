import Link from 'next/link';
import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { PostCard } from '@discuzq/ui/post-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { Tag } from '@discuzq/ui/tag';
import { UserCard } from '@discuzq/ui/user-card';
import { buildMetadata } from '@discuzq/seo/metadata';
import { createServerApi } from '@/lib/api';
import type { Thread, Tag as TagType, User, Category } from '@discuzq/sdk/server';

export const metadata = buildMetadata({
  title: '首页',
  description: 'Discuz! Q 新一代社区系统首页，发现优质内容，交流思想',
  type: 'website',
});

async function getThreads(page = 1, perPage = 15, sort = '-created_at') {
  try {
    const api = createServerApi();
    const result = await api.threads.list({ page, per_page: perPage, sort });
    return result.data || [];
  } catch (e) {
    console.error('Failed to fetch threads:', e);
    return [];
  }
}

async function getHotThreads(perPage = 10) {
  try {
    const api = createServerApi();
    const result = await api.threads.list({ page: 1, per_page: perPage, sort: '-view_count' });
    return result.data || [];
  } catch (e) {
    return [];
  }
}

async function getEssenceThreads(perPage = 10) {
  try {
    const api = createServerApi();
    const result = await api.threads.list({ page: 1, per_page: perPage, is_essence: true, sort: '-created_at' });
    return result.data || [];
  } catch (e) {
    return [];
  }
}

async function getHotTags(limit = 15) {
  try {
    const api = createServerApi();
    const result = await api.tags.list({ page: 1, per_page: limit, sort: '-thread_count' });
    return result.data || [];
  } catch (e) {
    return [];
  }
}

async function getCategories() {
  try {
    const api = createServerApi();
    return await api.categories.list();
  } catch (e) {
    return [];
  }
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

export default async function HomePage() {
  const [latestThreads, hotThreads, essenceThreads, hotTags, categories] = await Promise.all([
    getThreads(1, 15, '-created_at'),
    getHotThreads(10),
    getEssenceThreads(10),
    getHotTags(15),
    getCategories(),
  ]);

  const trendingThreads = [...latestThreads].sort((a, b) => b.view_count - a.view_count);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Tabs defaultValue="latest">
          <TabsList className="mb-4 w-full justify-start bg-transparent p-0">
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
            <TabsTrigger value="trending" className="data-[state=active]:bg-card">
              <TrendingUp className="mr-1.5 h-4 w-4" />
              飙升
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-0 space-y-4">
            {latestThreads.map((thread) => (
              <PostCard key={thread.id} {...mapThreadToCard(thread)} />
            ))}
            {latestThreads.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                暂无帖子
              </div>
            )}
          </TabsContent>

          <TabsContent value="hot" className="mt-0 space-y-4">
            {hotThreads.map((thread) => (
              <PostCard key={thread.id} {...mapThreadToCard(thread)} />
            ))}
            {hotThreads.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                暂无热门帖子
              </div>
            )}
          </TabsContent>

          <TabsContent value="essence" className="mt-0 space-y-4">
            {essenceThreads.map((thread) => (
              <PostCard key={thread.id} {...mapThreadToCard(thread)} />
            ))}
            {essenceThreads.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                暂无精华帖子
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="mt-0 space-y-4">
            {trendingThreads.map((thread) => (
              <PostCard key={thread.id} {...mapThreadToCard(thread)} />
            ))}
            {trendingThreads.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                暂无数据
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">热门话题</h3>
          <div className="flex flex-wrap gap-2">
            {hotTags.map((tag: TagType) => (
              <Link key={tag.id} href={`/tag/${tag.id}`}>
                <Tag variant="blue">{tag.name}</Tag>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">板块分类</h3>
          <div className="space-y-2">
            {categories.map((cat: Category) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.thread_count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-gradient-to-br from-primary/10 to-blue-500/10 p-4">
          <h3 className="text-base font-semibold text-foreground">加入我们</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            注册账号，发布你的第一篇帖子，与志同道合的朋友一起交流。
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/register" className="flex-1">
              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                立即注册
              </button>
            </Link>
            <Link href="/login" className="flex-1">
              <button className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                登录
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
