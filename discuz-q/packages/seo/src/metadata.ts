import type { Metadata } from 'next';

export interface SeoMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const SITE_NAME = 'Discuz! Q';
const DEFAULT_DESCRIPTION = 'Discuz! Q 新一代社区系统';
const DEFAULT_IMAGE = '/og-default.png';

export function buildMetadata(params: SeoMetadataParams = {}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
    tags = [],
  } = params;

  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    metadataBase: url && url.startsWith('http') ? new URL(url) : undefined,
    openGraph: {
      type,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
      url,
      publishedTime,
      modifiedTime,
      tags: tags.length > 0 ? tags : undefined,
      authors: author ? [author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
      creator: author ? `@${author}` : undefined,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function buildThreadMetadata(params: {
  title: string;
  excerpt: string;
  cover?: string;
  url: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
}): Metadata {
  return buildMetadata({
    title: params.title,
    description: params.excerpt,
    image: params.cover,
    url: params.url,
    type: 'article',
    author: params.author,
    publishedTime: params.createdAt,
    modifiedTime: params.updatedAt,
    tags: params.tags,
  });
}

export function buildUserMetadata(params: {
  username: string;
  bio?: string;
  avatar?: string;
  url: string;
}): Metadata {
  return buildMetadata({
    title: params.username,
    description: params.bio,
    image: params.avatar,
    url: params.url,
    type: 'profile',
    author: params.username,
  });
}
