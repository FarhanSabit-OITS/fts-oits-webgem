import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  ChevronRight, 
  ChevronDown, 
  Globe, 
  Smartphone, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  FolderKanban, 
  Mail, 
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES } from '../constants';
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const servicesDropdownRef = useRef<HTMLLIElement>(null);

  // Monitor scroll for sticky header and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Detect active section on scroll
      const sections = Object.values(SectionId);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current && 
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    const element = document.getElementById(SectionId.SERVICES);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsServicesOpen(false);
      setIsMobileMenuOpen(false);
      
      // Attempt to highlight the specific card if rendered
      setTimeout(() => {
        const card = document.getElementById(`service-card-${serviceId}`);
        if (card) {
          card.classList.add('ring-2', 'ring-[#38BDF8]');
          setTimeout(() => card.classList.remove('ring-2', 'ring-[#38BDF8]'), 2000);
        }
      }, 500);
    }
  };

  const serviceCategories = [
    {
      title: 'Cloud & Web Solutions',
      icon: <Globe className="w-4 h-4 text-[#38BDF8]" />,
      items: [
        { id: 'web-dev', name: 'Enterprise Web Apps', desc: 'React 19, Next.js & horizontal scalability' },
        { id: 'cloud-infrastructure', name: 'Cloud & DevOps', desc: 'AWS/GCP Kubernetes & CI/CD automations' },
      ]
    },
    {
      title: 'Mobile & Frontier Tech',
      icon: <Smartphone className="w-4 h-4 text-[#10B981]" />,
      items: [
        { id: 'mobile-dev', name: 'Native Mobile Apps', desc: 'Swift, Kotlin, Flutter 60FPS fluid UX' },
        { id: 'ai-ml', name: 'AI & ML Solutions', desc: 'Gemini, custom LLMs & predictive engines' },
      ]
    },
    {
      title: 'Security & Enterprise',
      icon: <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />,
      items: [
        { id: 'dedicated-teams', name: 'Dedicated Teams', desc: 'Top 1% vetted engineering staff augmentation' },
        { id: 'ui-ux', name: 'UI/UX Engineering', desc: 'Swiss-modern design systems & accessible interfaces' },
      ]
    }
  ];

  return (
    <header 
      id="global-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#070A13]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-lg shadow-black/5 dark:shadow-black/40' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <a 
            href={`#${SectionId.HOME}`}
            className="group hover:opacity-95 transition-all flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-xl outline-none" 
            onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
            aria-label={`${COMPANY_NAME} homepage`}
          >
            <div className="h-10 sm:h-12 flex items-center">
              <BrandLogo theme={theme} height={40} className="transition-transform duration-300 group-hover:scale-105" />
            </div>
          </a>

          {/* Live Operational Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] text-[11px] font-mono font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>99.99% SLA</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main site navigation">
          <ul className="flex items-center gap-1" role="list">
            
            {/* Home Link */}
            <li>
              <a 
                href={`#${SectionId.HOME}`}
                onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  activeSection === 'home'
                    ? 'text-[#38BDF8] bg-sky-500/10 font-bold border border-[#38BDF8]/30 shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                aria-label={t('nav_home')}
              >
                <Home size={16} aria-hidden="true" />
                <span>{t('nav_home')}</span>
              </a>
            </li>

            {/* Services with Dropdown Trigger */}
            <li className="relative" ref={servicesDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-dropdown-panel"
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  activeSection === 'services' || isServicesOpen
                    ? 'text-[#38BDF8] bg-sky-500/10 font-bold border border-[#38BDF8]/30'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{t('nav_services')}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categorized Multi-Column Services Dropdown */}
              {isServicesOpen && (
                <div
                  id="services-dropdown-panel"
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] p-6 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-black/20 animate-in fade-in-0 zoom-in-95 duration-200 z-50 grid grid-cols-3 gap-6"
                  role="region"
                  aria-label="Services Directory"
                >
                  {serviceCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <div className="space-y-2">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleServiceClick(item.id)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group/item block"
                          >
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-[#38BDF8] transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-normal">
                              {item.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="col-span-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Custom enterprise specs available</span>
                    <a
                      href={`#${SectionId.SERVICES}`}
                      onClick={(e) => handleNavClick(e, `#${SectionId.SERVICES}`)}
                      className="text-[#38BDF8] hover:underline font-bold flex items-center gap-1"
                    >
                      View all capabilities <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              )}
            </li>

            {/* Remaining Nav Items */}
            {NAV_ITEMS.filter(item => item.label !== 'Home' && item.label !== 'Services').map((item) => {
              const sectionKey = item.href.replace('#', '');
              const labelKey = `nav_${item.label.toLowerCase()}`;
              const isActive = activeSection === sectionKey;
              return (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-label={`Jump to ${t(labelKey)} section`}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                      isActive
                        ? 'text-[#38BDF8] bg-sky-500/10 font-bold border border-[#38BDF8]/30 shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {t(labelKey)}
                  </a>
                </li>
              );
            })}
          </ul>
          
          {/* Header Controls Divider */}
          <div className="ml-2 pl-3 border-l border-slate-200 dark:border-slate-800 flex items-center gap-2 xl:gap-3">
            
            {/* Language Pill Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-full text-[10px] font-mono font-bold border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'en' 
                    ? 'bg-white dark:bg-slate-800 text-[#38BDF8] shadow-sm font-bold' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'bn' 
                    ? 'bg-white dark:bg-slate-800 text-[#38BDF8] shadow-sm font-bold' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="বাংলা ভাষায় পরিবর্তন করুন"
              >
                বাং
              </button>
            </div>

            {/* Accessible Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-[#F59E0B] transition-transform hover:rotate-45" aria-hidden="true" />
              ) : (
                <Moon size={18} className="text-[#38BDF8] transition-transform hover:-rotate-12" aria-hidden="true" />
              )}
            </button>

            {/* Header Action Buttons */}
            <a
              href={`#${SectionId.PORTFOLIO}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.PORTFOLIO}`)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              aria-label="Explore Portfolio"
              title="Portfolio Artifacts"
            >
              <FolderKanban size={18} />
            </a>

            <a
              href={`#${SectionId.CONTACT}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.CONTACT}`)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#10B981] hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-2 focus-visible:ring-[#10B981]"
              aria-label="Direct Consultation Email"
              title="Contact Coordinates"
            >
              <Mail size={18} />
            </a>

            {/* High-Contrast "Get a Quote" CTA (Text & Arrow on SAME horizontal line) */}
            <button
              onClick={() => {
                const element = document.getElementById(SectionId.CONTACT);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="ml-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981] hover:bg-[#059669] text-[#070A13] font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-emerald-400 group"
            >
              <span className="leading-none">{t('hero_cta_quote')}</span>
              <ChevronRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Toggle Bar */}
        <div className="flex items-center gap-2.5 lg:hidden">
          {/* Mobile Language Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-full text-[9px] font-mono border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full ${language === 'en' ? 'bg-white dark:bg-slate-800 text-[#38BDF8] font-bold shadow-xs' : 'text-slate-500'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2 py-0.5 rounded-full ${language === 'bn' ? 'bg-white dark:bg-slate-800 text-[#38BDF8] font-bold shadow-xs' : 'text-slate-500'}`}
            >
              বাং
            </button>
          </div>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-[#F59E0B]" /> : <Moon size={18} className="text-[#38BDF8]" />}
          </button>

          {/* Hamburger Drawer Trigger (Touch Target ≥44px) */}
          <button 
            className="w-11 h-11 flex items-center justify-center text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Accessible Slide-Out Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="fixed inset-0 top-[65px] z-50 bg-[#070A13]/60 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 animate-in fade-in-0 duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile site navigation"
        >
          <div className="space-y-4">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const labelKey = `nav_${item.label.toLowerCase()}`;
                const isServices = item.label === 'Services';

                if (isServices) {
                  return (
                    <div key={item.label} className="border-b border-slate-200 dark:border-slate-800/80 pb-2">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between min-h-[44px] px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        aria-expanded={mobileServicesOpen}
                      >
                        <span>{t(labelKey)}</span>
                        <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#38BDF8]' : ''}`} />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-4 pr-2 py-2 space-y-2 animate-in slide-in-from-top-2 duration-150">
                          {SERVICES.map((srv) => (
                            <button
                              key={srv.id}
                              onClick={() => handleServiceClick(srv.id)}
                              className="w-full text-left min-h-[44px] px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#38BDF8] hover:bg-slate-800/40 flex items-center justify-between"
                            >
                              <span>{srv.title}</span>
                              <ChevronRight size={14} className="text-slate-500" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a 
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="min-h-[44px] flex items-center px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors active:scale-98"
                  >
                    {item.label === 'Home' ? t('nav_home') : t(labelKey)}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => {
                const element = document.getElementById(SectionId.CONTACT);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#10B981] text-[#070A13] font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98"
            >
              <span>{t('hero_cta_quote')}</span>
              <ChevronRight size={16} />
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2">
              <span>status: 99.99% Uptime</span>
              <span>v2.4 Production</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
