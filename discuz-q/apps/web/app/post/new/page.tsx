'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, Eye, Send, Tag as TagIcon, Loader2 } from 'lucide-react';
import { Button } from '@discuzq/ui/button';
import { Input } from '@discuzq/ui/input';
import { Textarea } from '@discuzq/ui/textarea';
import { Card, CardContent, CardFooter } from '@discuzq/ui/card';
import { Tag } from '@discuzq/ui/tag';
import { toast } from '@discuzq/ui/toast';
import { useAuthStore } from '@/store/auth';
import { getClientApi } from '@/lib/api';
import type { Category, Tag as TagType, PaginatedResponse } from '@discuzq/sdk/server';

export default function NewPostPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const [categoryId, setCategoryId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{
    category?: string;
    title?: string;
    content?: string;
  }>({});

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const api = getClientApi();
      return await api.categories.list();
    },
  });

  const { data: hotTags } = useQuery<PaginatedResponse<TagType>>({
    queryKey: ['hotTags'],
    queryFn: async () => {
      const api = getClientApi();
      const result = await api.tags.list({ page: 1, per_page: 15, sort: '-thread_count' });
      return result;
    },
  });

  const tagList = useMemo(() => {
    return hotTags?.data || [];
  }, [hotTags]);

  const createThreadMutation = useMutation({
    mutationFn: async (params: {
      category_id: number;
      title: string;
      content: string;
      tags: number[];
    }) => {
      const api = getClientApi();
      return await api.threads.create(params);
    },
    onSuccess: (thread) => {
      toast({
        title: '发布成功',
        description: '你的帖子已成功发布',
      });
      router.push(`/thread/${thread.id}`);
    },
    onError: (error: { message?: string }) => {
      toast({
        title: '发布失败',
        description: error?.message || '请稍后重试',
        variant: 'destructive',
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          返回首页
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl font-semibold">请先登录</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              登录后才能发布帖子
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/login">
                <Button>去登录</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">注册账号</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!categoryId) {
      newErrors.category = '请选择分类';
    }
    if (!title.trim()) {
      newErrors.title = '请输入标题';
    } else if (title.length > 100) {
      newErrors.title = '标题不能超过 100 字';
    }
    if (!content.trim()) {
      newErrors.content = '请输入内容';
    } else if (content.length < 10) {
      newErrors.content = '内容不能少于 10 字';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    createThreadMutation.mutate({
      category_id: Number(categoryId),
      title: title.trim(),
      content: content.trim(),
      tags: selectedTags,
    });
  };

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/"
        className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        返回首页
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">发布帖子</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          分享你的想法和见解
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              分类 <span className="text-destructive">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                if (errors.category) {
                  setErrors((prev) => ({ ...prev, category: undefined }));
                }
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                标题 <span className="text-destructive">*</span>
              </label>
              <span className="text-xs text-muted-foreground">
                {title.length}/100
              </span>
            </div>
            <Input
              placeholder="请输入帖子标题"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              maxLength={100}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium">
              <TagIcon className="h-4 w-4" />
              标签
            </label>
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className="cursor-pointer"
                  type="button"
                >
                  <Tag
                    variant={selectedTags.includes(tag.id) ? 'blue' : 'outline'}
                    className="cursor-pointer"
                  >
                    {tag.name}
                  </Tag>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              点击选择热门标签（可选）
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                内容 <span className="text-destructive">*</span>
              </label>
              <span className="text-xs text-muted-foreground">
                {content.length} 字（最少 10 字）
              </span>
            </div>
            <Textarea
              placeholder="请输入帖子内容，支持简单的 Markdown 格式..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) {
                  setErrors((prev) => ({ ...prev, content: undefined }));
                }
              }}
              className="min-h-[300px] resize-y"
            />
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
          </div>

          {showPreview && (
            <div className="space-y-2">
              <label className="text-sm font-medium">预览</label>
              <div className="rounded-md border bg-muted/30 p-4">
                <h3 className="text-lg font-semibold">{title || '标题预览'}</h3>
                <div className="mt-2 whitespace-pre-wrap text-sm">
                  {content || '内容预览...'}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            type="button"
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? '隐藏预览' : '预览'}
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button"
              disabled={createThreadMutation.isPending}
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createThreadMutation.isPending}
              type="button"
            >
              {createThreadMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  发布中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  发布
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
