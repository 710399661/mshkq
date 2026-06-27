export interface ArticleJsonLdProps {
  headline: string;
  description: string;
  image?: string[];
  authorName: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  keywords?: string[];
  articleSection?: string;
}

export function articleJsonLd(props: ArticleJsonLdProps) {
  const {
    headline,
    description,
    image = [],
    authorName,
    authorUrl,
    publisherName = 'Discuz! Q',
    publisherLogo,
    datePublished,
    dateModified,
    url,
    keywords,
    articleSection,
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: publisherLogo
        ? {
            '@type': 'ImageObject',
            url: publisherLogo,
          }
        : undefined,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords?.join(', '),
    articleSection,
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function organizationJsonLd(props: OrganizationJsonLdProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: props.name,
    url: props.url,
    logo: props.logo,
    sameAs: props.sameAs,
  };
}

export interface PersonJsonLdProps {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}

export function personJsonLd(props: PersonJsonLdProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.name,
    url: props.url,
    image: props.image,
    jobTitle: props.jobTitle,
    description: props.description,
    sameAs: props.sameAs,
  };
}
