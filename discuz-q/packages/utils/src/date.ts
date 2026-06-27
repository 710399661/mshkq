import {
  format,
  formatDistanceToNow,
  formatRelative,
  isToday,
  isYesterday,
  isThisYear,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatDate(date: Date | string | number, pattern = 'yyyy-MM-dd HH:mm'): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(d, pattern, { locale: zhCN });
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: zhCN });
}

export function formatSmartDate(date: Date | string | number): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = Date.now();
  const diff = now - d.getTime();

  if (diff < 60 * 1000) return '刚刚';
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)} 小时前`;
  if (isToday(d)) return '今天 ' + format(d, 'HH:mm');
  if (isYesterday(d)) return '昨天 ' + format(d, 'HH:mm');
  if (isThisYear(d)) return format(d, 'MM-dd HH:mm');
  return format(d, 'yyyy-MM-dd');
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}
