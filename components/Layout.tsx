import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LongYingLogo from './LongYingLogo';
import StickyFooter from './StickyFooter';
import { Language } from '../types';
import RunnerLine from './RunnerLine';

import React from 'react';

// Lantern Component for CNY Decoration
const Lantern = React.memo(({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute z-50 pointer-events-none origin-top ${className ?? ''}`}
    initial={{ rotate: -5, y: -2 }}
    animate={{ rotate: 5, y: 0 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }}
  >
    <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-lg filter">
      {/* String */}
      <line x1="20" y1="0" x2="20" y2="15" stroke="#FFD70" strokeWidth="1.5" />
      
      {/* Body */}
      <path d="M10 15 H30 A5 5 0 1 35 20 V45 A5 5 0 0 1 30 50 H10 A5 5 0 0 1 5 45 V20 A5 5 0 0 1 10 15 Z" fill="#E60012" stroke="#FFD700" strokeWidth="1.5" />
      
      {/* Ribs */}
      <path d="M5 25 H35" stroke="#7c00" strokeWidth="0.5" />
      <path d="M5 40 H35" stroke="#7c0000" strokeWidth="0.5" />
      <path d="M20 15 V50" stroke="#7c0000" strokeWidth="0.5" />
      
      {/* Tassel Header */}
      <rect x="16" y="50" width="8" height="4" fill="#FFD700" />
      
      {/* Tassels */}
      <motion.line x1="18" y1="54" x2="18" y2="70" stroke="#E60012" strokeWidth="1.5" animate={{ x2: [18, 16, 18] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      <motion.line x1="22" y1="54" x2="22" y2="68" stroke="#E60012" strokeWidth="1.5" animate={{ x2: [22, 24, 22] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
      
      {/* Glow */}
      <circle cx="20" cy="32" r="8" fill="url(#lantern-glow)" fillOpacity="0.4" />
      <defs>
        <radialGradient id="lantern-glow">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  </motion.div>
));

function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
 const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    // In a real app with localized routes, you'd navigate to the new locale path here
 };

  const navLinks = [
    { key: 'services', path: '/services' },
    { key: 'insights', path: '/insights' },
    { key: 'about', path: '/about' },
    { key: 'tariffs', path: '/tariffs' },
    { key: 'contacts', path: '/contacts' },
  ];

  return (
    <div className="relative min-h-screen text-[#E6E6E6] selection:bg-[#D4A55F] selection:text-[#0A1A2F] font-sans bg-[#0a0b14]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-[#0A1A2F]/95 to-transparent backdrop-blur-sm border-b border-[#D4A55F]/20">
        
        {/* CNY Decoration Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* Left Lanterns */}
             <Lantern className="top-[-5px] left-16 md:left-32" delay={0} />
             <Lantern className="top-[-10px] left-8 md:left-20 scale-75 blur-[1px]" delay={1.5} />
             
             {/* Right Lanterns */}
             <Lantern className="top-[-5px] right-16 md:right-32" delay={0.5} />
             <Lantern className="top-[-10px] right-8 md:right-20 scale-75 blur-[1px]" delay={2} />
        </div>

        <div 
          className="flex items-center gap-3 cursor-pointer group z-10" 
          onClick={() => navigate('/')}
        >
             <LongYingLogo variant="flat" className="text-[#D4A55F] group-hover:scale-110 transition-transform" />
             <div className="flex flex-col">
               <div className="flex flex-col">
                 <span className="font-heading text-lg md:text-xl font-bold tracking-wide text-[#D4A55F] leading-none group-hover:text-white transition-colors">
                   Long Ying Logistics
                 </span>
                 <span className="font-heading text-sm text-[#D4A55F]/80 group-hover:text-white/90 transition-colors tracking-tight">
                   （龙盈物流）
                 </span>
               </div>
             </div>
           </div>
        
        {/* Language Switcher - Prominent */}
        <div className="flex items-center gap-4 z-10">
          <div className="hidden md:flex gap-1 bg-[#121F2C]/50 p-1 rounded-full border border-[#D4A55F]/30">
            {(['zh', 'en', 'ru'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${
                  i18n.language === l ? 'bg-[#D4A55F] text-[#0A1A2F]' : 'text-[#E6E6E6]/70 hover:text-[#E6E6E6]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 ml-8">
            {navLinks.map((link) => (
                <button 
                    key={link.key}
                    onClick={() => navigate(link.path)} 
                    className="text-xs font-bold tracking-widest hover:text-[#D4A55F] transition-colors"
                >
                    {t(`nav.${link.key}`)}
                </button>
            ))}
          </div>

           {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#D4A55F] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-[#121F2C] flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Mobile Lang Switch */}
            <div className="flex gap-4 mb-8">
              {(['zh', 'en', 'ru'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-4 py-2 rounded border ${
                    i18n.language === l ? 'border-[#D4A55F] text-[#D4A55F]' : 'border-[#E6E6E6]/30 text-[#E6E6E6]/70'
                  } uppercase font-bold`}
                >
                  {l}
                </button>
              ))}
            </div>

            {navLinks.map((link) => (
                <button 
                    key={link.key}
                    onClick={() => {
                        navigate(link.path);
                        setMobileMenuOpen(false);
                    }} 
                    className="text-2xl font-heading text-[#E6E6E6] hover:text-[#D4A55F] transition-colors"
                >
                    {t(`nav.${link.key}`)}
                </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transition */}
      <main className="pt-[100px]">
        <RunnerLine />
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black pb-32">
        {/* Decorative Border Top */}
        <div className="w-full h-1 bg-gradient-to-r from-[#E60012] via-[#FFD700] to-[#E60012] shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
        
        {/* Year of Snake Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="bg-black px-4 py-1">
             <div className="bg-[#151725] border-[#FFD700]/40 px-6 py-1 rounded-full text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
               <span>Year of the Snake</span>
               <span className="text-white/50">•</span>
               <span>2025</span>
             </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 flex-col md:flex-row justify-between items-center gap-8 mt-4">
          <div className="text-center md:text-left">
             <div className="font-heading text-2xl font-bold tracking-wide text-[#D4A55F] mb-1">Long Ying Logistics</div>
             <div className="font-heading text-lg text-[#D4A55F]/80 mb-2">（龙盈物流）</div>
             <div className="text-xs font-mono text-[#E6E6E6]/60">
               <span>{t('footerRights')}</span>
               <div className="mt-1 text-[10px] text-[#D4A55F]/70">
                 沪ICP备202301234号
               </div>
             </div>
           </div>
           
           <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" className="w-6 h-6" alt="Telegram" loading="lazy" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" className="w-6 h-6" alt="Instagram" loading="lazy" />
           </div>
         </div>
       </footer>
      
      <StickyFooter />
    </div>
  );
};

export default Layout;
