import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Facebook, Sun, Moon, MapPin, Loader2 } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES, ADDRESS } from '../constants';
import { SectionId } from '../types';
import { useLanguage } from './LanguageContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a 
    href={href} 
    className="group relative p-3 rounded-xl hover:bg-slate-800 transition-all duration-300 flex items-center justify-center border border-transparent hover:border-slate-700"
    aria-label={`Follow OITS Dhaka on ${label}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" aria-hidden="true" />
    
    {/* Tooltip */}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-2xl border border-slate-700 transform translate-y-2 group-hover:translate-y-0 duration-300 z-50" aria-hidden="true">
      {label}
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700"></span>
    </span>
  </a>
);

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubscribeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Standard business/corporate email verification
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setToast({
        text: language === 'bn' 
          ? 'অনুগ্রহ করে সঠিক ব্যবসায়িক ইমেল প্রদান করুন।' 
          : 'Please provide a valid corporate email address.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call to simulate network registration latency
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      setToast({
        text: language === 'bn'
          ? 'নিউজলেটার সাবস্ক্রিপশন সফল হয়েছে! ওআইটিএস পরিবারের সাথে যুক্ত হওয়ার জন্য ধন্যবাদ।'
          : 'Subscription established successfully! Welcome to OITS Dhaka Weekly Briefs.',
        type: 'success'
      });
      setEmail('');
    } catch (err) {
      setToast({
        text: language === 'bn'
          ? 'নিবন্ধন ব্যর্থ হয়েছে। নেটওয়ার্ক স্থায়িত্ব পরীক্ষা করে পুনরায় চেষ্টা করুন।'
          : 'Registration failed due to connection index. Please retry.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
    e.preventDefault();
    const element = document.getElementById(`service-card-${serviceId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const servicesSection = document.getElementById(SectionId.SERVICES);
      if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900" role="contentinfo" aria-label="Site information">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          <div className="space-y-6 lg:col-span-3">
            <a href={`#${SectionId.HOME}`} className="flex items-center gap-2 group hover:opacity-90 transition-opacity" onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)} aria-label={`${COMPANY_NAME} homepage - scroll to top of the page`}>
              <BrandLogo theme="dark" height={36} className="transition-transform duration-300 group-hover:scale-105" />
            </a>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              {t('footer_desc')}
            </p>
            
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
              aria-label={`View the official OITS Dhaka office location in ${ADDRESS} on Google Maps`}
            >
              <MapPin size={18} className="mt-0.5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              <span className="font-medium">{ADDRESS}</span>
            </a>

            <nav className="flex gap-2" aria-label="Our social media presence">
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
            </nav>
            
            <div className="pt-2">
               <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700"
                  aria-label={theme === 'dark' ? 'Activate light mode visual theme' : 'Activate dark mode visual theme'}
               >
                  {theme === 'dark' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
               </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">{t('footer_company')}</h4>
            <nav aria-label="Company informational links">
              <ul className="space-y-4" role="list">
                {NAV_ITEMS.map((item) => {
                  const labelKey = `nav_${item.label.toLowerCase()}`;
                  return (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        onClick={(e) => handleNavClick(e, item.href)} 
                        aria-label={`Jump to ${t(labelKey)} section`} 
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium"
                      >
                        {item.label === 'Home' ? t('nav_home') : t(labelKey)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">{t('footer_services')}</h4>
            <nav aria-label="Our specialized engineering services">
              <ul className="space-y-4" role="list">
                {SERVICES.map((service) => {
                  const translatedTitle = language === 'bn' ? (service.id === 'tech-frontiers' ? 'টেকনোলজি ফ্রন্টিয়ার্স সমাধান' : service.id === 'cross-platform' ? 'ক্রস-প্ল্যাটফর্ম সলিউশন' : service.title) : service.title;
                  return (
                    <li key={service.id}>
                      <a 
                        href={`#service-card-${service.id}`} 
                        onClick={(e) => handleServiceClick(e, service.id)} 
                        aria-label={`Learn more about our ${translatedTitle} capabilities`}
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium"
                      >
                        {translatedTitle}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">{t('footer_newsletter')}</h4>
            <p className="text-sm text-slate-400 font-medium">{t('footer_newsletter_desc')}</p>
            <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-2" aria-label="Newsletter subscription form">
              <div>
                <label htmlFor="newsletter-email-footer" className="sr-only">Work email address for tech insights</label>
                <input 
                  id="newsletter-email-footer"
                  type="email" 
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer_newsletter_placeholder')}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-blue-600 text-white placeholder:text-slate-500 font-bold disabled:opacity-50"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 text-center flex items-center justify-center gap-2 disabled:bg-blue-850 disabled:opacity-75" 
                aria-label="Subscribe to OITS Dhaka weekly newsletter"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    <span>{language === 'bn' ? 'যুক্ত হওয়া হচ্ছে...' : 'Joining...'}</span>
                  </>
                ) : (
                  <span>{t('footer_newsletter_btn')}</span>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium font-sans">
          <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
          
          <nav className="flex gap-10 animate-in" aria-label="Legal and privacy documentation">
            <a href="#" aria-label="Read our official privacy policy documentation" className="hover:text-white transition-colors">{t('footer_privacy')}</a>
            <a href="#" aria-label="Read our terms and conditions of service" className="hover:text-white transition-colors">{t('footer_terms')}</a>
          </nav>
        </div>
      </div>

      {/* Dynamic Toast Notification Panel */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[120] bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl max-w-sm flex items-start gap-4 animate-fade-in duration-500 transition-all backdrop-blur-md">
          <div className={`p-2 rounded-xl ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <div className="space-y-1 flex-1">
            <h5 className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-500">
              {toast.type === 'success' ? (language === 'bn' ? 'স্ট্যাটাস: সফল' : 'STATUS: SUCCESS') : (language === 'bn' ? 'স্ট্যাটাস: ত্রুটি' : 'STATUS: ERROR')}
            </h5>
            <p className="text-xs font-bold text-slate-200 leading-relaxed">
              {toast.text}
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setToast(null)} 
            className="text-slate-500 hover:text-white transition-colors text-xs font-bold font-mono px-1.5 py-0.5 rounded-md hover:bg-slate-800"
          >
            ✕
          </button>
        </div>
      )}
    </footer>
  );
};