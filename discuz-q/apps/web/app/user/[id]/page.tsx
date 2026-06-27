import { notFound } from 'next/navigation';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  if (!id) notFound();

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">用户 #{id}</h1>
      <p className="mt-2 text-muted-foreground">用户主页开发中...</p>
    </div>
  );
}
