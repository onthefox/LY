
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, Language } from '../types';
import { Car, Cpu, Scissors, Factory, Stamp, Boxes, FlaskConical, Snowflake, Diamond } from 'lucide-react';

export const DICTIONARY = {
  cn: {
    heroTitle: "龙盈物流",
    heroSub: "LONG YING",
    tagline: "为中俄贸易提供精湛的海关解决方案",
    taglineSub: "PREMIUM LOGISTICS SOLUTIONS",
    cta: "开始咨询",
    ctaSub: "START CONSULTATION",
    servicesTitle: "我们的服务",
    servicesSub: "OUR SERVICES",
    aboutTitle: "龙盈",
    aboutSub: "传承与未来",
    aboutDesc: "我们是连接东方与西方的现代桥梁。龙盈物流将历史的可靠性与现代的速度相结合，确保货物安全抵达。",
    tariffsTitle: "资费计划",
    tariffsSub: "TARIFFS & PLANS",
    contactTitle: "联系我们",
    contactSub: "CONTACT US",
    contactDesc: "准备好优化您的供应链了吗？请联系我们制定定制物流策略。",
    footerRights: "© 2025 龙盈物流 (Long Ying Logistics). 版权所有.",
    nav: {
      services: "服务",
      insights: "洞察",
      about: "关于",
      tariffs: "资费",
      contacts: "联系",
    },
    quote: "请求报价"
  },
  ru: {
    heroTitle: "LONG YING",
    heroSub: "LOGISTICS",
    tagline: "Премиальные логистические решения Китай-Россия",
    taglineSub: "EXQUISITE CUSTOMS SOLUTIONS",
    cta: "Начать консультацию",
    ctaSub: "START CONSULTATION",
    servicesTitle: "Наши услуги",
    servicesSub: "OUR SERVICES",
    aboutTitle: "НАСЛЕДИЕ",
    aboutSub: "LONG YING",
    aboutDesc: "Мы — современный мост между Востоком и Западом. Long Ying Logistics объединяет историческую надежность с современной скоростью.",
    tariffsTitle: "Тарифы",
    tariffsSub: "TARIFFS & PLANS",
    contactTitle: "Контакты",
    contactSub: "CONTACT US",
    contactDesc: "Готовы оптимизировать цепочку поставок? Свяжитесь с нами для разработки индивидуальной стратегии.",
    footerRights: "© 2025 Long Ying Logistics. Все права защищены.",
    nav: {
      services: "УСЛУГИ",
      insights: "ИНСАЙТЫ",
      about: "О НАС",
      tariffs: "ТАРИФЫ",
      contacts: "КОНТАКТЫ",
    },
    quote: "Заказать расчет"
  },
  en: {
    heroTitle: "LONG YING",
    heroSub: "LOGISTICS",
    tagline: "Exquisite Customs Solutions for China & Russia Trade",
    taglineSub: "PREMIUM SOLUTIONS",
    cta: "Start Consultation",
    ctaSub: "GET STARTED",
    servicesTitle: "Our Services",
    servicesSub: "LINEUP",
    aboutTitle: "THE LEGACY",
    aboutSub: "LONG YING",
    aboutDesc: "We are the modern bridge between East and West. Long Ying Logistics combines historical reliability with cutting-edge velocity.",
    tariffsTitle: "Tariffs & Plans",
    tariffsSub: "PRICING",
    contactTitle: "Contact Us",
    contactSub: "GET IN TOUCH",
    contactDesc: "Ready to optimize your supply chain? Reach out for a tailored logistics strategy.",
    footerRights: "© 2025 Long Ying Logistics. All Rights Reserved.",
    nav: {
      services: "SERVICES",
      insights: "INSIGHTS",
      about: "ABOUT",
      tariffs: "TARIFFS",
      contacts: "CONTACTS",
    },
    quote: "Request Quote"
  }
};

