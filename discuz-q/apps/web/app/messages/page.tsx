import type { Metadata } from 'next';
import { buildMetadata } from '@discuzq/seo/metadata';
import { MessageSquare } from 'lucide-react';
import { ConversationsList } from '@/components/messages/conversations-list';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: '私信',
    description: '查看和发送私信',
  });
}

export default function MessagesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          私信
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          与其他用户私信交流
        </p>
      </div>
      <ConversationsList />
    </div>
  );
}
