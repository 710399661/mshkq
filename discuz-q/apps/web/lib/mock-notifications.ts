'use client';

import type { Notification } from '@discuzq/sdk/server';

export interface NotificationWithUser extends Notification {
  user?: {
    id: number;
    username: string;
    avatar: string;
  };
  thread?: {
    id: number;
    title: string;
  };
  post?: {
    id: number;
    content: string;
  };
}

const STORAGE_KEY = 'discuzq-mock-notifications';

const mockUsers = [
  { id: 1, username: '张三', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan' },
  { id: 2, username: '李四', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi' },
  { id: 3, username: '王五', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu' },
  { id: 4, username: '赵六', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu' },
  { id: 5, username: '系统通知', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=system' },
];

const mockThreads = [
  { id: 1, title: 'Discuz! Q 新版本发布，带来全新体验' },
  { id: 2, title: '如何写出高质量的技术文章？分享我的经验' },
  { id: 3, title: '前端性能优化最佳实践总结' },
  { id: 4, title: '推荐几个好用的开发工具' },
  { id: 5, title: '程序员如何保持学习的热情？' },
];

function generateMockNotifications(): NotificationWithUser[] {
  const now = Date.now();
  const types = ['reply', 'like', 'follow', 'system'];
  const notifications: NotificationWithUser[] = [];

  for (let i = 0; i < 20; i++) {
    const type = types[i % 4];
    const user = mockUsers[i % mockUsers.length]!;
    const thread = mockThreads[i % mockThreads.length]!;
    const read_at = i < 8 ? null : new Date(now - i * 3600000).toISOString();

    let data: Record<string, unknown> = {};
    let threadInfo: { id: number; title: string } | undefined;
    let postInfo: { id: number; content: string } | undefined;

    if (type === 'reply') {
      data = {
        thread_id: thread.id,
        post_id: 100 + i,
        content: '这个观点很有深度，学习了！',
      };
      threadInfo = thread;
      postInfo = { id: 100 + i, content: '这个观点很有深度，学习了！' };
    } else if (type === 'like') {
      data = {
        thread_id: thread.id,
        post_id: 200 + i,
      };
      threadInfo = thread;
    } else if (type === 'follow') {
      data = {
        follower_id: user.id,
      };
    } else if (type === 'system') {
      data = {
        title: '系统维护通知',
        content: '系统将于本周六凌晨进行维护，预计持续2小时。',
      };
    }

    notifications.push({
      id: String(1000 + i),
      type: type as string,
      data,
      read_at,
      created_at: new Date(now - i * 3600000).toISOString(),
      user: type === 'system' ? mockUsers[4] : user,
      thread: threadInfo,
      post: postInfo,
    });
  }

  return notifications;
}

function getStoredNotifications(): NotificationWithUser[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
  }

  const initial = generateMockNotifications();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveNotifications(notifications: NotificationWithUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export async function getNotifications(params?: {
  page?: number;
  per_page?: number;
  type?: string;
}): Promise<{
  data: NotificationWithUser[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const page = params?.page || 1;
  const per_page = params?.per_page || 10;
  const type = params?.type || 'all';

  let all = getStoredNotifications();

  if (type !== 'all') {
    all = all.filter((n) => n.type === type);
  }

  const start = (page - 1) * per_page;
  const end = start + per_page;
  const data = all.slice(start, end);
  const total = all.length;
  const last_page = Math.ceil(total / per_page) || 1;

  return {
    data,
    meta: {
      current_page: page,
      per_page,
      total,
      last_page,
    },
  };
}

export async function getUnreadCount(): Promise<{ count: number }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const all = getStoredNotifications();
  const count = all.filter((n) => !n.read_at).length;
  return { count };
}

export async function markAsRead(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const all = getStoredNotifications();
  const notification = all.find((n) => n.id === id);
  if (notification) {
    notification.read_at = new Date().toISOString();
    saveNotifications(all);
  }
}

export async function markAllAsRead(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const all = getStoredNotifications();
  const now = new Date().toISOString();
  all.forEach((n) => {
    if (!n.read_at) {
      n.read_at = now;
    }
  });
  saveNotifications(all);
}

export function getNotificationText(notification: NotificationWithUser): {
  action: string;
  target?: string;
} {
  switch (notification.type) {
    case 'reply':
      return {
        action: '回复了你的帖子',
        target: notification.thread?.title,
      };
    case 'like':
      return {
        action: '赞了你的帖子',
        target: notification.thread?.title,
      };
    case 'follow':
      return {
        action: '关注了你',
      };
    case 'system':
      return {
        action: (notification.data.title as string) || '系统通知',
        target: notification.data.content as string,
      };
    default:
      return { action: '有新通知' };
  }
}
