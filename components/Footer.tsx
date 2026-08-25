import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  Cpu,
  Layers,
  Terminal,
  Zap,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_NAME, ADDRESS } from '../constants';
import { SectionId } from '../types';
import { BrandLogo } from './BrandLogo';
import { CopyEmailButton } from './CopyEmailButton';
import { useTheme } from './ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = themeContextUnpackHelper();
  const navigate = useNavigate();
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  // Interval-based Real-time Performance Telemetry Monitor state
  const [latency, setLatency] = useState(24);
  const [nodeStatus, setNodeStatus] = useState<'Active' | 'Optimal' | 'Syncing'>('Active');
  const [currentTime, setCurrentTime] = useState('');

  // Access safety wrapper
  function themeContextUnpackHelper(): { theme: 'light' | 'dark' | 'auto' } {
    try {
      const context = useTheme();
      return { theme: context.theme as 'light' | 'dark' | 'auto' };
    } catch {
      return { theme: 'dark' };
    }
  }

  useEffect(() => {
    // Latency fluctuation
    const latencyInterval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = prev + delta;
        return Math.max(12, Math.min(next, 48));
      });
    }, 2500);

    // Node status cycling
    const statuses: ('Active' | 'Optimal' | 'Syncing')[] = ['Active', 'Optimal', 'Syncing'];
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setNodeStatus(statuses[statusIndex]);
    }, 6000);

    // Update timestamp
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 19));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(statusInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
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
            <CopyEmailButton variant="compact" />
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
                <Link to="/services" onClick={(e) => handleNavClick(e as any, '/services')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Web & SaaS Apps
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleNavClick(e as any, '/services')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Cloud & Kubernetes
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleNavClick(e as any, '/services')} className="hover:text-sky-500 transition-colors block py-0.5">
                  AI / ML Pipelines
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={(e) => handleNavClick(e as any, '/services')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Native Mobile Apps
                </Link>
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
                <Link to="/about" onClick={(e) => handleNavClick(e as any, '/about')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Zero-Trust Security
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={(e) => handleNavClick(e as any, '/about')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Elastic Scaling
                </Link>
              </li>
              <li>
                <Link to="/#process" onClick={(e) => handleNavClick(e as any, '/#process')} className="hover:text-sky-500 transition-colors block py-0.5">
                  4-Phase Lifecycle
                </Link>
              </li>
              <li>
                <Link to="/#process" onClick={(e) => handleNavClick(e as any, '/#process')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Quality Gates
                </Link>
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
                <Link to="/portfolio" onClick={(e) => handleNavClick(e as any, '/portfolio')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/#insights" onClick={(e) => handleNavClick(e as any, '/#insights')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Engineering Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleNavClick(e as any, '/contact')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleNavClick(e as any, '/contact')} className="hover:text-sky-500 transition-colors block py-0.5">
                  Project Estimator
                </Link>
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

        {/* Real-time Performance Telemetry Monitor (Bento-styled footer widget) */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px]">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Activity size={12} className="text-blue-500 animate-pulse" />
              <span>SERVER LATENCY</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">{latency} ms</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Cpu size={12} className="text-emerald-500" />
              <span>NODE STATUS</span>
            </div>
            <span className="font-bold text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              {nodeStatus}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Terminal size={12} className="text-sky-400" />
              <span>DEPLOY TIMESTAMP</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">2026.08.25@03:03:00</span>
          </div>
        </div>

        {/* Bottom Bar (Legal & Copyright) */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-slate-400">
          
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
            <button
              onClick={() => setIsCreditsOpen(true)}
              id="engineering-credits-trigger"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all font-bold cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Layers size={11} className="text-blue-500" />
              <span>[Engineering Credits]</span>
            </button>

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

            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NODE: DAC-CORE-01</span>
            </div>
          </div>

        </div>

      </div>

      {/* Discrete Engineering Credits Modal */}
      <AnimatePresence>
        {isCreditsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreditsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl z-10 flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCreditsOpen(false)}
                id="close-credits-modal"
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-mono font-bold tracking-wider uppercase">
                  <Terminal size={10} />
                  <span>Verified Node Composition</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  OITS Engineering Stack
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Our systems are optimized with premium Swiss-Modern constraints for peak processing velocities and zero-debt accessibility compliance.
                </p>
              </div>

              {/* Stack items */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-850 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Core Runtime</span>
                  <span className="font-bold text-slate-900 dark:text-white">React 19 + TypeScript</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Styling Core</span>
                  <span className="font-bold text-slate-900 dark:text-white">Tailwind CSS</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Data Visualization</span>
                  <span className="font-bold text-slate-900 dark:text-white">D3.js & amCharts 5</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Micro-animations</span>
                  <span className="font-bold text-slate-900 dark:text-white">Framer Motion</span>
                </div>
              </div>

              {/* Built in Dhaka Node badge */}
              <div className="mt-2 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <Zap size={18} className="animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      BUILT IN DHAKA
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-normal mt-0.5">
                    Originated from DAC-CORE-01 node. Authorized OITS Dhaka signature token.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
