import { SectionId } from '../types';

export interface SeoInfo {
  title: string;
  description: string;
  imageUrl?: string;
  pageUrl?: string;
}

const updateMetaTag = (attributeName: string, attributeValue: string, content: string, isProperty = false) => {
  const selector = isProperty 
    ? `meta[property="${attributeName}"]` 
    : `meta[name="${attributeName}"]`;
  
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    if (isProperty) {
      element.setAttribute('property', attributeName);
    } else {
      element.setAttribute('name', attributeName);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const updateDynamicMeta = (sectionId: SectionId | string, seoInfo: SeoInfo) => {
  if (!seoInfo) return;

  // 1. Dynamic document title
  document.title = seoInfo.title;

  // 2. Head description tags (standard search crawls representation)
  updateMetaTag('description', 'description', seoInfo.description, false);

  // 3. OpenGraph Protocol Tags
  updateMetaTag('og:title', 'og:title', seoInfo.title, true);
  updateMetaTag('og:description', 'og:description', seoInfo.description, true);
  updateMetaTag('og:type', 'og:type', 'website', true);
  
  const currentUrl = seoInfo.pageUrl || window.location.href.split('#')[0] + '#' + sectionId;
  updateMetaTag('og:url', 'og:url', currentUrl, true);

  const defaultImage = seoInfo.imageUrl || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop';
  updateMetaTag('og:image', 'og:image', defaultImage, true);

  // 4. Twitter Cards Integration tags
  updateMetaTag('twitter:card', 'twitter:card', 'summary_large_image', false);
  updateMetaTag('twitter:title', 'twitter:title', seoInfo.title, false);
  updateMetaTag('twitter:description', 'twitter:description', seoInfo.description, false);
  updateMetaTag('twitter:image', 'twitter:image', defaultImage, false);

  console.info(`[Dynamic SEO] Synced OpenGraph and Twitter metadata for: ${sectionId}`);
};
