import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone, 
  Cloud, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Building2,
  Server,
  Lock
} from 'lucide-react';
import { SectionId } from '../types';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { MiniGlobe } from './MiniGlobe';

export const Hero: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'globe' | 'portfolio'>('globe');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const projectInterval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % Math.min(PROJECTS.length, 3));
    }, 6000);

    return () => clearInterval(projectInterval);
  }, []);

  const featuredProject = PROJECTS[activeProjectIndex] || PROJECTS[0];

  const trustedClients = [
    { name: 'Apex Capital', region: 'London, UK', logoText: 'APEX // CAPITAL' },
    { name: 'SecurePay', region: 'Frankfurt, DE', logoText: 'SECURE • PAY' },
    { name: 'Nippon Freight', region: 'Tokyo, JP', logoText: 'NIPPON_LOGISTICS' },
    { name: 'EduTrack Europe', region: 'Amsterdam, NL', logoText: 'EDUTRACK' },
    { name: 'Luma Health', region: 'Boston, US', logoText: 'LUMA_HEALTH' },
    { name: 'Al-Maktoum Logistics', region: 'Dubai, UAE', logoText: 'AL-MAKTOUM' },
  ];

  return (
    <>
      <section 
        id={SectionId.HOME} 
        className="min-h-screen relative flex flex-col justify-between pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white transition-colors duration-300 overflow-hidden"
      >
        {/* HTML5 Looping Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105 opacity-15 dark:opacity-35 filter contrast-125 brightness-90"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-code-animation-on-a-tech-screen-41544-large.mp4" type="video/mp4" />
          </video>
          {/* Light / Dark Gradient Overlay Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-slate-50/40 dark:from-slate-950 dark:via-slate-950/75 dark:to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl flex-1 flex flex-col justify-center my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-8">
            
            {/* Left Column (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* System Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-500/30 rounded-full font-mono text-[10px] uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>OITS INTELLI-CORE v4.2 ONLINE</span>
              </div>

              {/* Swiss Display Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] mb-6 text-slate-950 dark:text-white">
                ENGINEERING ENTERPRISE DIGITAL CORES
              </h1>

              {/* Body Descriptor */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                We design, build, and deploy high-throughput software systems and elastic cloud infrastructure. Engineered with zero-debt architecture and strict 99.98% SLAs.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/30 active:scale-98 group"
                >
                  <span>Initiate Project Quote</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={scrollToPortfolio}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-md transition-all active:scale-98 shadow-sm"
                >
                  <Code2 size={15} className="text-blue-600 dark:text-blue-400" />
                  <span>Explore Case Studies</span>
                </button>
              </div>

            </div>

            {/* Right Column Interactive Mode Switcher (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="relative z-10 w-full min-h-[500px] bg-white/90 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xl dark:shadow-2xl flex flex-col justify-between">
                
                {/* Header Toggle Tabs */}
                <div className="flex items-center justify-between p-1.5 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6">
                  <button
                    onClick={() => setActiveMode('globe')}
                    className={`flex-1 py-2 px-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                      activeMode === 'globe'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    <Globe size={13} />
                    <span>3D Earth Engine</span>
                  </button>

                  <button
                    onClick={() => setActiveMode('portfolio')}
                    className={`flex-1 py-2 px-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                      activeMode === 'portfolio'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    <Code2 size={13} />
                    <span>Featured Work</span>
                  </button>
                </div>

                {/* View Container */}
                <div className="flex-1 relative flex flex-col justify-center overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    {activeMode === 'globe' ? (
                      <motion.div
                        key="globe"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full min-h-[340px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 relative overflow-hidden"
                      >
                        {/* 3D amCharts Interactive Globe */}
                        <MiniGlobe />

                        <div className="text-center space-y-1 mt-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block">
                            GLOBAL COMPUTE MESH
                          </span>
                          <h4 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-tight">
                            9+ Regions Edge Latency Node Network
                          </h4>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            Dhaka HQ • Frankfurt • London • Tokyo • Singapore
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="portfolio"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToPortfolio}
                        className="w-full h-full min-h-[340px] bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {featuredProject.category || 'ENTERPRISE SAAS'}
                          </span>
                          <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>

                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 mb-4">
                          <img 
                            src={featuredProject.imageUrl} 
                            alt={featuredProject.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/90 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                            ⚡ 10x Throughput Boost
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {featuredProject.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {featuredProject.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Telemetry Strip */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Activity size={12} className="text-emerald-500 dark:text-emerald-400 animate-pulse" /> ENGINE ACTIVE
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">REAL-TIME METRICS</span>
                </div>

              </div>
            </div>

          </div>

          {/* Hero Enterprise Metric Counter Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-black font-mono text-blue-600 dark:text-blue-400 block tracking-tighter">
                99.98%
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-bold">
                SLA Index (High Availability)
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 block tracking-tighter">
                &lt; 50ms
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-bold">
                Processing Latency Target
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-black font-mono text-amber-600 dark:text-amber-400 block tracking-tighter">
                50+
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-bold">
                Senior Software Architects
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-black font-mono text-slate-950 dark:text-white block tracking-tighter">
                100%
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-bold">
                On-Time Delivery Metric
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Trusted By Client Marquee Section (section#trusted-by-logos) */}
      <section id="trusted-by-logos" className="py-10 bg-white dark:bg-slate-900/90 border-y border-slate-200 dark:border-slate-800/80 relative overflow-hidden backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-4 mb-4 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-bold block">
            TRUSTED BY GLOBAL ENTERPRISES ACROSS 9+ REGIONS
          </span>
        </div>

        {/* Infinite CSS Marquee */}
        <div className="flex overflow-hidden select-none space-x-8">
          <div className="flex shrink-0 items-center justify-around gap-8 min-w-full animate-marquee">
            {trustedClients.concat(trustedClients).map((client, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 font-mono text-xs font-bold text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-500/40 transition-all cursor-default shrink-0 flex items-center gap-2 shadow-xs"
              >
                <Building2 size={14} className="text-blue-500/60" />
                <span>{client.logoText}</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-600 font-normal">({client.region})</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

