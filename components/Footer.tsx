import React from 'react';
import { Github, Linkedin, Twitter, Facebook, Sun, Moon, MapPin } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES, ADDRESS } from '../constants';
import { SectionId } from '../types';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <a href={`#${SectionId.HOME}`} className="flex items-center gap-2 group hover:opacity-90 transition-opacity" onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)} aria-label={`${COMPANY_NAME} homepage - scroll to top of the page`}>
              <div className="w-8 h-8 flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  <defs>
                    <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#footer-logo-gradient)" strokeWidth="7" />
                  <path d="M38 32 H48 V68 H38 Z" fill="url(#footer-logo-gradient)" />
                  <path d="M54 32 H84 V41 H74 V68 H64 V41 H54 Z" fill="url(#footer-logo-gradient)" />
                </svg>
              </div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400">{COMPANY_NAME}</span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Empowering businesses through innovative software solutions. Your digital transformation partner.
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

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">Company</h4>
            <nav aria-label="Company informational links">
              <ul className="space-y-4" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item.href)} 
                      aria-label={`Jump to ${item.label} section`} 
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">Services</h4>
            <nav aria-label="Our specialized engineering services">
              <ul className="space-y-4" role="list">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <a 
                      href={`#service-card-${service.id}`} 
                      onClick={(e) => handleServiceClick(e, service.id)} 
                      aria-label={`Learn more about our ${service.title} capabilities`}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-sm mb-6 text-slate-400 font-medium">Subscribe for the latest tech news and digital strategy updates from OITS Dhaka.</p>
            <form className="flex gap-2" aria-label="Newsletter subscription form">
              <div className="flex-1">
                <label htmlFor="newsletter-email-footer" className="sr-only">Work email address for tech insights</label>
                <input 
                  id="newsletter-email-footer"
                  type="email" 
                  name="email"
                  placeholder="Business email address" 
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-blue-600 text-white placeholder:text-slate-500 font-bold"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shrink-0" 
                aria-label="Subscribe to OITS Dhaka weekly newsletter"
              >
                Join
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Digital Excellence Delivered.</p>
          <nav className="flex gap-10" aria-label="Legal and privacy documentation">
            <a href="#" aria-label="Read our official privacy policy documentation" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" aria-label="Read our terms and conditions of service" className="hover:text-white transition-colors">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};