
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Globe, Zap, Box, MapPin, Menu, X, Phone, Mail, Layers, Truck, Cpu, Scissors, Wrench, Stamp, Boxes, FlaskConical, Snowflake, Diamond, Loader2, Star, CheckCircle, Award, ShieldCheck, FileText, QrCode } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import ArtistCard from './components/ArtistCard';
import HeroCarousel from './components/HeroCarousel';
import { ServiceItem, Language } from './types';
import { DICTIONARY, getServices } from './data/constants';

// Lazy Load heavy components
const AIChat = React.lazy(() => import('./components/AIChat'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));
const ServiceModal = React.lazy(() => import('./components/ServiceModal'));
const StickyFooter = React.lazy(() => import('./components/StickyFooter'));

// Fallback loader
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center text-white/20">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'All': Layers,
  'Heavy Logistics': Truck,
  '重型物流': Truck,
  'Тяжелая логистика': Truck,
  'Tech Cargo': Cpu,
  '科技货物': Cpu,
  'Технологии': Cpu,
  'Fashion Line': Scissors,
  '时尚专线': Scissors,
  'Fashion Линия': Scissors,
  'Machinery': Wrench,
  '机械': Wrench,
  'Оборудование': Wrench,
  'Legal': Stamp,
  '法务': Stamp,
  'Юридические': Stamp,
  'Consolidation': Boxes,
  '集运': Boxes,
  'Консолидация': Boxes,
  'Hazardous': FlaskConical,
  '危险品': FlaskConical,
  'Опасные грузы': FlaskConical,
  'Temperature': Snowflake,
  '温控运输': Snowflake,
  'Температурный режим': Snowflake,
  'High Value': Diamond,
  '高价值': Diamond,
  'Ценные грузы': Diamond
};

// --- Custom Logo Component (Double-Headed Dragon/Eagle Shield) ---
const LongYingLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className} 
    fill="currentColor"
    aria-label="Long Ying Dragon Logo"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E60012" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#E60012" />
      </linearGradient>
    </defs>
    
    {/* Shield Base */}
    <path d="M100 180 L40 150 V60 L100 30 L160 60 V150 Z" fill="none" stroke="url(#logoGradient)" strokeWidth="4" />
    
    {/* Double Heads (Abstract) */}
    <path d="M70 60 C50 60 40 80 50 100" stroke="url(#logoGradient)" strokeWidth="3" fill="none"/>
    <path d="M130 60 C150 60 160 80 150 100" stroke="url(#logoGradient)" strokeWidth="3" fill="none"/>
    
    {/* Wings */}
    <path d="M50 100 L20 80 M50 110 L20 90 M50 120 L20 100" stroke="url(#logoGradient)" strokeWidth="2" />
    <path d="M150 100 L180 80 M150 110 L180 90 M150 120 L180 100" stroke="url(#logoGradient)" strokeWidth="2" />

    {/* Central Pillar/Core */}
    <rect x="90" y="50" width="20" height="100" fill="url(#logoGradient)" opacity="0.8" />
    <circle cx="100" cy="100" r="15" fill="#0a0b14" stroke="url(#logoGradient)" strokeWidth="2" />
  </svg>
);

// --- Chinese New Year Components ---

