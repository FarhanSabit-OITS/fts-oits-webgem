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
  ChevronLeft, 
  ExternalLink, 
  Quote, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE, SERVICES, PROJECTS, TESTIMONIALS, COMPANY_NAME } from '../constants';
import { useLanguage } from './LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    // Auto rotate featured case study
    const projectInterval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % Math.min(PROJECTS.length, 3));
    }, 6000);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(projectInterval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const featuredProject = PROJECTS[activeProjectIndex] || PROJECTS[0];

  return (
    <section 
      id={SectionId.HOME} 
      className="relative min-h-[92vh] flex items-center pt-32 pb-24 overflow-hidden bg-slate-50 dark:bg-[#070A13] transition-colors duration-500"
    >
      {/* Interactive Mesh & Grid Backdrop Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle SVG Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Atmospheric Ambient Glows (#38BDF8 & #10B981) */}
        <div 
          className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/10 blur-[130px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)` }}
        />
        <div 
          className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#10B981]/10 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)` }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-[#F59E0B]/5 blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Swiss Display Typography & Action Group (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Monospaced Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold tracking-wider text-slate-800 dark:text-slate-200 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[#38BDF8]">ENTERPRISE</span>
              <span className="text-slate-400">/</span>
              <span>DIGITAL ENGINEERING</span>
            </div>

            {/* Swiss-Style Editorial Display Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-950 dark:text-white">
              Architecting <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#10B981]">
                High-Velocity
              </span> <br className="hidden sm:inline" />
              Software Systems.
            </h1>

            {/* Concise Value Proposition Copy */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              We design, build, and deploy resilient digital platforms. From high-throughput cloud backends to native cross-platform experiences, we transform ambitious business logic into production-grade infrastructure.
            </p>

            {/* Primary Action Group (Explore Solutions & Schedule Consultation) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#10B981] hover:bg-[#059669] text-[#070A13] font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 group"
              >
                <span>Explore Solutions</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:border-[#38BDF8] dark:hover:border-[#38BDF8] transition-all focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>

            {/* Live Operational Counters (3-Column Grid) */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#10B981]">99.9%</span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                  SLA Reliability
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#38BDF8]">150+</span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                  Systems Built
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F59E0B]">24/7</span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                  SecOps Coverage
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Case Study Preview Card (5 cols) */}
          <div className="lg:col-span-5">
            <div 
              onClick={scrollToPortfolio}
              className="group relative bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl shadow-black/10 dark:shadow-black/60 transition-all duration-500 hover:border-[#38BDF8]/50 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
            >
              {/* Card Header Info */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-500/10 text-[#38BDF8] border border-[#38BDF8]/20">
                    FEATURED CASE STUDY
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-[#10B981]">
                    {featuredProject.category}
                  </span>
                </div>

                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-[#38BDF8] group-hover:bg-[#38BDF8]/10 transition-colors">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Media Container with Zoom Effect */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-5">
                {!imgError ? (
                  <img 
                    src={featuredProject.imageUrl} 
                    alt={featuredProject.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-[#0C1222] text-center">
                    <Layers className="w-12 h-12 text-[#38BDF8] mb-2" />
                    <p className="text-xs font-mono text-slate-400">High-Performance Deployment</p>
                  </div>
                )}
                
                {/* Metric Overlay Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-[#070A13]/85 backdrop-blur-md border border-white/10 text-white flex items-center gap-2">
                  <Zap size={14} className="text-[#10B981]" />
                  <span className="text-xs font-mono font-bold">10x Query Throughput</span>
                </div>
              </div>

              {/* Content Description */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                {featuredProject.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {featuredProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {(featuredProject.technologies || ['React', 'TypeScript', 'Cloud Run', 'Tailwind']).slice(0, 4).map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/60 text-[11px] font-mono text-slate-600 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
