import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Button } from './ui/Button';
import { SectionId } from '../types';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Custom Logo Component for reusability within Header
  const BrandLogo = () => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="header-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" /> {/* Cobalt Dark */}
              <stop offset="50%" stopColor="#2563eb" /> {/* Cobalt Blue */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Blue Light */}
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#header-logo-gradient)" strokeWidth="7" />
          {/* Stylized 'IT' */}
          <path d="M38 32 H48 V68 H38 Z" fill="url(#header-logo-gradient)" />
          <path d="M54 32 H84 V41 H74 V68 H64 V41 H54 Z" fill="url(#header-logo-gradient)" />
        </svg>
      </div>
      <span className="text-base xs:text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 filter drop-shadow-sm">
        {COMPANY_NAME}
      </span>
    </div>
  );

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
          className="group hover:opacity-90 transition-opacity min-w-0" 
          onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
          aria-label={`${COMPANY_NAME} homepage - scroll to top of the page`}
        >
          <BrandLogo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-2" aria-label="Main site navigation">
          <ul className="flex items-center gap-1 xl:gap-2" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={`Jump to ${item.label} section`}
                  className="px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-all duration-300 active:scale-95"
                >
                  {item.label === 'Home' ? <Home size={18} aria-label="Home" /> : item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light visual mode' : 'Switch to dark visual mode'}
             >
                {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
             </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
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
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-label={`Jump to ${item.label} section`}
                    className="px-4 py-3 rounded-lg text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
