/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Language } from '../types';

interface SEOHeadOptions {
  lang: Language;
  page?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const useSEOHead = ({
  lang,
  page = 'home',
  title,
  description,
  canonicalUrl,
  ogImage
}: SEOHeadOptions) => {
  useEffect(() => {
    // Update HTML lang attribute
    const htmlElement = document.documentElement;
    htmlElement.lang = lang;
    htmlElement.setAttribute('data-lang', lang);

    // Update title
    const getTitle = () => {
      const titles = {
        en: {
          home: 'Long Ying Logistics | Premium China-Russia Trade Solutions',
          services: 'Logistics Services | Long Ying Logistics',
          about: 'About Long Ying Logistics | Heritage & Innovation',
          insights: 'Logistics Insights & Industry News | Long Ying Logistics',
          tariffs: 'Pricing & Tariffs | Long Ying Logistics',
          contacts: 'Contact Long Ying Logistics | Get Started Today'
        },
        ru: {
          home: 'Long Ying Logistics | Премиальные логистические решения Китай-Россия',
          services: 'Логистические услуги | Long Ying Logistics',
          about: 'О компании Long Ying Logistics | Наследие и инновации',
          insights: 'Логистические инсайты и новости отрасли | Long Ying Logistics',
          tariffs: 'Цены и тарифы | Long Ying Logistics',
          contacts: 'Контакты Long Ying Logistics | Начните сегодня'
        },
        zh: {
          home: '龙盈物流 | 中俄贸易优质解决方案',
          services: '物流服务 | 龙盈物流',
          about: '关于龙盈物流 | 传承与创新',
          insights: '物流洞察与行业资讯 | 龙盈物流',
          tariffs: '资费标准 | 龙盈物流',
          contacts: '联系龙盈物流 | 立即开始'
        }
      };
      return titles[lang]?.[page] || titles.en.home;
    };

    const finalTitle = title || getTitle();
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      let element = document.querySelector(`link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`) as HTMLLinkElement;

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Base domain
    const baseDomain = 'https://longyinglogistics.com';

    // Generate canonical URL
    const generateCanonicalUrl = () => {
      if (canonicalUrl) return canonicalUrl;
      const localePrefix = lang === 'en' ? '' : `/${lang}`;
      const pagePath = page === 'home' ? '' : `/${page}`;
      return `${baseDomain}${localePrefix}${pagePath}`;
    };

    const canonical = generateCanonicalUrl();

    // Update canonical
    updateLinkTag('canonical', canonical);

    // Update hreflang tags
    const pages = ['home', 'services', 'about', 'insights', 'tariffs', 'contacts'];
    pages.forEach(p => {
      const enUrl = p === 'home' ? baseDomain : `${baseDomain}/${p}`;
      const ruUrl = p === 'home' ? `${baseDomain}/ru` : `${baseDomain}/ru/${p}`;
      const zhUrl = p === 'home' ? `${baseDomain}/zh` : `${baseDomain}/zh/${p}`;

      updateLinkTag('alternate', enUrl, 'en');
      updateLinkTag('alternate', ruUrl, 'ru');
      updateLinkTag('alternate', zhUrl, 'zh');
    });
    updateLinkTag('alternate', pages.includes(page) ? (page === 'home' ? baseDomain : `${baseDomain}/${page}`) : baseDomain, 'x-default');

    // Update meta description
    const getDescription = () => {
      const descriptions = {
        en: {
          home: 'Exquisite customs solutions for China-Russia trade. Premium logistics connecting manufacturers to global markets with 99.7% accuracy and 24/7 support.',
          services: 'Comprehensive logistics services: heavy cargo, tech cargo, fashion lines, machinery, legal certification, consolidation, hazardous materials, cold chain, and fine art transport.',
          about: 'Modern bridge between East and West. Combining historical reliability with cutting-edge velocity for seamless China-Russia logistics operations.',
          insights: 'Stay informed with the latest logistics trends, trade insights, and industry developments in China-Russia trade corridors.',
          tariffs: 'Transparent pricing for premium logistics services. Standard, Business, and Premium plans with full insurance and dedicated account management.',
          contacts: 'Ready to optimize your supply chain? Contact our global offices in Shanghai, Moscow, and Dubai for tailored logistics solutions.'
        },
        ru: {
          home: 'Изысканные таможенные решения для торговли Китай-Россия. Премиальная логистика, соединяющая производителей с глобальными рынками с точностью 99.7% и поддержкой 24/7.',
          services: 'Комплексные логистические услуги: тяжёлые грузы, технологические грузы, fashion линии, оборудование, юридическая сертификация, консолидация, опасные материалы, холодовая цепь и перевозка искусства.',
          about: 'Современный мост между Востоком и Западом. Объединяя историческую надёжность с передовой скоростью для бесшовных логистических операций Китай-Россия.',
          insights: 'Будьте в курсе последних тенденций логистики, торговых инсайтов и отраслевых разработок в коридорах торговли Китай-Россия.',
          tariffs: 'Прозрачное ценообразование для премиальных логистических услуг. Стандартные, бизнес и премиум планы с полной страховкой и выделенным менеджером по работе с клиентами.',
          contacts: 'Готовы оптимизировать цепочку поставок? Свяжитесь с нашими глобальными офисами в Шанхае, Москве и Дубае для индивидуальных логистических решений.'
        },
        zh: {
          home: '为中俄贸易提供精湛的海关解决方案。优质物流连接制造商与全球市场，准确率99.7%，提供24/7支持。',
          services: '全面物流服务：重型货物、科技货物、时尚专线、机械设备、法务认证、集运、危险品、冷链运输和高价值艺术品运输。',
          about: '连接东方与西方的现代桥梁。将历史可靠性与现代速度相结合，确保中俄物流业务无缝衔接。',
          insights: '及时了解中俄贸易走廊的最新物流趋势、贸易洞察和行业发展动态。',
          tariffs: '优质物流服务的透明定价。标准、商业和高级方案，提供全面保险和专属客户经理服务。',
          contacts: '准备好优化您的供应链了吗？联系我们在上海、莫斯科和迪拜的全球办公室，获取定制物流解决方案。'
        }
      };
      return descriptions[lang]?.[page] || descriptions.en.home;
    };

    const finalDescription = description || getDescription();
    updateMetaTag('description', finalDescription);

    // Open Graph tags
    const ogLocaleMap = { en: 'en_US', ru: 'ru_RU', zh: 'zh_CN' };
    const ogImageUrl = ogImage || `${baseDomain}/og-image-${lang}.jpg`;

    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:locale', ogLocaleMap[lang], true);
    updateMetaTag('og:site_name', 'Long Ying Logistics', true);
    updateMetaTag('og:image', ogImageUrl, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `Long Ying Logistics - ${page === 'home' ? 'Premium Logistics Solutions' : page.charAt(0).toUpperCase() + page.slice(1)}`, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', ogImageUrl);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('language', lang);
    updateMetaTag('geo.region', (lang as string) === 'zh' ? 'CN' : (lang as string) === 'ru' ? 'RU' : 'US');
    updateMetaTag('geo.placename', (lang as string) === 'zh' ? 'Shanghai' : (lang as string) === 'ru' ? 'Moscow' : 'New York');

  }, [lang, page, title, description, canonicalUrl, ogImage]);
};