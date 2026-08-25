import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { COMPANY_NAME, CONTACT_EMAIL, ADDRESS } from '../constants';
import { SectionId } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer-root"
      className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 px-6 py-12 md:py-16 transition-colors duration-500 relative"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-7xl space-y-12">
        
        {/* Top Row (Brand & Primary Meta) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-900">
          
          {/* Left Brand block */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <BrandLogo theme={theme} height={36} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block">
              SWISS-MODERN ENTERPRISE ENGINEERING FOUNDRY
            </p>
          </div>

          {/* Right Quick contact / telemetry chip array */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px]">
            <a 
              href="https://oitsdhaka.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
            >
              <Globe size={14} className="text-[#38BDF8]" />
              <span>oitsdhaka.com</span>
            </a>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
            >
              <Mail size={14} className="text-[#38BDF8]" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <MapPin size={14} className="text-[#38BDF8]" />
              <span>Dhaka, BD</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={14} />
              <span>ISO 27001 ALIGNED</span>
            </div>
          </div>

        </div>

        {/* Navigation Grid */}
        <div id="footer-menu-grid" className="grid grid-cols-2 md:grid-cols-4 gap-8 my-10">
          
          {/* Solutions Column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Web & SaaS Apps
                </a>
              </li>
              <li>
                <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Cloud & Kubernetes
                </a>
              </li>
              <li>
                <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-sky-500 transition-colors block py-0.5">
                  AI / ML Pipelines
                </a>
              </li>
              <li>
                <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Native Mobile Apps
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture Column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href={`#${SectionId.ABOUT}`} onClick={(e) => scrollToSection(e, SectionId.ABOUT)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Zero-Trust Security
                </a>
              </li>
              <li>
                <a href={`#${SectionId.ABOUT}`} onClick={(e) => scrollToSection(e, SectionId.ABOUT)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Elastic Scaling
                </a>
              </li>
              <li>
                <a href={`#${SectionId.PROCESS}`} onClick={(e) => scrollToSection(e, SectionId.PROCESS)} className="hover:text-sky-500 transition-colors block py-0.5">
                  4-Phase Lifecycle
                </a>
              </li>
              <li>
                <a href={`#${SectionId.PROCESS}`} onClick={(e) => scrollToSection(e, SectionId.PROCESS)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Quality Gates
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href={`#${SectionId.PORTFOLIO}`} onClick={(e) => scrollToSection(e, SectionId.PORTFOLIO)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Case Studies
                </a>
              </li>
              <li>
                <a href={`#${SectionId.INSIGHTS}`} onClick={(e) => scrollToSection(e, SectionId.INSIGHTS)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Engineering Journal
                </a>
              </li>
              <li>
                <a href={`#${SectionId.CONTACT}`} onClick={(e) => scrollToSection(e, SectionId.CONTACT)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Book Consultation
                </a>
              </li>
              <li>
                <a href={`#${SectionId.CONTACT}`} onClick={(e) => scrollToSection(e, SectionId.CONTACT)} className="hover:text-sky-500 transition-colors block py-0.5">
                  Project Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance Column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Compliance
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <span className="hover:text-sky-500 cursor-pointer block py-0.5">SOC2 Compliance</span>
              </li>
              <li>
                <span className="hover:text-sky-500 cursor-pointer block py-0.5">GDPR & Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-sky-500 cursor-pointer block py-0.5">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-sky-500 cursor-pointer block py-0.5">Cookie Settings</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Legal & Copyright) */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-slate-400">
          
          <div className="space-y-2 text-center md:text-left">
            <p className="text-slate-500">
              © {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved. Crafted with mathematical precision in Dhaka.
            </p>
            <p className="text-slate-400 dark:text-slate-600 text-[9px]">
              The OITS logo and mark are trademarks of OITS Dhaka.
            </p>
          </div>

          {/* Socials & Node Identifier */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-end">
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub link"
              >
                <Github size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn link"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Twitter/X link"
              >
                <Twitter size={16} />
              </a>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NODE: DAC-CORE-01</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
