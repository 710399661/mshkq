import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  Eye,
  ChevronLeft,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@discuzq/ui/avatar';
import { Button } from '@discuzq/ui/button';
import { Tag } from '@discuzq/ui/tag';
import { Badge } from '@discuzq/ui/badge';
import { RichText } from '@discuzq/ui/rich-text';
import { CommentList } from '@discuzq/ui/comment';
import { buildThreadMetadata } from '@discuzq/seo/metadata';
import { articleJsonLd } from '@discuzq/seo/jsonld';
import { formatSmartDate } from '@discuzq/utils/date';
import { formatCompactNumber } from '@discuzq/utils/format';

interface ThreadPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ThreadPageProps) {
  const { id } = await params;
  const thread = await getThread(id);
  if (!thread) return { title: '帖子不存在' };

  return buildThreadMetadata({
    title: thread.title,
    excerpt: thread.excerpt,
    cover: thread.cover,
    url: `https://example.com/thread/${thread.id}`,
    author: thread.author.username,
    createdAt: thread.createdAt,
    tags: thread.tags.map((t: { name: string }) => t.name),
  });
}

async function getThread(id: string) {
  const mockThreads: Record<string, any> = {
    '1': {
      id: '1',
      title: 'Discuz! Q 新版本发布，带来全新的社区体验',
      excerpt:
        '经过团队的不懈努力，我们很高兴地宣布 Discuz! Q 新版本正式发布。这次更新带来了全新的 UI 设计、更快的加载速度、以及更多的社区互动功能。',
      content: `
        <p>经过团队的不懈努力，我们很高兴地宣布 <strong>Discuz! Q 新版本</strong> 正式发布！</p>
        <h2>主要更新内容</h2>
        <ul>
          <li>全新的 UI 设计，更加现代化、更加简洁</li>
          <li>更快的加载速度，首屏渲染性能提升 50%</li>
          <li>支持深色模式，保护你的眼睛</li>
          <li>新增话题标签功能，更好地组织内容</li>
          <li>优化搜索体验，支持全文搜索</li>
        </ul>
        <h2>技术亮点</h2>
        <p>本次更新采用了最新的 <code>Next.js 15</code> 框架，结合 React Server Components 技术，大幅提升了首屏加载速度和 SEO 表现。</p>
        <blockquote>
          <p>我们的目标是打造最好用的社区系统，让每一个社区都能轻松运营。</p>
        </blockquote>
        <h2>如何升级</h2>
        <p>如果你正在使用旧版本，可以通过后台一键升级。升级前请务必备份数据！</p>
        <p>感谢大家一直以来的支持，我们会继续努力，带来更好的产品体验。</p>
      `,
      cover:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop',
      author: {
        id: '1',
        username: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        bio: 'Discuz! Q 官方账号',
      },
      category: { id: '1', name: '公告' },
      tags: [
        { id: '1', name: '新版本' },
        { id: '2', name: '更新' },
        { id: '3', name: '发布' },
      ],
      stats: { views: 12580, replies: 128, likes: 456, shares: 89, favorites: 234 },
      isSticky: true,
      isEssence: true,
      isLiked: false,
      isFavorited: false,
      createdAt: '2024-01-15T10:30:00Z',
      postedAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T08:20:00Z',
    },
  };

  return mockThreads[id] || null;
}

const mockComments = [
  {
    id: '1',
    content: '恭喜恭喜！新版本看起来很棒，期待体验更多新功能。',
    author: {
      id: '2',
      username: '架构师小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ming',
    },
    createdAt: '2小时前',
    likes: 12,
    isLiked: false,
    replyCount: 3,
  },
  {
    id: '2',
    content: '深色模式好评！晚上刷论坛再也不怕刺眼了。',
    author: {
      id: '3',
      username: '前端小达人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frontend',
    },
    createdAt: '5小时前',
    likes: 28,
    isLiked: true,
    replyCount: 0,
  },
  {
    id: '3',
    content: '搜索功能有提升吗？之前的搜索不太好用，经常搜不到想要的内容。',
    author: {
      id: '4',
      username: '摸鱼工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fish',
    },
    createdAt: '昨天',
    likes: 5,
    isLiked: false,
    replyCount: 1,
  },
];

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { id } = await params;
  const thread = await getThread(id);
  if (!thread) notFound();

  const jsonLd = articleJsonLd({
    headline: thread.title,
    description: thread.excerpt,
    image: thread.cover ? [thread.cover] : undefined,
    authorName: thread.author.username,
    authorUrl: `/user/${thread.author.id}`,
    publisherName: 'Discuz! Q',
    datePublished: thread.createdAt,
    dateModified: thread.updatedAt,
    url: `/thread/${thread.id}`,
    keywords: thread.tags.map((t: { name: string }) => t.name),
    articleSection: thread.category.name,
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
            <div className="mb-3 flex items-center gap-2">
              {thread.isSticky && (
                <Badge variant="warning" className="text-xs">
                  置顶
                </Badge>
              )}
              {thread.isEssence && (
                <Badge variant="success" className="text-xs">
                  精华
                </Badge>
              )}
              <Link
                href={`/category/${thread.category.id}`}
                className="text-sm text-primary hover:underline"
              >
                {thread.category.name}
              </Link>
            </div>

            <h1 className="text-2xl font-bold">{thread.title}</h1>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href={`/user/${thread.author.id}`}>
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={thread.author.avatar} alt={thread.author.username} />
                    <AvatarFallback>{thread.author.username[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    href={`/user/${thread.author.id}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {thread.author.username}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    发布于 {formatSmartDate(thread.postedAt)}
                    <span className="mx-2">·</span>
                    <Eye className="inline h-3.5 w-3.5" />
                    {formatCompactNumber(thread.stats.views)} 浏览
                  </div>
                </div>
              </div>

              <Button size="sm">关注</Button>
            </div>
          </div>

          {thread.tags.length > 0 && (
            <div className="border-b px-6 py-3">
              <div className="flex flex-wrap gap-2">
                {thread.tags.map((tag: { id: string; name: string }) => (
                  <Link key={tag.id} href={`/tag/${tag.id}`}>
                    <Tag variant="blue">{tag.name}</Tag>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-6">
            <RichText content={thread.content} />
          </div>

          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-rose-500">
                  <Heart className="h-5 w-5" />
                  <span>{thread.stats.likes} 点赞</span>
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                  <span>{thread.stats.replies} 评论</span>
                </div>
                <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-amber-500">
                  <Bookmark className="h-5 w-5" />
                  <span>收藏</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Share2 className="h-5 w-5" />
                  <span>分享</span>
                </button>
              </div>
              <button className="text-sm text-muted-foreground transition-colors hover:text-destructive">
                <Flag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>

        <div className="mt-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">
            全部评论 <span className="text-sm font-normal text-muted-foreground">({thread.stats.replies})</span>
          </h2>
          <CommentList comments={mockComments} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">作者</h3>
          <Link
            href={`/user/${thread.author.id}`}
            className="flex items-center gap-3"
          >
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={thread.author.avatar} alt={thread.author.username} />
              <AvatarFallback>{thread.author.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{thread.author.username}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {thread.author.bio}
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
                  相关推荐帖子标题 {i}：社区系统架构设计经验分享
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
