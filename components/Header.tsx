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
  Check,
  UserCircle,
  Info,
  Briefcase,
  Calendar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS, SERVICES } from '../constants';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { useLanguage } from './LanguageContext';
import { ScheduleCallModal } from './ScheduleCallModal';
import { AuthModal } from './AuthModal';
import { useTheme } from './ThemeContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const { language, t } = useLanguage();
  const servicesDropdownRef = useRef<HTMLLIElement>(null);
  const portfolioDropdownRef = useRef<HTMLLIElement>(null);
  const aboutDropdownRef = useRef<HTMLLIElement>(null);

  const navigate = useNavigate();

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
      if (
        portfolioDropdownRef.current && 
        !portfolioDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPortfolioOpen(false);
      }
      if (
        aboutDropdownRef.current && 
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsPortfolioOpen(false);
    setIsAboutOpen(false);
    
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    
    if (window.location.pathname !== '/services') {
      navigate('/services#' + serviceId);
    } else {
      const element = document.getElementById(serviceId) || document.getElementById(SectionId.SERVICES);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        const card = document.getElementById(`service-card-${serviceId}`);
        if (card) {
          card.classList.add('ring-2', 'ring-[#38BDF8]');
          setTimeout(() => card.classList.remove('ring-2', 'ring-[#38BDF8]'), 2000);
        }
      }, 500);
    }
  };

  const handlePortfolioClick = (domainId: string) => {
    setIsPortfolioOpen(false);
    setIsMobileMenuOpen(false);
    
    if (window.location.pathname !== '/portfolio') {
      navigate('/portfolio#' + domainId);
    } else {
      const element = document.getElementById(domainId) || document.getElementById(SectionId.PORTFOLIO);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAboutClick = (aboutId: string) => {
    setIsAboutOpen(false);
    setIsMobileMenuOpen(false);
    
    if (window.location.pathname !== '/about') {
      navigate('/about#' + aboutId);
    } else {
      const element = document.getElementById(aboutId) || document.getElementById(SectionId.ABOUT);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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

  const portfolioCategories = [
    {
      title: 'Enterprise & Fintech',
      icon: <Briefcase className="w-4 h-4 text-[#38BDF8]" />,
      items: [
        { id: 'enterprise', name: 'Enterprise Solutions', desc: 'ERP Cloud Suites & Global Supply Chains' },
        { id: 'fintech', name: 'Fintech & Banking', desc: 'High-Frequency Trading & Settlement Gateways' },
      ]
    },
    {
      title: 'AI, AR/VR & Cloud',
      icon: <Cpu className="w-4 h-4 text-[#10B981]" />,
      items: [
        { id: 'ai-ml', name: 'AI/ML Systems', desc: 'Diagnostic Medical Vision & Predictive LLMs' },
        { id: 'ar-vr', name: 'AR/VR Immersive', desc: 'Real Estate Showrooms & Industrial Digital Twins' },
        { id: 'cloud', name: 'Cloud Solutions', desc: 'Multi-Region Kubernetes & Zero-Trust Migration' },
      ]
    },
    {
      title: 'IoT & Mobile',
      icon: <Smartphone className="w-4 h-4 text-[#F59E0B]" />,
      items: [
        { id: 'iot', name: 'IoT & Edge Computing', desc: 'Smart Grid Telemetry & Sensor Fleets' },
        { id: 'mobile', name: 'Mobile App Ecosystems', desc: 'NeoBank SuperApps & HealthTech Mobile' },
      ]
    }
  ];

  const aboutCategories = [
    {
      title: 'Company & Culture',
      icon: <Info className="w-4 h-4 text-[#38BDF8]" />,
      items: [
        { id: 'who-we-are', name: 'Who We Are', desc: 'Corporate overview, mission & engineering culture' },
        { id: 'what-we-offer', name: 'What We Offer', desc: 'Full-stack software solutions & digital transformation' },
      ]
    },
    {
      title: 'Process & Capabilities',
      icon: <Cpu className="w-4 h-4 text-[#10B981]" />,
      items: [
        { id: 'agile-workflow', name: 'Agile Workflow', desc: 'Rapid sprint delivery, CI/CD & transparent milestones' },
        { id: 'technical-coverage', name: 'Technical Coverage', desc: 'Cloud-native architectures, AI & modern tech stack' },
      ]
    },
    {
      title: 'Expertise & Verticals',
      icon: <Briefcase className="w-4 h-4 text-[#F59E0B]" />,
      items: [
        { id: 'industries', name: 'Industries & Verticals', desc: 'Fintech, HealthTech, E-commerce, SaaS & Enterprise' },
        { id: 'team-experts', name: 'Team of Experts', desc: 'Top 1% vetted architects, engineers & PMs' },
      ]
    }
  ];

  return (
    <header 
      id="global-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 sm:h-18 md:h-20 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-lg' 
          : 'bg-white/80 dark:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-slate-200/40 dark:border-transparent'
      }`}
      role="banner"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3 h-full">
          <Link 
            to="/"
            className="group hover:opacity-95 transition-all flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-xl outline-none shrink-0" 
            onClick={(e) => {
              if (window.location.hash === '' || window.location.hash === `#${SectionId.HOME}`) {
                handleNavClick(e as any, '/');
              }
            }}
            aria-label={`${COMPANY_NAME} homepage`}
          >
            <div className="h-8 sm:h-10 md:h-11 flex items-center">
              <BrandLogo height="100%" />
            </div>
          </Link>

          {/* Live Operational Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] text-[11px] font-mono font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
            <span>99.99% SLA</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1 xl:gap-2 ml-auto mr-4" aria-label="Main site navigation">
          <ul className="flex items-center gap-1.5" role="list">
            
            {/* Home Link (Icon Only) */}
            <li>
              <Link 
                to="/"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    handleNavClick(e as any, `#${SectionId.HOME}`);
                  }
                }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#38BDF8] border border-[#38BDF8]/60 ${
                  activeSection === 'home' && window.location.pathname === '/'
                    ? 'bg-[#38BDF8] text-slate-950 font-bold border-[#38BDF8] shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                aria-label={t('nav_home')}
                title={t('nav_home')}
              >
                <Home size={18} aria-hidden="true" />
              </Link>
            </li>

            {/* Services with Dropdown Trigger */}
            <li 
              className="relative" 
              ref={servicesDropdownRef}
              onMouseEnter={() => {
                setIsServicesOpen(true);
                setIsPortfolioOpen(false);
                setIsAboutOpen(false);
              }}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                to="/services"
                onClick={(e) => handleNavClick(e as any, '/services')}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-dropdown-panel"
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38BDF8] border border-[#38BDF8]/60 ${
                  activeSection === 'services' || isServicesOpen || window.location.pathname.startsWith('/services')
                    ? 'bg-[#38BDF8] text-slate-950 font-bold border-[#38BDF8] shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Layers size={18} aria-hidden="true" />
                <span className="hidden lg:inline">{t('nav_services')}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Categorized Multi-Column Services Dropdown */}
              {isServicesOpen && (
                <div
                  id="services-dropdown-panel"
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
                    <Link
                      to="/services"
                      onClick={(e) => handleNavClick(e as any, '/services')}
                      className="text-[#38BDF8] hover:underline font-bold flex items-center gap-1"
                    >
                      View all capabilities <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Portfolio with Dropdown Trigger */}
            <li 
              className="relative" 
              ref={portfolioDropdownRef}
              onMouseEnter={() => {
                setIsPortfolioOpen(true);
                setIsServicesOpen(false);
                setIsAboutOpen(false);
              }}
              onMouseLeave={() => setIsPortfolioOpen(false)}
            >
              <Link
                to="/portfolio"
                onClick={(e) => handleNavClick(e as any, '/portfolio')}
                aria-expanded={isPortfolioOpen}
                aria-haspopup="true"
                aria-controls="portfolio-dropdown-panel"
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38BDF8] border border-[#38BDF8]/60 ${
                  activeSection === 'portfolio' || isPortfolioOpen || window.location.pathname.startsWith('/portfolio')
                    ? 'bg-[#38BDF8] text-slate-950 font-bold border-[#38BDF8] shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Briefcase size={18} aria-hidden="true" />
                <span className="hidden lg:inline">{t('nav_portfolio')}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isPortfolioOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Categorized Multi-Column Portfolio Dropdown */}
              {isPortfolioOpen && (
                <div
                  id="portfolio-dropdown-panel"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] p-6 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-black/20 animate-in fade-in-0 zoom-in-95 duration-200 z-50 grid grid-cols-3 gap-6"
                  role="region"
                  aria-label="Portfolio Domains Directory"
                >
                  {portfolioCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <div className="space-y-2">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handlePortfolioClick(item.id)}
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
                    <span className="text-slate-500 font-mono">Enterprise case studies & metrics</span>
                    <Link
                      to="/portfolio"
                      onClick={(e) => handleNavClick(e as any, '/portfolio')}
                      className="text-[#38BDF8] hover:underline font-bold flex items-center gap-1"
                    >
                      View all case studies <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* About Us with Dropdown Trigger */}
            <li 
              className="relative" 
              ref={aboutDropdownRef}
              onMouseEnter={() => {
                setIsAboutOpen(true);
                setIsServicesOpen(false);
                setIsPortfolioOpen(false);
              }}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <Link
                to="/about"
                onClick={(e) => handleNavClick(e as any, '/about')}
                aria-expanded={isAboutOpen}
                aria-haspopup="true"
                aria-controls="about-dropdown-panel"
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38BDF8] border border-[#38BDF8]/60 ${
                  activeSection === 'about' || isAboutOpen || window.location.pathname.startsWith('/about')
                    ? 'bg-[#38BDF8] text-slate-950 font-bold border-[#38BDF8] shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Info size={18} aria-hidden="true" />
                <span className="hidden lg:inline">{t('nav_about')}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Categorized Multi-Column About Us Dropdown */}
              {isAboutOpen && (
                <div
                  id="about-dropdown-panel"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] p-6 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-black/20 animate-in fade-in-0 zoom-in-95 duration-200 z-50 grid grid-cols-3 gap-6"
                  role="region"
                  aria-label="About Us Directory"
                >
                  {aboutCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <div className="space-y-2">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleAboutClick(item.id)}
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
                    <span className="text-slate-500 font-mono">Our engineering history & culture</span>
                    <Link
                      to="/about"
                      onClick={(e) => handleNavClick(e as any, '/about')}
                      className="text-[#38BDF8] hover:underline font-bold flex items-center gap-1"
                    >
                      Explore About Us <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Contact (Icon Only) */}
            <li>
              <Link 
                to="/contact"
                onClick={(e) => handleNavClick(e as any, '/contact')}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#38BDF8] border border-[#38BDF8]/60 ${
                  activeSection === 'contact' || window.location.pathname.startsWith('/contact')
                    ? 'bg-[#38BDF8] text-slate-950 font-bold border-[#38BDF8] shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:text-[#38BDF8] dark:hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                aria-label={t('nav_contact')}
                title={t('nav_contact')}
              >
                <Mail size={18} aria-hidden="true" />
              </Link>
            </li>
          </ul>
          
          {/* Header Controls Divider */}
          <div className="ml-2 pl-3 border-l border-slate-200 dark:border-slate-800 flex items-center gap-2 xl:gap-3">
            
            {/* Accessible Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="group relative p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-[#B45309] hover:text-white dark:hover:text-slate-950 border border-[#B45309]/60 hover:border-[#B45309] transition-all active:rotate-12 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#B45309]"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-[#F59E0B] group-hover:text-white dark:group-hover:text-slate-950 transition-colors" aria-hidden="true" />
              ) : (
                <Moon size={18} className="text-[#B45309] group-hover:text-white dark:group-hover:text-slate-950 transition-colors" aria-hidden="true" />
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            {/* Workspace Access (User Account) */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate('/dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="group relative p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-[#B45309] hover:text-white dark:hover:text-slate-950 border border-[#B45309]/60 hover:border-[#B45309] transition-all focus-visible:ring-2 focus-visible:ring-[#B45309]"
              aria-label="Workspace Access"
            >
              <UserCircle size={18} className="text-[#B45309] group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none">
                Workspace Portal
              </span>
            </button>

            {/* Schedule a Call / Free Consultation CTA */}
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="ml-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#10B981] bg-transparent text-emerald-600 dark:text-emerald-400 hover:bg-[#10B981] hover:text-slate-950 dark:hover:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-emerald-500 group"
            >
              <Calendar size={14} className="shrink-0 transition-transform group-hover:scale-110" aria-hidden="true" />
              <span className="leading-none">Get a Quote</span>
            </button>
          </div>
        </nav>

        {/* Mobile Toggle Bar */}
        <div className="flex items-center gap-1.5 sm:hidden">
          {/* Mobile Services Icon */}
          <Link
            to="/services"
            onClick={(e) => handleNavClick(e as any, '/services')}
            className={`p-2 rounded-full transition-colors ${
              activeSection === 'services' || window.location.pathname.startsWith('/services')
                ? 'bg-[#38BDF8] text-slate-950 border border-[#38BDF8]'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
            aria-label="Services"
          >
            <Layers size={18} />
          </Link>

          {/* Mobile Portfolio Icon */}
          <Link
            to="/portfolio"
            onClick={(e) => handleNavClick(e as any, '/portfolio')}
            className={`p-2 rounded-full transition-colors ${
              activeSection === 'portfolio' || window.location.pathname.startsWith('/portfolio')
                ? 'bg-[#38BDF8] text-slate-950 border border-[#38BDF8]'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
            aria-label="Portfolio"
          >
            <Briefcase size={18} />
          </Link>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" aria-hidden="true" />

          {/* Mobile Contact Icon */}
          <Link
            to="/contact"
            onClick={(e) => handleNavClick(e as any, '/contact')}
            className={`p-2 rounded-full transition-colors ${
              activeSection === 'contact' || window.location.pathname.startsWith('/contact')
                ? 'bg-[#38BDF8] text-slate-950 border border-[#38BDF8]'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
            aria-label="Contact"
          >
            <Mail size={18} />
          </Link>

          {/* Mobile Workspace Access (User Account) */}
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate('/dashboard');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-[#B45309] hover:text-white dark:hover:text-slate-950 border border-[#B45309]/60 hover:border-[#B45309] transition-all"
            aria-label="Workspace Access"
          >
            <UserCircle size={18} className="text-[#B45309] transition-colors" />
          </button>

          {/* Mobile Theme Toggle (Hidden per requirements) */}
          <button
            onClick={toggleTheme}
            className="hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-[#F59E0B]" /> : <Moon size={18} className="text-[#38BDF8]" />}
          </button>

          {/* Hamburger Drawer Trigger (Touch Target >=44px) */}
          <button 
            className="w-10 h-10 ml-1 flex items-center justify-center text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Accessible Slide-Out Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="fixed inset-0 top-[65px] z-[100] bg-[#070A13]/60 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 animate-in fade-in-0 duration-200 overflow-y-auto"
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
                  <Link 
                    key={item.label}
                    to={item.href}
                    onClick={(e) => handleNavClick(e as any, item.href)}
                    className="min-h-[44px] flex items-center px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:text-[#38BDF8] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors active:scale-98"
                  >
                    {item.label === 'Home' ? t('nav_home') : t(labelKey)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => {
                setIsScheduleModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg active:scale-98"
            >
              <Calendar size={16} />
              <span>Get a Quote</span>
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2">
              <span>status: 99.99% Uptime</span>
              <span>v2.4 Production</span>
            </div>
          </div>
        </div>
      )}

      {/* Schedule a Call Modal */}
      <ScheduleCallModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};
