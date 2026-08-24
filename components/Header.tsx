import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, ChevronRight } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { useLanguage } from './LanguageContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 flex items-center justify-between">
        <a 
          href={`#${SectionId.HOME}`}
          className="group hover:opacity-90 transition-opacity min-w-0 flex items-center" 
          onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
          aria-label={`${COMPANY_NAME} homepage - scroll to top of the page`}
        >
          <BrandLogo theme={theme} height={36} className="transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 xl:gap-3" aria-label="Main site navigation">
          <ul className="flex items-center gap-1 xl:gap-2" role="list">
            {NAV_ITEMS.map((item) => {
              const labelKey = `nav_${item.label.toLowerCase()}`;
              return (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-label={`Jump to ${t(labelKey)} section`}
                    className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-all duration-300 active:scale-95"
                  >
                    {item.label === 'Home' ? <Home size={18} aria-label={t('nav_home')} /> : t(labelKey)}
                  </a>
                </li>
              );
            })}
          </ul>
          
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-3">
             {/* Language Dropdown / Toggle */}
             <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-full text-[10px] font-black tracking-tight border border-slate-200/50 dark:border-slate-800/80 font-mono">
               <button
                 onClick={() => setLanguage('en')}
                 className={`px-2 py-1 rounded-full transition-all ${language === 'en' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`}
               >
                 EN
               </button>
               <button
                 onClick={() => setLanguage('bn')}
                 className={`px-2 py-1 rounded-full transition-all ${language === 'bn' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`}
               >
                 বাং
               </button>
             </div>

             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light visual mode' : 'Switch to dark visual mode'}
             >
                {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
             </button>
          </div>

          <div className="hidden lg:block ml-4">
            <Button 
              variant="primary" 
              size="sm" 
              onClick={(e) => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-black tracking-widest text-[10px] uppercase border-2 border-slate-900 dark:border-blue-600 shadow-md group"
            >
              <div className="flex items-center gap-2">
                {t('hero_cta_quote')}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 xs:gap-4 md:hidden">
          {/* Mobile Language Selector */}
          <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-full text-[9px] font-black border border-slate-200/50 dark:border-slate-800/80 font-mono">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded-full transition-all ${language === 'en' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-1.5 py-0.5 rounded-full transition-all ${language === 'bn' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              বাং
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          
          <button 
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation"
          className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden p-6 shadow-2xl animate-in slide-in-from-top-2 duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation overlay"
        >
          <nav className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2" role="list">
              {NAV_ITEMS.map((item) => {
                const labelKey = `nav_${item.label.toLowerCase()}`;
                return (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-label={`Jump to ${t(labelKey)} section`}
                      className="px-4 py-3 rounded-lg text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 block"
                    >
                      {item.label === 'Home' ? t('nav_home') : t(labelKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
