import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Insights: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('nav.insights')} description="Logistics Insights & Industry News" />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-heading text-[#D4A55F] mb-8">{t('nav.insights')}</h1>
        <p>Insights content coming soon...</p>
      </div>
    </>
  );
};

export default Insights;