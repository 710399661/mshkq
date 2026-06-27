import Link from 'next/link';
import Image from 'next/image';
import { Folder, FileText } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@discuzq/ui/card';
import { Badge } from '@discuzq/ui/badge';
import { buildMetadata } from '@discuzq/seo/metadata';
import { formatCompactNumber } from '@discuzq/utils/format';
import { createServerApi } from '@/lib/api';
import type { Category } from '@discuzq/sdk/server';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: '所有分类',
  description: '浏览 Discuz! Q 社区的所有分类板块',
  type: 'website',
});

async function getCategories() {
  try {
    const api = createServerApi();
    const categories = await api.categories.list();
    return categories || [];
  } catch (e) {
    console.error('Failed to fetch categories:', e);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">所有分类</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            浏览社区的 {categories.length} 个分类板块
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: Category) => (
          <Link key={category.id} href={`/category/${category.id}`} className="group">
            <Card className="h-full transition-all hover:border-primary/30 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <Folder className="h-5 w-5" />
                    )}
                  </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    <FileText className="mr-1 h-3 w-3" />
                    {formatCompactNumber(category.thread_count)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {category.description || '暂无描述'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          暂无分类
        </div>
      )}
    </div>
  );
}
