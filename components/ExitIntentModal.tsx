import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ContactForm } from './ContactForm';
import { analytics } from '../utils/analytics';
import { triggerConfetti } from '../utils/confetti';

export const ExitIntentModal: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if exit intent was already shown in this session
    const shown = sessionStorage.getItem('oits_exit_intent_shown');
    if (shown === 'true') {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves the viewport from the top (clientY <= 15)
      // and has not triggered before in this session
      if (e.clientY <= 15 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('oits_exit_intent_shown', 'true');
        analytics.track('exit_intent_triggered', {
          device: window.innerWidth < 768 ? 'mobile' : 'desktop',
          timestamp: new Date().toISOString()
        });
      }
    };

    // For mobile, since they don't have exit intent via mouse mouseout,
    // we can also trigger on back-button behavior or after a prolonged idle duration (e.g. 60s),
    // or when they scroll up extremely fast. Let's do a fast scroll-up detection on mobile.
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (hasTriggered) return;
      const currentScrollY = window.scrollY;
      const velocity = lastScrollY - currentScrollY;
      
      // If user scrolls up extremely fast (velocity > 120px) and they are below 300px
      if (velocity > 120 && currentScrollY > 300 && window.innerWidth < 768) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('oits_exit_intent_shown', 'true');
        analytics.track('exit_intent_triggered_mobile_scroll', {
          scrollY: currentScrollY,
          velocity
        });
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    analytics.track('exit_intent_dismissed');
  };

  const handleSuccess = () => {
    triggerConfetti();
    analytics.track('exit_intent_lead_captured');
    // We can let the contact form handle submission success, but this gives a fallback hooks if needed
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="exit-intent-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
          >
            {/* Background Subtle Accent Pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 dark:from-cyan-600/10 dark:to-blue-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header / Interactive Call-out Banner */}
            <div className="p-6 pb-4 sm:p-8 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80 relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label={language === 'bn' ? 'বন্ধ করুন' : 'Close exit intent dialog'}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles size={10} />
                  {language === 'bn' ? 'বিশেষ অফার' : 'Limited Project Slot'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                {language === 'bn' ? 'যাওয়ার আগে একটু দাঁড়ান!' : 'Wait! Let\'s build together.'}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {language === 'bn' 
                  ? 'আপনার উদ্ভাবনী ধারণাটি বাস্তবায়ন করতে ওআইটিএস ঢাকা অভিজ্ঞ ইঞ্জিনিয়ার টিম প্রস্তুত। এখনই সংক্ষিপ্ত বিবরণ পাঠান!' 
                  : 'Get a complimentary high-fidelity software architecture layout blueprint for your upcoming project. Let\'s make something exceptional.'}
              </p>
            </div>

            {/* Embed sleek Contact Form */}
            <div className="p-6 sm:p-8 pt-4">
              <div className="bg-slate-50/60 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-1">
                <ContactForm 
                  onClose={handleClose} 
                  isModal={false} 
                />
              </div>

              {/* Guarantees Footer */}
              <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center">
                {[
                  { en: 'Free Architecture Spec', bn: 'ফ্রি আর্কিটেকচার খসড়া' },
                  { en: '24-Hour Callback', bn: '২৪ ঘণ্টায় কলব্যাক' },
                  { en: 'Zero Commitment', bn: 'কোনো বাধ্যবাধকতা নেই' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-1">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 leading-tight">
                      {language === 'bn' ? item.bn : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
