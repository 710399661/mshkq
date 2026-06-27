import Link from 'next/link';
import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { PostCard } from '@discuzq/ui/post-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@discuzq/ui/tabs';
import { Tag } from '@discuzq/ui/tag';
import { UserCard } from '@discuzq/ui/user-card';
import { buildMetadata } from '@discuzq/seo/metadata';

export const metadata = buildMetadata({
  title: '首页',
  description: 'Discuz! Q 新一代社区系统首页，发现优质内容，交流思想',
  type: 'website',
});

const mockThreads = [
  {
    id: '1',
    title: 'Discuz! Q 新版本发布，带来全新的社区体验',
    excerpt:
      '经过团队的不懈努力，我们很高兴地宣布 Discuz! Q 新版本正式发布。这次更新带来了全新的 UI 设计、更快的加载速度、以及更多的社区互动功能...',
    cover:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=280&fit=crop',
    author: {
      id: '1',
      username: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
    category: { id: '1', name: '公告' },
    tags: [
      { id: '1', name: '新版本' },
      { id: '2', name: '更新' },
    ],
    stats: { views: 12580, replies: 128, likes: 456 },
    isSticky: true,
    isEssence: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: '如何构建高性能的社区系统？架构师分享实战经验',
    excerpt:
      '在构建社区系统时，性能是一个永恒的话题。本文将从数据库设计、缓存策略、前端优化等多个角度，分享我们在构建 Discuz! Q 过程中的一些实践经验...',
    cover:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=280&fit=crop',
    author: {
      id: '2',
      username: '架构师小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ming',
    },
    category: { id: '2', name: '技术交流' },
    tags: [
      { id: '3', name: '架构' },
      { id: '4', name: '性能优化' },
    ],
    stats: { views: 8923, replies: 89, likes: 312 },
    isEssence: true,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: '前端周刊 #25：React 19 新特性解读',
    excerpt:
      '本期前端周刊为大家带来 React 19 的新特性解读，包括 Server Components、Actions、use() 等重要更新，以及 Next.js 15 的最新进展...',
    author: {
      id: '3',
      username: '前端小达人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frontend',
    },
    category: { id: '3', name: '前端开发' },
    tags: [
      { id: '5', name: 'React' },
      { id: '6', name: '前端' },
    ],
    stats: { views: 5621, replies: 45, likes: 189 },
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: '周末闲聊：大家平时都用什么开发工具？',
    excerpt:
      '想问问大家平时开发都用什么 IDE？VS Code？WebStorm？还是 Neovim？另外有没有什么好用的插件推荐？一起来聊聊吧～',
    author: {
      id: '4',
      username: '摸鱼工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fish',
    },
    category: { id: '4', name: '灌水闲聊' },
    tags: [{ id: '7', name: '闲聊' }],
    stats: { views: 3245, replies: 156, likes: 78 },
    createdAt: '2024-01-12',
  },
];

const hotTags = [
  { id: '1', name: 'React' },
  { id: '2', name: 'Next.js' },
  { id: '3', name: 'TypeScript' },
  { id: '4', name: 'Laravel' },
  { id: '5', name: 'PHP' },
  { id: '6', name: '前端' },
  { id: '7', name: '后端' },
  { id: '8', name: '架构' },
];

const hotUsers = [
  {
    id: '1',
    username: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'Discuz! Q 官方账号',
    stats: { posts: 156, followers: 12580, following: 23 },
  },
  {
    id: '2',
    username: '架构师小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ming',
    bio: '10 年后端经验，专注高并发架构',
    stats: { posts: 89, followers: 8923, following: 156 },
  },
  {
    id: '3',
    username: '前端小达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frontend',
    bio: '热爱前端，热爱开源',
    stats: { posts: 124, followers: 6721, following: 89 },
  },
];

export default function HomePage() {
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
            {mockThreads.map((thread) => (
              <PostCard key={thread.id} {...thread} />
            ))}
          </TabsContent>

          <TabsContent value="hot" className="mt-0 space-y-4">
            {mockThreads.slice(0, 3).map((thread) => (
              <PostCard key={thread.id} {...thread} />
            ))}
          </TabsContent>

          <TabsContent value="essence" className="mt-0 space-y-4">
            {mockThreads.slice(0, 2).map((thread) => (
              <PostCard key={thread.id} {...thread} />
            ))}
          </TabsContent>

          <TabsContent value="trending" className="mt-0 space-y-4">
            {mockThreads.slice(1).map((thread) => (
              <PostCard key={thread.id} {...thread} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">热门话题</h3>
          <div className="flex flex-wrap gap-2">
            {hotTags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.id}`}>
                <Tag variant="blue">{tag.name}</Tag>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">活跃用户</h3>
          <div className="space-y-3">
            {hotUsers.map((user) => (
              <UserCard
                key={user.id}
                {...user}
                showFollowButton={false}
              />
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
