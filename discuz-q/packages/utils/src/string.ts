export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateId(prefix = ''): string {
  return prefix + Math.random().toString(36).slice(2, 10);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function extractExcerpt(html: string, maxLength = 150): string {
  const text = stripHtml(html);
  return text.slice(0, maxLength);
}
