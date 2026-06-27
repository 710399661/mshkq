import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{ id: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { id } = await params;

  if (!id) notFound();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">话题 #{id}</h1>
      <p className="mt-2 text-muted-foreground">话题详情页开发中...</p>
    </div>
  );
}
