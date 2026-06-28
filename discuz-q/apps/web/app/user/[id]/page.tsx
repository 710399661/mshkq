import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileText, MessageSquare, Bookmark, Users, UserPlus, Heart, Calendar, Shield } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { PostCard } from '@discuzq/ui/post-card';
import { Badge } from '@discuzq/ui/badge';
import { RichText } from '@discuzq/ui/rich-text';
import { buildUserMetadata } from '@discuzq/seo/metadata';
import { formatSmartDate } from '@discuzq/utils/date';
import { formatCompactNumber } from '@discuzq/utils/format';
import { createServerApi } from '@/lib/api';
import { UserProfileActions } from '@/components/user-profile-actions';
import type { User, Thread, Post } from '@discuzq/sdk/server';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

async function getUserData(id: string) {
  try {
    const api = createServerApi();
    const user = await api.users.getById(id);
    const [threadsRes, postsRes, collectionsRes] = await Promise.all([
      api.users.threads(id, { page: 1, per_page: 15 }),
      api.users.posts(id, { page: 1, per_page: 15 }),
      api.users.collections(id, { page: 1, per_page: 15 }).catch(() => ({ data: [] })),
    ]);
    return {
      user,
      threads: threadsRes.data || [],
      posts: postsRes.data || [],
      collections: (collectionsRes as any).data || [],
    };
  } catch (e) {
    console.error('Failed to fetch user:', e);
    return { user: null, threads: [], posts: [], collections: [] };
  }
}

export async function generateMetadata({ params }: UserPageProps) {
  const { id } = await params;
  const { user } = await getUserData(id);
  if (!user) return { title: '用户不存在' };

  return buildUserMetadata({
    username: user.username,
    bio: user.bio || user.signature || undefined,
    avatar: user.avatar || undefined,
    url: `/user/${user.id}`,
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

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const { user, threads, posts, collections } = await getUserData(id);

  if (!user) notFound();

  const isAdmin = user.roles?.some((r: any) => r.name === 'super_admin' || r.name === 'admin') || user.status === 1;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-lg border bg-card p-4 md:p-6">
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-start">
          <Avatar className="h-16 w-16 md:h-24 md:w-24 border-2 border-primary/20">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-lg md:text-2xl">{user.username[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <h1 className="text-xl md:text-2xl font-bold">{user.username}</h1>
              {isAdmin && (
                <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Shield className="mr-1 h-3 w-3" />
                  管理员
                </Badge>
              )}
            </div>

            {(user.bio || user.signature) && (
              <p className="mt-2 text-sm text-muted-foreground">
                {user.bio || user.signature}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                加入于 {formatSmartDate(user.created_at)}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-lg md:text-xl font-semibold text-foreground">
                  {formatCompactNumber(user.thread_count)}
                </div>
                <div className="text-xs text-muted-foreground">帖子</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-semibold text-foreground">
                  {formatCompactNumber(user.fans_count)}
                </div>
                <div className="text-xs text-muted-foreground">粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-semibold text-foreground">
                  {formatCompactNumber(user.follow_count)}
                </div>
                <div className="text-xs text-muted-foreground">关注</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-semibold text-foreground">
                  {formatCompactNumber(user.like_count)}
                </div>
                <div className="text-xs text-muted-foreground">获赞</div>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <UserProfileActions userId={String(user.id)} isOwnProfile={false} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="threads">
        <TabsList className="w-full justify-start bg-transparent p-0 overflow-x-auto flex-nowrap">
          <TabsTrigger value="threads" className="data-[state=active]:bg-card shrink-0">
            <FileText className="mr-1.5 h-4 w-4" />
            帖子
          </TabsTrigger>
          <TabsTrigger value="replies" className="data-[state=active]:bg-card shrink-0">
            <MessageSquare className="mr-1.5 h-4 w-4" />
            回复
          </TabsTrigger>
          <TabsTrigger value="collections" className="data-[state=active]:bg-card shrink-0">
            <Bookmark className="mr-1.5 h-4 w-4" />
            收藏
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threads" className="mt-4 space-y-3 md:space-y-4">
          {threads.map((thread: Thread) => (
            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
          ))}
          {threads.length === 0 && (
            <div className="rounded-lg border bg-card p-6 md:p-8 text-center text-muted-foreground">
              暂无帖子
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies" className="mt-4 space-y-3 md:space-y-4">
          {posts.map((post: Post) => (
            <div key={post.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  回复于 {formatSmartDate(post.created_at)}
                </div>
              </div>
              <div className="mt-2 line-clamp-3 text-sm">
                <RichText content={post.content_html || post.content} />
              </div>
              {post.thread_id && (
                <div className="mt-3">
                  <Link
                    href={`/thread/${post.thread_id}`}
                    className="text-sm text-primary hover:underline min-h-[32px] inline-flex items-center"
                  >
                    查看原帖 →
                  </Link>
                </div>
              )}
            </div>
          ))}
          {posts.length === 0 && (
            <div className="rounded-lg border bg-card p-6 md:p-8 text-center text-muted-foreground">
              暂无回复
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections" className="mt-4 space-y-3 md:space-y-4">
          {collections.map((thread: Thread) => (
            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
          ))}
          {collections.length === 0 && (
            <div className="rounded-lg border bg-card p-6 md:p-8 text-center text-muted-foreground">
              暂无收藏
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
