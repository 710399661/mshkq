'use client';

import * as React from 'react';
import { sanitizeHtml } from '@discuzq/utils';
import { cn } from '../../lib/utils';

export interface RichTextProps {
  content: string;
  className?: string;
}

function RichText({ content, className }: RichTextProps) {
  const safeContent = React.useMemo(() => {
    return sanitizeHtml(content);
  }, [content]);

  return (
    <div
      className={cn(
        'prose prose-sm max-w-none',
        'prose-headings:font-bold prose-headings:text-foreground',
        'prose-p:text-foreground prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-img:rounded-lg prose-img:mx-auto',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm',
        'prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground',
        'prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary',
        'prose-hr:border-border',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}

export { RichText };
