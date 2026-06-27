import type { Metadata } from 'next';
import { buildMetadata } from '@discuzq/seo/metadata';
import { SearchPageClient } from '@/components/search-page-client';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q || '';

  if (!q) {
    return buildMetadata({
      title: '搜索',
      description: '搜索帖子、用户和话题',
      keywords: ['搜索', '帖子', '用户', '话题'],
    });
  }

  return buildMetadata({
    title: `${q} - 搜索结果`,
    description: `搜索 "${q}" 的相关结果，包括帖子、用户和话题`,
    keywords: [q, '搜索', '帖子', '用户', '话题'],
  });
}

export default function SearchPage() {
  return <SearchPageClient />;
}