const Lantern: React.FC<{ className?: string; delay?: number }> = React.memo(({ className, delay = 0 }) => (
  <motion.div
    className={`absolute z-50 pointer-events-none origin-top ${className}`}
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
      <line x1="20" y1="0" x2="20" y2="15" stroke="#FFD700" strokeWidth="1.5" />
      
      {/* Body */}
      <path d="M10 15 H30 A5 5 0 0 1 35 20 V45 A5 5 0 0 1 30 50 H10 A5 5 0 0 1 5 45 V20 A5 5 0 0 1 10 15 Z" fill="#E60012" stroke="#FFD700" strokeWidth="1.5" />
      
      {/* Ribs */}
      <path d="M5 25 H35" stroke="#7c0000" strokeWidth="0.5" />
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

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('cn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // Filtering
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Data derived from language state
  const t = DICTIONARY[lang];
  const services = getServices(lang);
  
  // Calculate categories based on current language services
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  // Reset category when language changes to avoid mismatch
  useEffect(() => {
    setActiveCategory('All');
  }, [lang]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Use window.scrollTo for precise control over offset (fixed header)
      const headerOffset = 100; // Approximately the height of the fixed navbar + breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    // Changed: Removed scroll snapping (snap-y) and fixed height. 
    // Uses native window scroll for better performance ("laggy" fix).
    <div className="relative min-h-screen text-white selection:bg-[#E60012] selection:text-white font-serif bg-[#0a0b14]">
      <FluidBackground />
      
      <Suspense fallback={null}>
        <AIChat />
      </Suspense>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-[#0a0b14]/95 to-transparent backdrop-blur-sm border-b border-white/5">
        
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
          onClick={() => scrollToSection('hero')}
        >
             <LongYingLogo className="w-12 h-12 text-[#E60012] group-hover:text-white transition-colors" />
             <div className="flex flex-col">
               <div className="flex items-center gap-2">
                 <span className="font-heading text-xl md:text-2xl font-bold tracking-wide text-[#FFD700] leading-none group-hover:text-white transition-colors">LONG YING</span>
                 <span className="font-heading text-lg text-[#E60012] group-hover:text-white transition-colors tracking-tighter">龙盈物流</span>
               </div>
               <span className="font-heading text-[10px] md:text-xs text-white/80 tracking-widest leading-none mt-1 uppercase">
                 Premium Logistics
               </span>
             </div>
        </div>
        
        {/* Language Switcher - Prominent */}
        <div className="flex items-center gap-4 z-10">
          <div className="hidden md:flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {(['cn', 'en', 'ru'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${
                  lang === l ? 'bg-[#E60012] text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 ml-8">
            <button onClick={() => scrollToSection('services')} className="text-xs font-bold tracking-widest hover:text-[#FFD700] transition-colors">{t.nav.services}</button>
            <button onClick={() => scrollToSection('insights')} className="text-xs font-bold tracking-widest hover:text-[#FFD700] transition-colors">{t.nav.insights}</button>
            <button onClick={() => scrollToSection('about')} className="text-xs font-bold tracking-widest hover:text-[#FFD700] transition-colors">{t.nav.about}</button>
            <button onClick={() => scrollToSection('tariffs')} className="text-xs font-bold tracking-widest hover:text-[#FFD700] transition-colors">{t.nav.tariffs}</button>
            <button onClick={() => scrollToSection('contacts')} className="text-xs font-bold tracking-widest hover:text-[#FFD700] transition-colors">{t.nav.contacts}</button>
          </div>

           {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#E60012] p-2"
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
            className="fixed inset-0 z-30 bg-[#121420] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Mobile Lang Switch */}
            <div className="flex gap-4 mb-8">
              {(['cn', 'en', 'ru'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded border ${
                    lang === l ? 'border-[#E60012] text-[#E60012]' : 'border-white/20 text-white/50'
                  } uppercase font-bold`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button onClick={() => scrollToSection('services')} className="text-2xl font-heading text-white hover:text-[#FFD700] transition-colors">{t.nav.services}</button>
            <button onClick={() => scrollToSection('insights')} className="text-2xl font-heading text-white hover:text-[#FFD700] transition-colors">{t.nav.insights}</button>
            <button onClick={() => scrollToSection('about')} className="text-2xl font-heading text-white hover:text-[#FFD700] transition-colors">{t.nav.about}</button>
            <button onClick={() => scrollToSection('tariffs')} className="text-2xl font-heading text-white hover:text-[#FFD700] transition-colors">{t.nav.tariffs}</button>
            <button onClick={() => scrollToSection('contacts')} className="text-2xl font-heading text-white hover:text-[#FFD700] transition-colors">{t.nav.contacts}</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <HeroCarousel />

        <div className="z-10 text-center flex flex-col items-center w-full max-w-7xl pb-12 relative mt-12">
          <div className="relative w-full flex flex-col justify-center items-center mb-6">
            <GradientText 
              text={t.heroTitle} 
              as="h1" 
              className="text-[12vw] md:text-[8vw] leading-[1] font-heading font-normal tracking-tight text-center drop-shadow-2xl text-[#E60012]" 
            />
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-2xl font-sans tracking-[0.5em] text-white/60 mt-4 uppercase"
            >
              {t.heroSub}
            </motion.h2>
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-24 h-1 bg-[#E60012] mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center gap-2 max-w-3xl mx-auto px-4 text-center"
          >
            <p className="text-lg md:text-2xl font-heading text-[#FFD700] mb-2">
              {t.tagline}
            </p>
            <p className="text-xs md:text-sm font-sans text-white/50 tracking-widest uppercase">
              {t.taglineSub}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 group relative px-10 py-4 bg-[#4a0000] border border-[#E60012] overflow-hidden hover:bg-[#E60012] transition-colors"
            onClick={() => scrollToSection('contacts')}
          >
             <div className="relative z-10 flex flex-col items-center">
               <span className="text-base font-bold text-[#FFD700] tracking-[0.1em] uppercase group-hover:text-white transition-colors">{t.cta}</span>
               <span className="text-[10px] text-[#FFD700]/70 mt-1 tracking-widest group-hover:text-white/80 transition-colors uppercase">{t.ctaSub}</span>
             </div>
          </motion.button>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <motion.section 
        id="services" 
        className="relative z-10 py-24 md:py-32 flex flex-col justify-center bg-[#0a0b14]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full">
          <div className="flex flex-col items-center mb-16 text-center">
             <h2 className="text-4xl md:text-6xl font-heading text-[#E60012] mb-2">
              {t.servicesTitle}
            </h2>
             <p className="text-white/40 text-sm tracking-[0.3em] uppercase">{t.servicesSub}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Layers;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`group flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${
                    isActive
                    ? 'border-[#E60012] text-white bg-[#E60012] shadow-[0_0_20px_rgba(230,0,18,0.4)]' 
                    : 'border-white/10 text-white/50 hover:text-[#FFD700] hover:border-[#FFD700]/30 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {cat === 'All' ? (lang === 'cn' ? '全部' : (lang === 'ru' ? 'Все' : 'All')) : cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ArtistCard key={service.id} artist={service} onClick={() => setSelectedService(service)} />
              ))}
          </div>
        </div>
      </motion.section>

      {/* TRACKING SECTION (From HTML Logic) */}
      <section className="py-24 bg-[#121420] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-heading text-[#E60012] mb-4">Real-Time Tracking</h2>
             <p className="text-white/40 tracking-widest text-sm uppercase">Monitor your shipments 24/7</p>
          </div>
          
          <div className="bg-[#151725] border border-white/10 p-8 md:p-12 relative overflow-hidden rounded-sm">
             <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
               {/* Visual Route */}
               <div className="w-full md:w-2/3 mb-8 md:mb-0 relative py-8">
                  <div className="h-1 bg-white/10 absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>
                  <div className="h-1 bg-[#E60012] absolute top-1/2 left-0 w-1/2 -translate-y-1/2 box-shadow-[0_0_10px_#E60012]"></div>
                  
                  <div className="flex justify-between items-center relative">
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 bg-[#E60012] rounded-full border-4 border-[#151725] relative z-10"></div>
                        <span className="text-xs font-bold text-[#E60012]">SHG</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 relative">
                        <div className="w-8 h-8 bg-[#E60012] rounded-full flex items-center justify-center text-black font-bold relative z-10 animate-pulse">
                           <Globe className="w-4 h-4"/>
                        </div>
                        <span className="text-xs font-bold text-white">In Transit</span>
                        <div className="absolute -top-8 text-[10px] bg-white/10 px-2 py-1 rounded text-[#FFD700] border border-[#E60012]/30">Dubai Customs</div>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 bg-white/20 rounded-full border-4 border-[#151725] relative z-10"></div>
                        <span className="text-xs font-bold text-white/50">NYC</span>
                     </div>
                  </div>
               </div>

               {/* Stats */}
               <div className="w-full md:w-1/3 md:pl-12 flex flex-col gap-4 border-l border-white/5">
                  <div className="flex justify-between items-center">
                     <span className="text-white/50 text-sm">Status</span>
                     <span className="text-[#FFD700] font-mono text-sm">In Transit</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/50 text-sm">ETA</span>
                     <span className="text-white font-mono text-sm">2025-01-15, 14:30</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/50 text-sm">Temp</span>
                     <span className="text-[#E60012] font-mono text-sm flex items-center gap-1"><Snowflake className="w-3 h-3"/> 18°C</span>
                  </div>
                  <button className="mt-4 px-6 py-3 border border-[#E60012] text-[#E60012] hover:bg-[#E60012] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    Track Order
                  </button>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION (From HTML Logic) */}
      <section className="py-24 bg-[#0a0b14] relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
               <h2 className="text-4xl md:text-6xl font-heading text-white mb-4">Success <span className="text-[#E60012]">Stories</span></h2>
               <p className="text-white/40 tracking-widest text-sm uppercase">Proven results from enterprise clients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "European Automotive Supply Chain", badge: "18% Cost Reduction", metrics: { cost: "↓ 18%", ontime: "↑ 96%", shipments: "2.5K+" }, desc: "Optimized rail and truck logistics for major automotive manufacturer. Reduced transit time by 12%." },
                 { title: "China-Middle East Trade Corridor", badge: "3-Day Faster", metrics: { transit: "-3 days", clearance: "24h", partners: "500+" }, desc: "Established dedicated air-freight lane connecting Shanghai to Dubai. Enabled same-week customs clearance." },
                 { title: "Tech E-Commerce & 3PL Hub", badge: "4x Growth", metrics: { capacity: "4x", delivery: "Same-day", accuracy: "99.7%" }, desc: "Built regional warehouse network across Asia. Handled peak seasons with 40% volume spike seamlessly." }
               ].map((caseStudy, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-[#151725] border border-white/5 p-8 hover:border-[#E60012]/50 transition-all duration-300 group"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <ShieldCheck className="w-8 h-8 text-[#FFD700] opacity-50 group-hover:opacity-100 transition-opacity"/>
                       <span className="text-[10px] font-bold bg-[#E60012]/10 text-[#E60012] px-2 py-1 rounded">{caseStudy.badge}</span>
                    </div>
                    <h3 className="text-xl font-heading text-white mb-4 group-hover:text-[#FFD700] transition-colors">{caseStudy.title}</h3>
                    <p className="text-white/50 text-sm mb-8 leading-relaxed">{caseStudy.desc}</p>
                    <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/5">
                       {Object.entries(caseStudy.metrics).map(([label, value], idx) => (
                          <div key={idx}>
                             <div className="text-lg font-bold text-white">{value}</div>
                             <div className="text-[10px] text-white/30 uppercase">{label}</div>
                          </div>
                       ))}
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* INSIGHTS (BLOG) SECTION */}
      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-[#121420] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading text-[#E60012] mb-4">
                {t.aboutTitle}
              </h2>
              <h3 className="text-3xl font-heading text-white mb-8">{t.aboutSub}</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light mb-8">
                {t.aboutDesc}
              </p>
              
              <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: Globe, title: { cn: '全球连接', en: 'Global Bridge', ru: 'Глобальный мост' }, desc: { cn: '连接中国制造商与俄罗斯市场', en: 'Connecting Markets', ru: 'Связь рынков' } },
                  { icon: Zap, title: { cn: '现代速度', en: 'Velocity', ru: 'Скорость' }, desc: { cn: '最快交付时间的先进算法', en: 'Advanced routing', ru: 'Продвинутые маршруты' } },
                  { icon: Anchor, title: { cn: '安全贸易', en: 'Secure Trade', ru: 'Безопасность' }, desc: { cn: '100% 货物保险与安全', en: 'Full insurance', ru: 'Страхование грузов' } },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 bg-[#E60012]/10 rounded-full text-[#E60012]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-heading text-white">{feature.title[lang]}</h4>
                      <p className="text-sm text-gray-500">{feature.desc[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 border-2 border-[#E60012]/20 translate-x-4 translate-y-4" />
              {/* Updated premium architectural image */}
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
      </section>

      {/* TESTIMONIALS SECTION (From HTML Logic) */}
      <section className="py-24 bg-[#0a0b14] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-heading text-white text-center mb-16">Client <span className="text-[#FFD700]">Testimonials</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { text: "Long Ying Logistics transformed our supply chain. Reliable, transparent, and incredibly professional.", author: "Chen Wei", role: "CEO, Shanghai Electronics Ltd." },
                 { text: "Best-in-class tracking system and real-time updates. Saved us 20% on logistics costs.", author: "Kumar Singh", role: "Supply Chain Director, Mumbai Trade" },
                 { text: "Dedicated account managers, 24/7 support, and seamless customs handling. Highly recommended.", author: "Anna Mueller", role: "Import Manager, Berlin Mfg" }
               ].map((t, i) => (
                 <div key={i} className="bg-[#151725] p-8 relative">
                    <div className="text-[#E60012] mb-4 flex gap-1">
                       {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current"/>)}
                    </div>
                    <p className="text-white/70 italic mb-6">"{t.text}"</p>
                    <div>
                       <div className="font-bold text-white">{t.author}</div>
                       <div className="text-xs text-[#FFD700]">{t.role}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CERTIFICATIONS SECTION (From HTML Logic) */}
      <section className="py-16 bg-[#121420]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               {[
                 { icon: Award, title: "ISO 9001:2015", sub: "Quality Management" },
                 { icon: ShieldCheck, title: "ISO 27001", sub: "Information Security" },
                 { icon: FileText, title: "IATA Certified", sub: "Air Transport" },
                 { icon: Globe, title: "AEO Status", sub: "Authorized Operator" }
               ].map((c, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <c.icon className="w-10 h-10 text-[#E60012]"/>
                    <div>
                       <div className="font-bold text-white">{c.title}</div>
                       <div className="text-xs text-white/40">{c.sub}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* TARIFFS SECTION */}
      <section id="tariffs" className="py-24 bg-[#0a0b14]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-6xl font-heading text-[#E60012] mb-4">
               {t.tariffsTitle}
             </h2>
             <p className="text-white/40 tracking-widest text-sm uppercase">
               {t.tariffsSub}
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Standard', sub: '标准 / Standard', price: '$3.5', unit: '/kg', features: ['Truck Delivery', '25 Days', 'Basic Insurance'] },
              { name: 'Business', sub: '商业 / Business', price: '$5.0', unit: '/kg', features: ['Express Truck', '15 Days', 'Full Insurance'], featured: true },
              { name: 'Premium', sub: '高级 / Premium', price: 'Custom', unit: '', features: ['Air Freight', '5 Days', 'VIP Manager'] },
            ].map((ticket, i) => {
              const isPurchased = purchasedIndex === i;
              const isFeatured = ticket.featured;

              return (
                <div
                  key={i}
                  className={`relative p-10 border flex flex-col transition-all duration-300 ${isFeatured ? 'border-[#E60012] bg-[#E60012]/5' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading text-white mb-1">{ticket.name}</h3>
                    <p className="text-xs text-[#FFD700] font-mono mb-6">{ticket.sub}</p>
                    
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-heading text-white">{ticket.price}</span>
                      <span className="text-sm text-gray-500 font-mono">{ticket.unit}</span>
                    </div>

                    <ul className="space-y-4 text-sm text-gray-400 font-sans mb-8">
                      {ticket.features.map((f, idx) => (
                         <li key={idx} className="flex items-center gap-3">
                           <Box className="w-4 h-4 text-[#E60012]" /> 
                           {f}
                         </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(i)}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300 outline-none
                      ${isPurchased 
                        ? 'bg-[#E60012] text-white border-[#E60012]' 
                        : 'border-white/20 text-white hover:border-[#E60012] hover:text-[#FFD700]'
                      }`}
                  >
                    {purchasingIndex === i ? 'Processing...' : isPurchased ? 'Request Sent' : t.quote}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT & WECHAT SECTION (Enhanced from HTML) */}
      <section id="contacts" className="py-24 bg-[#151725] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-heading text-[#E60012] mb-12 text-center">
                 {t.contactTitle}
            </h2>

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
                           <div className="text-gray-500 text-xs">No. 88 Century Avenue, Pudong</div>
                           <div className="text-[#FFD700] text-xs mt-1">+86 21 6888 8888</div>
                         </div>
                       </div>
                       <div className="flex items-start gap-4">
                         <MapPin className="w-5 h-5 text-[#E60012] mt-1"/>
                         <div>
                           <div className="font-bold text-white text-sm uppercase">Moscow Branch</div>
                           <div className="text-gray-500 text-xs">Presnenskaya Nab 12</div>
                           <div className="text-[#FFD700] text-xs mt-1">+7 (495) 000-00-00</div>
                         </div>
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
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black pb-32">
        {/* Decorative Border Top */}
        <div className="w-full h-1 bg-gradient-to-r from-[#E60012] via-[#FFD700] to-[#E60012] shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
        
        {/* Year of Snake Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="bg-black px-4 py-1">
             <div className="bg-[#151725] border border-[#FFD700]/40 px-6 py-1 rounded-full text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
               <span>Year of the Snake</span>
               <span className="text-white/50">•</span>
               <span>2025</span>
             </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 mt-4">
          <div className="text-center md:text-left">
             <div className="font-heading text-2xl font-bold tracking-wide text-white mb-1">LONG YING LOGISTICS</div>
             <div className="text-xs font-mono text-gray-600">
               <span>{t.footerRights}</span>
             </div>
          </div>
          
          <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" className="w-6 h-6" alt="Telegram" loading="lazy" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" className="w-6 h-6" alt="Instagram" loading="lazy" />
          </div>
        </div>
      </footer>
      
      <Suspense fallback={null}>
        <StickyFooter />
      </Suspense>

      <AnimatePresence>
        {selectedService && (
          <Suspense fallback={null}>
            <ServiceModal 
              service={selectedService} 
              onClose={() => setSelectedService(null)} 
              onRequestQuote={() => {
                setSelectedService(null);
                scrollToSection('contacts');
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
