import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const BackToTop: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Also scroll any right-side scroll containers if present
    const scrollContainers = document.querySelectorAll('.custom-scrollbar');
    scrollContainers.forEach((container) => {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          aria-label={language === 'bn' ? 'উপরে যান' : 'Back to top'}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-950 border border-stone-700/60 dark:border-stone-300/80 hover:border-[#10B981] dark:hover:border-[#10B981] hover:text-[#10B981] dark:hover:text-[#10B981] shadow-2xl hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] transition-all flex items-center justify-center group"
        >
          <ArrowUp size={18} className="transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
