import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Language } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  page?: string; // 'home', 'services', 'about', 'insights', 'tariffs', 'contacts'
  canonicalUrl?: string;
}

const SEO: React.FunctionComponent<SEOProps> = (props: SEOProps) => {
  const { title, description, image, type = 'website', page = 'home', canonicalUrl } = props;
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language as Language;
  
  // Type-safe destructuring
  const seoProps: SEOProps = { title, description, image, type, page, canonicalUrl };
  const { title: titleProp, description: descriptionProp, image: imageProp, canonicalUrl: canonicalUrlProp } = seoProps;
  
  const siteName = 'Long Ying Logistics';
  const baseDomain = 'https://longyinglogistics.com';
  const currentPath = location.pathname;
  const currentUrl = canonicalUrl || `${baseDomain}${currentPath}`;
  
  // Default metadata by page and language
  const getDefaultMetadata = () => {
    const metadata: Record<Language, Record<string, { title: string; description: string }>> = {
      en: {
        home: {
          title: 'Long Ying Logistics | Premium China-Russia Trade Solutions',
          description: 'Exquisite customs solutions for China-Russia trade. Premium logistics connecting manufacturers to global markets with 99.7% accuracy and 24/7 support.'
        },
        services: {
          title: 'Logistics Services | Long Ying Logistics',
          description: 'Comprehensive logistics services: heavy cargo, tech cargo, fashion lines, machinery, legal certification, consolidation, hazardous materials, cold chain, and fine art transport.'
        },
        about: {
          title: 'About Long Ying Logistics | Heritage & Innovation',
          description: 'Modern bridge between East and West. Combining historical reliability with cutting-edge velocity for seamless China-Russia logistics operations.'
        },
        insights: {
          title: 'Logistics Insights & Industry News | Long Ying Logistics',
          description: 'Stay informed with the latest logistics trends, trade insights, and industry developments in China-Russia trade corridors.'
        },
        tariffs: {
          title: 'Pricing & Tariffs | Long Ying Logistics',
          description: 'Transparent pricing for premium logistics services. Standard, Business, and Premium plans with full insurance and dedicated account management.'
        },
        contacts: {
          title: 'Contact Long Ying Logistics | Get Started Today',
          description: 'Ready to optimize your supply chain? Contact our global offices in Shanghai, Moscow, and Dubai for tailored logistics solutions.'
        }
      },
      ru: {
        home: {
          title: 'Long Ying Logistics | Премиальные логистические решения Китай-Россия',
          description: 'Изысканные таможенные решения для торговли Китай-Россия. Премиальная логистика, соединяющая производителей с глобальными рынками с точностью 99.7% и поддержкой 24/7.'
        },
        services: {
          title: 'Логистические услуги | Long Ying Logistics',
          description: 'Комплексные логистические услуги: тяжёлые грузы, технологические грузы, fashion линии, оборудование, юридическая сертификация, консолидация, опасные материалы, холодовая цепь и перевозка искусства.'
        },
        about: {
          title: 'О компании Long Ying Logistics | Наследие и инновации',
          description: 'Современный мост между Востоком и Западом. Объединяя историческую надёжность с передовой скоростью для бесшовных логистических операций Китай-Россия.'
        },
        insights: {
          title: 'Логистические инсайты и новости отрасли | Long Ying Logistics',
          description: 'Будьте в курсе последних тенденций логистики, торговых инсайтов и отраслевых разработок в коридорах торговли Китай-Россия.'
        },
        tariffs: {
          title: 'Цены и тарифы | Long Ying Logistics',
          description: 'Прозрачное ценообразование для премиальных логистических услуг. Стандартные, бизнес и премиум планы с полной страховкой и выделенным менеджером по работе с клиентами.'
        },
        contacts: {
          title: 'Контакты Long Ying Logistics | Начните сегодня',
          description: 'Готовы оптимизировать цепочку поставок? Свяжитесь с нашими глобальными офисами в Шанхае, Москве и Дубае для индивидуальных логистических решений.'
        }
      },
      zh: {
        home: {
          title: '龙盈物流 | 中俄贸易优质解决方案',
          description: '为中俄贸易提供精湛的海关解决方案。优质物流连接制造商与全球市场，准确率99.7%，提供24/7支持。'
        },
        services: {
          title: '物流服务 | 龙盈物流',
          description: '全面物流服务：重型货物、科技货物、时尚专线、机械设备、法务认证、集运、危险品、冷链运输和高价值艺术品运输。'
        },
        about: {
          title: '关于龙盈物流 | 传承与创新',
          description: '连接东方与西方的现代桥梁。将历史可靠性与现代速度相结合，确保中俄物流业务无缝衔接。'
        },
        insights: {
          title: '物流洞察与行业资讯 | 龙盈物流',
          description: '及时了解中俄贸易走廊的最新物流趋势、贸易洞察和行业发展动态。'
        },
        tariffs: {
          title: '资费标准 | 龙盈物流',
          description: '优质物流服务的透明定价。标准、商业和高级方案，提供全面保险和专属客户经理服务。'
        },
        contacts: {
          title: '联系龙盈物流 | 立即开始',
          description: '准备好优化您的供应链了吗？联系我们在上海、莫斯科和迪拜的全球办公室，获取定制物流解决方案。'
        }
      }
    };

    const langMetadata = metadata[lang];
    if (langMetadata && page && langMetadata[page]) {
      return langMetadata[page];
    }
    
    return {
      title: t('heroTitle') || siteName,
      description: t('tagline') || 'Premium logistics solutions for China-Russia trade'
    };
  };

  const defaultMeta = getDefaultMetadata();
  const metaTitle = title || defaultMeta.title;
  const metaDescription = description || defaultMeta.description;
  const defaultImage = `${baseDomain}/og-image-${lang}.jpg`;
  const metaImage = image || defaultImage;

  // Generate hreflang URLs
  const generateHreflangUrls = () => {
    const pages = ['home', 'services', 'about', 'insights', 'tariffs', 'contacts'];
    const hreflangs: { [key: string]: string } = {};

    pages.forEach(p => {
      const enPath = p === 'home' ? '' : `/${p}`;
      const ruPath = p === 'home' ? '/ru' : `/ru/${p}`;
      const zhPath = p === 'home' ? '/zh' : `/zh/${p}`;

      hreflangs[`en-${p}`] = `${baseDomain}${enPath}`;
      hreflangs[`ru-${p}`] = `${baseDomain}${ruPath}`;
      hreflangs[`zh-${p}`] = `${baseDomain}${zhPath}`;
    });

    return hreflangs;
  };

  const hreflangUrls = generateHreflangUrls();
  
  // Language mapping for Open Graph
  const ogLocaleMap = {
    en: 'en_US',
    ru: 'ru_RU',
    zh: 'zh_CN'
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />
      <html lang={lang} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - ${page === 'home' ? 'Premium Logistics Solutions' : page.charAt(0).toUpperCase() + page.slice(1)}`} />
      <meta property="og:locale" content={ogLocaleMap[lang] || 'en_US'} />
      
      {/* Additional Open Graph locales */}
      {lang !== 'en' && <meta property="og:locale:alternate" content="en_US" />}
      {lang !== 'ru' && <meta property="og:locale:alternate" content="ru_RU" />}
      {lang !== 'zh' && <meta property="og:locale:alternate" content="zh_CN" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Hreflang Tags (Dynamic based on current path) */}
      <link rel="alternate" hreflang="en" href={hreflangUrls[`en-${page}`]} />
      <link rel="alternate" hreflang="ru" href={hreflangUrls[`ru-${page}`]} />
      <link rel="alternate" hreflang="zh" href={hreflangUrls[`zh-${page}`]} />
      <link rel="alternate" hreflang="x-default" href={hreflangUrls[`en-${page}`]} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content={lang} />
      <meta name="geo.region" content={lang === 'zh' ? 'CN' : lang === 'ru' ? 'RU' : 'US'} />
      <meta name="geo.placename" content={lang === 'zh' ? 'Shanghai' : lang === 'ru' ? 'Moscow' : 'New York'} />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        key="structured-data"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Long Ying Logistics",
          "alternateName": "龙盈物流",
          "url": baseDomain,
          "logo": `${baseDomain}/logo.svg`,
          "description": metaDescription,
          "address": [
            {
              "@type": "PostalAddress",
              "addressCountry": "CN",
              "addressLocality": "Shanghai",
              "streetAddress": "No. 88 Century Avenue, Pudong"
            },
            {
              "@type": "PostalAddress",
              "addressCountry": "RU",
              "addressLocality": "Moscow",
              "streetAddress": "Presnenskaya Nab 12"
            }
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+86-21-6888-8888",
              "contactType": "customer service",
              "areaServed": "CN",
              "availableLanguage": "zh"
            },
            {
              "@type": "ContactPoint",
              "telephone": "+7-495-000-00-00",
              "contactType": "customer service",
              "areaServed": "RU",
              "availableLanguage": "ru"
            }
          ],
          "sameAs": [
            "https://www.linkedin.com/company/long-ying-logistics",
            "https://www.facebook.com/longyinglogistics",
            "https://www.instagram.com/longyinglogistics"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;