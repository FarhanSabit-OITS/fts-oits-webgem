import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Globe, 
  Mail, 
  MapPin, 
  Phone, 
  Terminal,
  Layers,
  ArrowRight,
  MessageSquare,
  Clock
} from 'lucide-react';
import { COMPANY_NAME, SERVICES, ADDRESS } from '../constants';
import { useLanguage } from './LanguageContext';
import { BrandLogo } from './BrandLogo';
import { ContactForm } from './ContactForm';
import { NotifyMe } from './NotifyMe';
import { SocialLinks } from './SocialLinks';
import { ParticleBackground } from './ParticleBackground';
import { TypewriterText } from './TypewriterText';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { FAQAccordion } from './FAQAccordion';
import { BackToTop } from './BackToTop';
import { getServiceSVG } from './ServiceIcons';
import { Breadcrumbs } from './Breadcrumbs';
import { analytics } from '../utils/analytics';

const SERVICE_OFFERINGS = [
  'WEB DEVELOPMENT',
  'MOBILE APPS',
  'CLOUD SOLUTIONS',
  'AI / ML SYSTEMS',
  'ENTERPRISE SOFTWARE'
];

export const ComingSoon: React.FC = () => {
  const { t, language } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    analytics.init();
  }, []);

  const handleOpenContactModal = (source: string) => {
    analytics.track('open_contact_modal', { source });
    setShowContactModal(true);
  };

  // Top Progress Bar scroll tracking using Framer Motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Set official launch target date to 30 days from reference anchor
  const targetLaunchTimestamp = useMemo(() => {
    return new Date('2026-08-31T00:00:00Z').getTime();
  }, []);

  const calculateTimeLeft = () => {
    const difference = targetLaunchTimestamp - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetLaunchTimestamp]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Top Horizontally Animated Launch & Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200/50 dark:bg-slate-900/50 overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 origin-left shadow-[0_0_12px_rgba(37,99,235,0.8)]"
          style={{ scaleX }}
        />
      </div>

      {/* Interactive Particle Background */}
      <ParticleBackground />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <BrandLogo height={34} />
        </div>
        <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          <span className="hidden xl:inline">Engineering Studio — Dhaka, BD</span>
          <ThemeToggle />
          <LanguageToggle />
          <button 
            onClick={() => handleOpenContactModal('nav')}
            aria-label={language === 'bn' ? 'যোগাযোগের ফর্ম খুলুন' : 'Open contact form modal'}
            className="px-3 sm:px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shrink-0 shadow-sm"
          >
            <MessageSquare size={12} /> <span className="hidden sm:inline">{language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area: 45/55 Split Layout on Laptop/Desktop */}
      <main className="flex-1 flex flex-col pt-24 lg:pt-0 lg:flex-row h-full z-10">
        
        {/* Left Side: 45% Width on Laptop (lg:w-[45%]) */}
        <section className="w-full lg:w-[45%] p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center border-b lg:border-b-0 border-slate-200/60 dark:border-slate-800/60">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-6">
              <Breadcrumbs />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-500/20">
              <Terminal size={12} /> {language === 'bn' ? 'সিস্টেম আপডেট: পর্যায় ২ চলমান' : 'System Update: Phase 2 In Progress'}
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.95] mb-6">
              {language === 'bn' ? 'ডিজিটাল' : 'DIGITAL'} <br />
              <span className="text-blue-600 dark:text-blue-500">{language === 'bn' ? 'উৎকর্ষ' : 'EXCELLENCE'}</span> <br />
              {language === 'bn' ? 'ক্ষেত্রসমূহ:' : 'IN'} <TypewriterText phrases={SERVICE_OFFERINGS} className="text-slate-900 dark:text-slate-100" />
            </h1>

            <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-bold leading-relaxed mb-8">
              {language === 'bn' 
                ? 'ওআইটিএস ঢাকা ইঞ্জিনিয়ারিংয়ের নতুন দিগন্ত উন্মোচন করছে। আমরা বর্তমানে একটি আধুনিক সুইজ-মডার্ন ইন্টারফেসে স্থানান্তরিত হচ্ছি।'
                : 'OITS Dhaka is redesigning the interface of engineering. We are currently migrating to a high-density, Swiss-Modern editorial framework to better showcase our frontier technologies.'}
            </p>

            {/* Dynamic Countdown Timer Component */}
            <div 
              role="timer" 
              aria-label={`Launch countdown: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`}
              className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 mb-8 shadow-xl max-w-xl"
            >
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4">
                <Clock size={14} /> {language === 'bn' ? 'অফিসিয়াল প্ল্যাটফর্ম চালুর কাউন্টডাউন' : 'Official Platform Launch Countdown'}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="p-2 sm:p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 group hover:border-blue-500 transition-colors">
                    <div className="text-xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white font-mono tracking-tight group-hover:text-blue-600 transition-colors">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button 
                onClick={() => handleOpenContactModal('prebook')}
                aria-label={language === 'bn' ? 'পরামর্শ বুক করুন' : 'Pre-book engineering consultation'}
                className="px-6 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2.5 group"
              >
                {language === 'bn' ? 'পরামর্শ বুক করুন' : 'Pre-book Consultation'} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => handleOpenContactModal('contact')}
                aria-label={language === 'bn' ? 'ইঞ্জিনিয়ারিং টিমে যোগাযোগ করুন' : 'Contact engineering team directly'}
                className="px-6 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all flex items-center justify-center gap-2.5"
              >
                <Mail size={15} /> {language === 'bn' ? 'টিমের সাথে কথা বলুন' : 'Contact Engineering'}
              </button>
            </div>

            {/* Social Media Footer Section */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                {language === 'bn' ? 'সামাজিক যোগাযোগ মাধ্যমে আমরা' : 'Connect Across Channels'}
              </h4>
              <SocialLinks variant="inline" />
            </div>
          </motion.div>
        </section>

        {/* Right Side: 55% Width on Laptop (lg:w-[55%]) */}
        <section className="w-full lg:w-[55%] bg-white dark:bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-12"
          >
            {/* Email Subscription Component ("Notify Me") */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <NotifyMe />
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6">
                {language === 'bn' ? 'বর্তমান ইঞ্জিনিয়ারিং সুবিধাসমূহ' : 'Current Capabilities'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.slice(0, 4).map((service, idx) => (
                  <motion.div 
                    key={service.id || idx} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all flex items-start gap-4 shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {getServiceSVG(service.id, 20)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight mb-1 uppercase">{service.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Accordion-Style FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="pt-6 border-t border-slate-100 dark:border-slate-800/80"
            >
              <FAQAccordion />
            </motion.div>

            {/* Tech Frontiers Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">
                {language === 'bn' ? 'অগ্রগামী প্রযুক্তি সমূহ' : 'Frontier Technologies'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['AI/ML', 'IoT', 'Blockchain', 'Cloud Native'].map((tech, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 group hover:border-blue-500 transition-colors cursor-default">
                    <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Global Reach / Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                {language === 'bn' ? 'ঢাকা হেডকোয়ার্টার হাব' : 'Dhaka Engineering Hub'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <MapPin size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold">{ADDRESS}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Mail size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold">sabit@oitsdhaka.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Phone size={16} className="text-blue-600 shrink-0" />
                  <span className="text-xs font-bold">+880 17... (Protected)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Social Bar */}
      <SocialLinks variant="floating" />

      {/* Contact Form Modal Overlay */}
      <AnimatePresence>
        {showContactModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowContactModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg my-8"
            >
              <ContactForm isModal onClose={() => setShowContactModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Decorative Subtle Accent */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-900 overflow-hidden z-30 pointer-events-none">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="w-1/3 h-full bg-blue-600"
        />
      </div>
    </div>
  );
};


