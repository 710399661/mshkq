import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  if (!id) notFound();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">分类 #{id}</h1>
      <p className="mt-2 text-muted-foreground">分类详情页开发中...</p>
    </div>
  );
}
