/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const getLanguageFromPath = (pathname: string): Language => {
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return 'en';

  const firstSegment = pathSegments[0];

  if (firstSegment === 'en' || firstSegment === 'ru' || firstSegment === 'zh') {
    return firstSegment as Language;
  }

  return 'en';
};

export const getPathWithoutLanguage = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment === 'en' || firstSegment === 'ru' || firstSegment === 'zh') {
    return '/' + pathSegments.slice(1).join('/');
  }

  return pathname;
};

export const buildLocalizedPath = (lang: Language, path: string = '/'): string => {
  if (lang === 'en') return path;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
};

export const switchLanguage = (newLang: Language, currentPath: string, currentLang: Language): string => {
  const pathWithoutLang = getPathWithoutLanguage(currentPath);
  return buildLocalizedPath(newLang, pathWithoutLang);
};

export const getCanonicalPath = (lang: Language, path: string): string => {
  // For canonical URLs, we want the English version to be without prefix
  if (lang === 'en') {
    return path;
  }

  // For other languages, include the language prefix
  return `/${lang}${path}`;
};