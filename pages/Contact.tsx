import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { MapPin, Mail, QrCode } from 'lucide-react';
import { Suspense } from 'react';
import ContactForm from '../components/ContactForm';

const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center text-white/20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E60012]"></div>
  </div>
);

const Contact: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('contactTitle')} description={t('contactSub')} />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-heading text-[#D4A55F] mb-12 text-center">
          {t('contactTitle')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Area */}
          <div className="lg:col-span-2 bg-[#0a0b14] border border-white/10 p-1">
            <Suspense fallback={<SectionLoader />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Info & WeChat Area */}
          <div className="space-y-8">
            {/* WeChat Card */}
            <div className="bg-[#0a0b14] border border-white/10 p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-heading text-white mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#E60012]"/> Connect on WeChat
              </h3>
              <div className="bg-white p-2 w-48 h-48 mb-4">
                {/* Placeholder QR Code visual */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white"/>
                    <path d="M10 10 h30 v30 h-30 z M60 10 h30 v30 h-30 z M10 60 h30 v30 h-30 z" fill="black"/>
                    <rect x="45" y="45" width="10" height="10" fill="black"/>
                    <path d="M20 20 h10 v10 h-10 z M70 20 h10 v10 h-10 z M20 70 h10 v10 h-10 z" fill="white"/>
                </svg>
              </div>
              <p className="text-xs text-gray-500">Scan to add LYL Support</p>
            </div>

            {/* Office Info */}
            <div className="bg-[#0a0b14] border border-white/10 p-8">
              <h3 className="text-xl font-heading text-white mb-6">Global Offices</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#E60012] mt-1"/>
                  <div>
                    <div className="font-bold text-white text-sm uppercase">Shanghai HQ</div>
                    <div className="text-gray-500 text-xs">No. 8 Century Avenue, Pudong</div>
                    <div className="text-[#FFD70] text-xs mt-1">+86 21 6888 8888</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#E60012] mt-1"/>
                  <div>
                    <div className="font-bold text-white text-sm uppercase">Moscow Branch</div>
                    <div className="text-gray-500 text-xs">Presnenskaya Nab 12</div>
                    <div className="text-[#FFD70] text-xs mt-1">+7 (495) 000-00-00</div>
                  </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#E60012] mt-1"/>
                  <div>
                    <div className="font-bold text-white text-sm uppercase">Partnerships</div>
                    <div className="text-gray-500 text-xs">vip@longying.ru</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;