export const getServices = (lang: Language): ServiceItem[] => {
  const isCn = lang === 'cn';
  const isRu = lang === 'ru';
  
  return [
    { 
      id: '1', 
      name: isCn ? '汽车零部件' : (isRu ? 'Автозапчасти' : 'Auto Parts'), 
      category: isCn ? '重型物流' : (isRu ? 'Тяжелая логистика' : 'Heavy Logistics'), 
      deliveryTime: isCn ? '12-18 天' : (isRu ? '12-18 Дней' : '12-18 Days'), 
      // Image: Dark luxury car detail / mechanical art
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn 
        ? '零部件和单元的全面供应。从广州工厂到莫斯科仓库。我们要处理超大货物和集装箱运输。' 
        : (isRu ? 'Комплексная поставка запчастей и агрегатов. От заводов Гуанчжоу до складов Москвы.' : 'Comprehensive supply of spare parts and units. From Guangzhou factories to Moscow warehouses.'),
      icon: Car
    },
    { 
      id: '2', 
      name: isCn ? '电子产品' : (isRu ? 'Электроника' : 'Electronics'), 
      category: isCn ? '科技货物' : (isRu ? 'Технологии' : 'Tech Cargo'), 
      deliveryTime: isCn ? '8-12 天' : (isRu ? '8-12 Дней' : '8-12 Days'), 
      // Image: Abstract Circuit Board / High Tech Dark
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=800&auto=format&fit=crop'  
      ],
      description: isCn
        ? '芯片、电路板和成品电子产品的精心交付。特殊包装，100% 货物价值保险。'
        : (isRu ? 'Бережная доставка чипов, плат и готовой электроники. Страхование 100% стоимости.' : 'Careful delivery of chips, boards, and finished electronics. Special packaging.'),
      icon: Cpu
    },
    { 
      id: '3', 
      name: isCn ? '纺织品' : (isRu ? 'Текстиль' : 'Textiles'), 
      category: isCn ? '时尚专线' : (isRu ? 'Fashion Линия' : 'Fashion Line'), 
      deliveryTime: isCn ? '10-15 天' : (isRu ? '10-15 Дней' : '10-15 Days'), 
      // Image: Abstract Fabric / Silk / Fashion Dark
      image: 'https://images.unsplash.com/photo-1534149226767-172517df473d?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1534149226767-172517df473d?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '市场物流。面料、配饰和成品服装。协助标签和认证。'
        : (isRu ? 'Логистика для маркетплейсов. Ткани, фурнитура и готовая одежда.' : 'Logistics for marketplaces. Fabrics, accessories, and finished clothing.'),
      icon: Scissors
    },
    { 
      id: '4', 
      name: isCn ? '工业设备' : (isRu ? 'Промышленность' : 'Industrial'), 
      category: isCn ? '机械' : (isRu ? 'Оборудование' : 'Machinery'), 
      deliveryTime: isCn ? '15-25 天' : (isRu ? '15-25 Дней' : '15-25 Days'), 
      // Image: Cinematic Industrial Arm / Machinery
      image: 'https://images.unsplash.com/photo-1531297461136-82lw8c2780e?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1531297461136-82lw8c2780e?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '机床、生产线和重型机械的供应。专业外贸咨询。'
        : (isRu ? 'Поставка станков, производственных линий и тяжелой техники.' : 'Supply of machine tools, production lines, and heavy machinery.'),
      icon: Factory
    },
    { 
      id: '5', 
      name: isCn ? '认证服务' : (isRu ? 'Сертификация' : 'Certification'), 
      category: isCn ? '法务' : (isRu ? 'Юридические' : 'Legal'), 
      deliveryTime: isCn ? '5-10 天' : (isRu ? '5-10 Дней' : '5-10 Days'), 
      // Image: Pen / Document / Lawyer - moody
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
      gallery: [
         'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop', 
         'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop', 
         'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '处理货物清关所需的所有必要文件和合格证书。'
        : (isRu ? 'Оформление всех необходимых документов и сертификатов соответствия.' : 'Processing of all necessary documents and certificates of conformity.'),
      icon: Stamp
    },
    { 
      id: '6', 
      name: isCn ? '拼箱运输' : (isRu ? 'Сборные грузы' : 'LCL Shipping'), 
      category: isCn ? '集运' : (isRu ? 'Консолидация' : 'Consolidation'), 
      deliveryTime: isCn ? '15-20 天' : (isRu ? '15-20 Дней' : '15-20 Days'), 
      // Image: Containers / Warehouse - moody
      image: 'https://images.unsplash.com/photo-1494412651409-ae1e21b16126?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1494412651409-ae1e21b16126?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '在义乌和广州的自有仓库进行货物集运。小企业的最佳解决方案。'
        : (isRu ? 'Консолидация грузов на собственных складах в Иу и Гуанчжоу.' : 'Cargo consolidation at our own warehouses in Yiwu and Guangzhou.'),
      icon: Boxes
    },
    { 
      id: '7', 
      name: isCn ? '化学品物流' : (isRu ? 'Химическая логистика' : 'Chemical Logistics'), 
      category: isCn ? '危险品' : (isRu ? 'Опасные грузы' : 'Hazardous'), 
      deliveryTime: isCn ? '18-25 天' : (isRu ? '18-25 Дней' : '18-25 Days'), 
      // Image: Lab / Abstract Chemical
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1581093458791-9f3039101d04?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1605557202138-097824c3f5c4?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '危险品、液体和散装化学品的合规运输。ISO 储罐和专业文件。'
        : (isRu ? 'Лицензированная перевозка опасных грузов, жидкостей и наливной химии. ISO-танки.' : 'Certified transport of hazardous materials, liquids, and bulk chemicals. ISO tanks.'),
      icon: FlaskConical
    },
    { 
      id: '8', 
      name: isCn ? '冷链物流' : (isRu ? 'Холодовая цепь' : 'Cold Chain'), 
      category: isCn ? '温控运输' : (isRu ? 'Температурный режим' : 'Temperature'), 
      deliveryTime: isCn ? '10-14 天' : (isRu ? '10-14 Дней' : '10-14 Days'), 
      // Image: Frost / Ice / Cold Storage
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1516937941348-c09645f31e3d?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '为易腐食品和药品提供温控解决方案。全程温度监控。'
        : (isRu ? 'Температурные перевозки для скоропортящихся продуктов и фармацевтики. Мониторинг 24/7.' : 'Temperature-controlled solutions for perishables and pharmaceuticals. Continuous monitoring.'),
      icon: Snowflake
    },
    { 
      id: '9', 
      name: isCn ? '艺术品运输' : (isRu ? 'Перевозка искусства' : 'Fine Art'), 
      category: isCn ? '高价值' : (isRu ? 'Ценные грузы' : 'High Value'), 
      deliveryTime: isCn ? '5-7 天' : (isRu ? '5-7 Дней' : '5-7 Days'), 
      // Image: Gold / Statue / Museum
      image: 'https://images.unsplash.com/photo-1572935633135-caed67dbea64?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1572935633135-caed67dbea64?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=800&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=800&auto=format&fit=crop'
      ],
      description: isCn
        ? '博物馆级古董和艺术品处理。气候控制包装和武装押运。'
        : (isRu ? 'Музейный уровень обработки антиквариата. Климат-контроль и вооруженная охрана.' : 'Museum-grade handling for antiques and fine art. Climate-controlled packaging and secure escort.'),
      icon: Diamond
    }
  ];
};
