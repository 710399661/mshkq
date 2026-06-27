'use client';

import Link from 'next/link';
import { Button } from '@discuzq/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-xl font-semibold">页面不存在</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        抱歉，您访问的页面不存在或已被删除。
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回上页
        </button>
      </div>
    </div>
  );
}
