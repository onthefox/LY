import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { Globe, Zap, Anchor } from 'lucide-react';
import { Language } from '../types';

interface Feature {
  icon: React.ComponentType<any>;
  title: Record<Language, string>;
  desc: Record<Language, string>;
}

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const features: Feature[] = [
    {
      icon: Globe,
      title: { zh: '全球连接', en: 'Global Bridge', ru: 'Глобальный мост' },
      desc: { zh: '连接中国制造商与俄罗斯市场', en: 'Connecting Markets', ru: 'Связь рынков' }
    },
    {
      icon: Zap,
      title: { zh: '现代速度', en: 'Velocity', ru: 'Скорость' },
      desc: { zh: '最快交付时间的先进算法', en: 'Advanced routing', ru: 'Продвинутые маршруты' }
    },
    {
      icon: Anchor,
      title: { zh: '安全贸易', en: 'Secure Trade', ru: 'Безопасность' },
      desc: { zh: '100% 货物保险与安全', en: 'Full insurance', ru: 'Страхование грузов' }
    },
  ];

  return (
    <>
      <SEO title={t('aboutTitle')} description={t('aboutSub')} />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading text-[#D4A55F] mb-4">
              {t('aboutTitle')}
            </h1>
            <h2 className="text-3xl font-heading text-white mb-8">{t('aboutSub')}</h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light mb-8">
              {t('aboutDesc')}
            </p>
            
            <div className="grid grid-cols-1 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-[#E60012]/10 rounded-full text-[#E60012]">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-white">{feature.title[lang]}</h3>
                    <p className="text-sm text-gray-500">{feature.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 border-2 border-[#E60012]/20 translate-x-4 translate-y-4" />
            <img
              src="https://images.unsplash.com/photo-1513506003011-3b3215099b8e?q=80&w=800&auto=format&fit=crop"
              alt="Modern Architecture"
              loading="lazy"
              decoding="async"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
