import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Sun, 
  Moon, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight,
  Send,
  Loader2,
  Terminal,
  Activity
} from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES, ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newsletterEmail)) {
      setSubscribeStatus('error');
      return;
    }

    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 5000);
    }, 1200);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer-root"
      className="bg-[#05080F] text-slate-400 border-t border-slate-900 pt-20 pb-12 transition-colors duration-300 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Ambient Grid Backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Footer Tier: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Brand Info & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a 
              href={`#${SectionId.HOME}`}
              onClick={(e) => scrollToSection(e, SectionId.HOME)}
              className="inline-block"
              aria-label={`${COMPANY_NAME} home`}
            >
              <BrandLogo theme="dark" height={42} />
            </a>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
              High-performance software engineering firm based in Dhaka. We architect enterprise cloud solutions, native mobile ecosystems, and zero-trust digital infrastructure.
            </p>

            {/* Live Operational Status Widget */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>All Systems Operational (99.9% SLA)</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#38BDF8] transition-all"
                aria-label="OITS Dhaka on GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#38BDF8] hover:border-[#38BDF8] transition-all"
                aria-label="OITS Dhaka on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#38BDF8] hover:border-[#38BDF8] transition-all"
                aria-label="OITS Dhaka on X"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* 4-Column Structured Link Directory (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Solutions */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
                Solutions
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-[#38BDF8] transition-colors">
                    Web & SaaS Apps
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-[#38BDF8] transition-colors">
                    Cloud & Kubernetes
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-[#38BDF8] transition-colors">
                    AI / ML Pipelines
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-[#38BDF8] transition-colors">
                    Native Mobile
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.SERVICES}`} onClick={(e) => scrollToSection(e, SectionId.SERVICES)} className="hover:text-[#38BDF8] transition-colors">
                    Cybersecurity Audit
                  </a>
                </li>
              </ul>
            </div>

            {/* Architecture */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href={`#${SectionId.ABOUT}`} onClick={(e) => scrollToSection(e, SectionId.ABOUT)} className="hover:text-[#38BDF8] transition-colors">
                    Zero-Trust Security
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.ABOUT}`} onClick={(e) => scrollToSection(e, SectionId.ABOUT)} className="hover:text-[#38BDF8] transition-colors">
                    Elastic Scaling
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.PROCESS}`} onClick={(e) => scrollToSection(e, SectionId.PROCESS)} className="hover:text-[#38BDF8] transition-colors">
                    4-Phase Lifecycle
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.PROCESS}`} onClick={(e) => scrollToSection(e, SectionId.PROCESS)} className="hover:text-[#38BDF8] transition-colors">
                    Quality Gates
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href={`#${SectionId.PORTFOLIO}`} onClick={(e) => scrollToSection(e, SectionId.PORTFOLIO)} className="hover:text-[#38BDF8] transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.CONTACT}`} onClick={(e) => scrollToSection(e, SectionId.CONTACT)} className="hover:text-[#38BDF8] transition-colors">
                    Project Estimator
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.CONTACT}`} onClick={(e) => scrollToSection(e, SectionId.CONTACT)} className="hover:text-[#38BDF8] transition-colors">
                    Book Consultation
                  </a>
                </li>
                <li>
                  <a href={`#${SectionId.CONTACT}`} onClick={(e) => scrollToSection(e, SectionId.CONTACT)} className="hover:text-[#38BDF8] transition-colors">
                    Security Whitepaper
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
                Compliance
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer">SOC2 Compliance</span></li>
                <li><span className="hover:text-white cursor-pointer">Cookie Settings</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Newsletter Subscription Bar */}
        <div className="py-8 border-b border-slate-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6">
            <h4 className="text-sm font-bold text-white mb-1">
              Subscribe to the Engineering Briefing
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Weekly architectural insights, cloud optimization strategies, and tech deep-dives.
            </p>
          </div>

          <div className="md:col-span-6">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="techlead@enterprise.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284c7] text-[#070A13] font-bold text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap"
              >
                {subscribeStatus === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="text-xs text-[#10B981] font-mono mt-1">✓ Subscribed to engineering briefs.</p>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-xs text-red-400 font-mono mt-1">Please enter a valid corporate email.</p>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} OITS Dhaka. All Rights Reserved. Engineered for Performance.</p>
          <div className="flex items-center gap-6">
            <span>ISO 27001 Aligned</span>
            <span>•</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
