export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
}

export function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlset = entries
    .map((entry) => {
      const parts = [`<loc>${entry.url}</loc>`];
      if (entry.lastModified) {
        const date =
          typeof entry.lastModified === 'string'
            ? entry.lastModified
            : entry.lastModified.toISOString();
        parts.push(`<lastmod>${date}</lastmod>`);
      }
      if (entry.changeFrequency) {
        parts.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
      }
      if (entry.priority !== undefined) {
        parts.push(`<priority>${entry.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${parts.map((p) => `    ${p}`).join('\n')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;
}

export function paginateSitemapEntries(
  entries: SitemapEntry[],
  pageSize = 50000,
): SitemapEntry[][] {
  const pages: SitemapEntry[][] = [];
  for (let i = 0; i < entries.length; i += pageSize) {
    pages.push(entries.slice(i, i + pageSize));
  }
  return pages;
}

export function generateSitemapIndex(baseUrl: string, count: number): string {
  const sitemaps = Array.from({ length: count }, (_, i) => {
    return `  <sitemap>\n    <loc>${baseUrl}/sitemap-${i + 1}.xml</loc>\n  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}
