'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Flame, FileText, User as UserIcon, Hash } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { PostCard } from '@discuzq/ui/post-card';
import { UserCard } from '@discuzq/ui/user-card';
import { Tag } from '@discuzq/ui/tag';
import { Empty } from '@discuzq/ui/empty';
import { Skeleton } from '@discuzq/ui/skeleton';
import { Button } from '@discuzq/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { SearchBar } from '@/components/search-bar';
import { getClientApi } from '@/lib/api';
import type { Thread, User, Tag as TagType, PaginatedResponse } from '@discuzq/sdk/server';
import { cn } from '@discuzq/ui';

type SearchType = 'all' | 'posts' | 'users' | 'tags';

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

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-lg border bg-card p-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function TagsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-full" />
      ))}
    </div>
  );
}

function HotSearches({ onSelect }: { onSelect: (keyword: string) => void }) {
  const hotKeywords = [
    '前端开发',
    'React',
    'Next.js',
    'TypeScript',
    '人工智能',
    '编程教程',
    '求职经验',
    '技术分享',
  ];

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">热门搜索</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {hotKeywords.map((keyword, index) => (
          <button
            key={keyword}
            onClick={() => onSelect(keyword)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-accent transition-colors text-sm"
          >
            <span className={index < 3 ? 'text-orange-500 font-semibold' : 'text-muted-foreground'}>
              {index + 1}
            </span>
            <span>{keyword}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const typeParam = (searchParams.get('type') as SearchType) || 'all';
  const [activeTab, setActiveTab] = useState<SearchType>(typeParam);
  const [searchQuery, setSearchQuery] = useState(q);

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  useEffect(() => {
    setActiveTab(typeParam);
  }, [typeParam]);

  const handleTabChange = useCallback(
    (value: string) => {
      const newType = value as SearchType;
      setActiveTab(newType);
      const params = new URLSearchParams(searchParams.toString());
      params.set('type', newType);
      router.replace(`/search?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('type', activeTab);
      router.push(`/search?${params.toString()}`);
    },
    [router, activeTab],
  );

  const {
    data: postsData,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
    isLoading: isLoadingPosts,
  } = useInfiniteQuery({
    queryKey: ['search', 'posts', searchQuery],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedResponse<Thread>> => {
      if (!searchQuery.trim()) return { data: [], meta: { current_page: 1, per_page: 10, total: 0, last_page: 1 } };
      const api = getClientApi();
      const result = await api.search.posts(searchQuery, {
        page: pageParam as number,
        per_page: 10,
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (meta && meta.current_page < meta.last_page) {
        return meta.current_page + 1;
      }
      return undefined;
    },
    enabled: searchQuery.trim().length > 0 && (activeTab === 'all' || activeTab === 'posts'),
    initialPageParam: 1,
  });

  const {
    data: usersData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: hasNextUsers,
    isFetchingNextPage: isFetchingNextUsers,
    isLoading: isLoadingUsers,
  } = useInfiniteQuery({
    queryKey: ['search', 'users', searchQuery],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedResponse<User>> => {
      if (!searchQuery.trim()) return { data: [], meta: { current_page: 1, per_page: 10, total: 0, last_page: 1 } };
      const api = getClientApi();
      const result = await api.search.users(searchQuery, {
        page: pageParam as number,
        per_page: 10,
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (meta && meta.current_page < meta.last_page) {
        return meta.current_page + 1;
      }
      return undefined;
    },
    enabled: searchQuery.trim().length > 0 && (activeTab === 'all' || activeTab === 'users'),
    initialPageParam: 1,
  });

  const {
    data: tagsData,
    fetchNextPage: fetchNextTags,
    hasNextPage: hasNextTags,
    isFetchingNextPage: isFetchingNextTags,
    isLoading: isLoadingTags,
  } = useInfiniteQuery({
    queryKey: ['search', 'tags', searchQuery],
    queryFn: async ({ pageParam = 1 }): Promise<PaginatedResponse<TagType>> => {
      if (!searchQuery.trim()) return { data: [], meta: { current_page: 1, per_page: 20, total: 0, last_page: 1 } };
      const api = getClientApi();
      const result = await api.search.tags(searchQuery, {
        page: pageParam as number,
        per_page: 20,
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      if (meta && meta.current_page < meta.last_page) {
        return meta.current_page + 1;
      }
      return undefined;
    },
    enabled: searchQuery.trim().length > 0 && (activeTab === 'all' || activeTab === 'tags'),
    initialPageParam: 1,
  });

  const allPosts = postsData?.pages.flatMap((page) => page.data || []) || [];
  const allUsers = usersData?.pages.flatMap((page) => page.data || []) || [];
  const allTags = tagsData?.pages.flatMap((page) => page.data || []) || [];

  const hasResults =
    allPosts.length > 0 || allUsers.length > 0 || allTags.length > 0;

  const totalCount =
    (postsData?.pages[0]?.meta?.total || 0) +
    (usersData?.pages[0]?.meta?.total || 0) +
    (tagsData?.pages[0]?.meta?.total || 0);

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto mb-8">
        <SearchBar
          placeholder="搜索帖子、用户、话题..."
          initialValue={searchQuery}
          onSearch={handleSearch}
          autoFocus
        />
        {searchQuery && (
          <p className="mt-3 text-sm text-muted-foreground">
            共找到 <span className="font-medium text-foreground">{totalCount}</span> 个与
            &ldquo;<span className="font-medium text-foreground">{searchQuery}</span>&rdquo; 相关的结果
          </p>
        )}
      </div>

      {!searchQuery ? (
        <div className="max-w-3xl mx-auto">
          <HotSearches onSelect={handleSearch} />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6 w-full justify-start bg-transparent p-0 border-b">
            <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Search className="mr-1.5 h-4 w-4" />
              全部
            </TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <FileText className="mr-1.5 h-4 w-4" />
              帖子
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <UserIcon className="mr-1.5 h-4 w-4" />
              用户
            </TabsTrigger>
            <TabsTrigger value="tags" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Hash className="mr-1.5 h-4 w-4" />
              话题
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <TabsContent value="all" className="mt-0 space-y-8">
                {(isLoadingPosts || isLoadingUsers || isLoadingTags) && !hasResults ? (
                  <div className="space-y-8">
                    <PostsSkeleton />
                  </div>
                ) : !hasResults ? (
                  <Empty
                    title={`没有找到与 "${searchQuery}" 相关的结果`}
                    description="请尝试其他关键词，或检查拼写是否正确"
                    icon={<Search className="h-12 w-12 opacity-50" />}
                  />
                ) : (
                  <>
                    {allPosts.length > 0 && (
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            帖子
                          </h2>
                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}&type=posts`}
                            className="text-sm text-primary hover:underline"
                          >
                            查看全部
                          </Link>
                        </div>
                        <div className="space-y-4">
                          {allPosts.slice(0, 3).map((thread) => (
                            <PostCard key={thread.id} {...mapThreadToCard(thread)} />
                          ))}
                        </div>
                      </section>
                    )}

                    {allUsers.length > 0 && (
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <UserIcon className="h-5 w-5" />
                            用户
                          </h2>
                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}&type=users`}
                            className="text-sm text-primary hover:underline"
                          >
                            查看全部
                          </Link>
                        </div>
                        <div className="space-y-3">
                          {allUsers.slice(0, 3).map((user) => (
                            <UserCard
                              key={user.id}
                              id={String(user.id)}
                              username={user.username}
                              avatar={user.avatar}
                              bio={user.bio || user.signature}
                              stats={{
                                posts: user.thread_count,
                                followers: user.fans_count,
                                following: user.follow_count,
                              }}
                              showFollowButton={false}
                            />
                          ))}
                        </div>
                      </section>
                    )}

                    {allTags.length > 0 && (
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Hash className="h-5 w-5" />
                            话题
                          </h2>
                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}&type=tags`}
                            className="text-sm text-primary hover:underline"
                          >
                            查看全部
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {allTags.slice(0, 10).map((tag) => (
                            <Link key={tag.id} href={`/tag/${tag.id}`}>
                              <Tag variant="blue" className="text-sm">
                                {tag.name}
                                <span className="ml-1 opacity-70">({tag.thread_count})</span>
                              </Tag>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="posts" className="mt-0 space-y-4">
                {isLoadingPosts ? (
                  <PostsSkeleton />
                ) : allPosts.length === 0 ? (
                  <Empty
                    title={`没有找到与 "${searchQuery}" 相关的帖子`}
                    description="请尝试其他关键词"
                    icon={<FileText className="h-12 w-12 opacity-50" />}
                  />
                ) : (
                  <>
                    {allPosts.map((thread) => (
                      <PostCard key={thread.id} {...mapThreadToCard(thread)} />
                    ))}
                    {hasNextPosts && (
                      <div className="flex justify-center pt-4">
                        <Button
                          variant="outline"
                          onClick={() => fetchNextPosts()}
                          disabled={isFetchingNextPosts}
                        >
                          {isFetchingNextPosts ? '加载中...' : '加载更多'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="users" className="mt-0 space-y-3">
                {isLoadingUsers ? (
                  <UsersSkeleton />
                ) : allUsers.length === 0 ? (
                  <Empty
                    title={`没有找到与 "${searchQuery}" 相关的用户`}
                    description="请尝试其他关键词"
                    icon={<UserIcon className="h-12 w-12 opacity-50" />}
                  />
                ) : (
                  <>
                    {allUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        id={String(user.id)}
                        username={user.username}
                        avatar={user.avatar}
                        bio={user.bio || user.signature}
                        stats={{
                          posts: user.thread_count,
                          followers: user.fans_count,
                          following: user.follow_count,
                        }}
                      />
                    ))}
                    {hasNextUsers && (
                      <div className="flex justify-center pt-4">
                        <Button
                          variant="outline"
                          onClick={() => fetchNextUsers()}
                          disabled={isFetchingNextUsers}
                        >
                          {isFetchingNextUsers ? '加载中...' : '加载更多'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="tags" className="mt-0">
                {isLoadingTags ? (
                  <TagsSkeleton />
                ) : allTags.length === 0 ? (
                  <Empty
                    title={`没有找到与 "${searchQuery}" 相关的话题`}
                    description="请尝试其他关键词"
                    icon={<Hash className="h-12 w-12 opacity-50" />}
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Link key={tag.id} href={`/tag/${tag.id}`}>
                          <Tag variant="blue" className="text-sm py-1.5">
                            {tag.name}
                            <span className="ml-1 opacity-70">({tag.thread_count})</span>
                          </Tag>
                        </Link>
                      ))}
                    </div>
                    {hasNextTags && (
                      <div className="flex justify-center pt-6">
                        <Button
                          variant="outline"
                          onClick={() => fetchNextTags()}
                          disabled={isFetchingNextTags}
                        >
                          {isFetchingNextTags ? '加载中...' : '加载更多'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </div>

            <div className="space-y-6">
              <HotSearches onSelect={handleSearch} />
            </div>
          </div>
        </Tabs>
      )}
    </div>
  );
}
