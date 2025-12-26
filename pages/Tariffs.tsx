import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Tariffs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('tariffsTitle')} description={t('tariffsSub')} />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-heading text-[#D4A55F] mb-8">{t('tariffsTitle')}</h1>
        <p>{t('tariffsSub')}</p>
        {/* Content will be migrated from Home.tsx's Tariffs section */}
      </div>
    </>
  );
};

export default Tariffs;