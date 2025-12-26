import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('servicesTitle')} description={t('servicesSub')} />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-heading text-[#D4A55F] mb-8">{t('servicesTitle')}</h1>
        <p>{t('servicesSub')}</p>
        {/* Content will be migrated from Home.tsx's Services section */}
      </div>
    </>
  );
};

export default Services;