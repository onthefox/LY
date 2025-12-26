import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Truck, Cpu, Scissors, Wrench, Stamp, Boxes, FlaskConical, Snowflake, Diamond, Globe, Zap, Anchor, Star, ShieldCheck, FileText, Box, MapPin, Mail, QrCode, Loader2, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FluidBackground from '../components/FluidBackground';
import GradientText from '../components/GlitchText';
import ArtistCard from '../components/ArtistCard';
import HeroCarousel from '../components/HeroCarousel';
import { ServiceItem, Language } from '../types';
import { getServices } from '../data/constants';
import { useSEOHead } from '../utils/useSEOHead';

// Lazy Load heavy components
const AIChat = React.lazy(() => import('../components/AIChat'));
const BlogSection = React.lazy(() => import('../components/BlogSection'));
const ContactForm = React.lazy(() => import('../components/ContactForm'));
const ServiceModal = React.lazy(() => import('../components/ServiceModal'));

// Fallback loader
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center text-white/20">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, any> = {
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

const Home: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
    const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

    const lang = i18n.language as Language;
    const services = getServices(lang);
    
    // Calculate categories based on current language services
    const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

    const filteredServices = activeCategory === 'All' 
        ? services 
        : services.filter(s => s.category === activeCategory);

    // Reset category when language changes to avoid mismatch
    useEffect(() => {
        setActiveCategory('All');
    }, [lang]);

    // SEO Head management
    useSEOHead({
        lang,
        page: 'home'
    });

    const handlePurchase = (index: number) => {
        setPurchasingIndex(index);
        setTimeout(() => {
            setPurchasingIndex(null);
            setPurchasedIndex(index);
        }, 2000);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <FluidBackground />
            
            <Suspense fallback={null}>
                <AIChat />
            </Suspense>

            {/* HERO SECTION */}
            <header id="hero" className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
                <HeroCarousel />

                <div className="z-10 text-center flex flex-col items-center w-full max-w-7xl pb-12 relative mt-12">
                    <div className="relative w-full flex flex-col justify-center items-center mb-6">
                        <GradientText
                            text={t('heroTitle')}
                            as="h1"
                            className="text-[12vw] md:text-[8vw] leading-[1] font-heading font-normal tracking-tight text-center drop-shadow-2xl text-[#D4A55F]"
                        />
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="text-lg md:text-2xl font-sans tracking-[0.5em] text-white/60 mt-4 uppercase"
                        >
                            {t('heroSub')}
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
                            {t('tagline')}
                        </p>
                        <p className="text-xs md:text-sm font-sans text-white/50 tracking-widest uppercase">
                            {t('taglineSub')}
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-12 group relative px-10 py-4 bg-[#0A1A2F] border border-[#D4A55F] overflow-hidden hover:bg-[#D4A55F] hover:text-[#0A1A2F] transition-colors"
                        onClick={() => scrollToSection('contacts')}
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-base font-bold text-[#D4A55F] tracking-[0.1em] uppercase group-hover:text-[#0A1A2F] transition-colors">{t('cta')}</span>
                            <span className="text-[10px] text-[#D4A55F]/70 mt-1 tracking-widest group-hover:text-[#0A1A2F]/80 transition-colors uppercase">{t('ctaSub')}</span>
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
                        <h2 className="text-4xl md:text-6xl font-heading text-[#D4A55F] mb-2">
                            {t('servicesTitle')}
                        </h2>
                        <p className="text-white/40 text-sm tracking-[0.3em] uppercase">{t('servicesSub')}</p>
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
                                    {cat === 'All' ? t('categories.All') : cat}
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

            {/* TRACKING SECTION */}
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

            {/* CASE STUDIES SECTION */}
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
                            <h2 className="text-5xl md:text-7xl font-heading text-[#D4A55F] mb-4">
                                {t('aboutTitle')}
                            </h2>
                            <h3 className="text-3xl font-heading text-white mb-8">{t('aboutSub')}</h3>
                            <p className="text-lg text-gray-400 leading-relaxed font-light mb-8">
                                {t('aboutDesc')}
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

            {/* TESTIMONIALS SECTION */}
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

            {/* CERTIFICATIONS SECTION */}
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
                        <h2 className="text-4xl md:text-6xl font-heading text-[#D4A55F] mb-4">
                            {t('tariffsTitle')}
                        </h2>
                        <p className="text-white/40 tracking-widest text-sm uppercase">
                            {t('tariffsSub')}
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
                                        {purchasingIndex === i ? 'Processing...' : isPurchased ? 'Request Sent' : t('quote')}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CONTACT & WECHAT SECTION */}
            <section id="contacts" className="py-24 bg-[#151725] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-heading text-[#D4A55F] mb-12 text-center">
                        {t('contactTitle')}
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
        </>
    );
};

export default Home;
