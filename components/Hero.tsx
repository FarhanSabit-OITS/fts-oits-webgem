import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Code2, Cpu, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { COMPANY_NAME, TAGLINE } from '../constants';

// Hero component providing the landing page header section with high-performance animations
export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Dynamic Background Lottie Container - Fixed 403 error with robust .lottie URL */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40 dark:opacity-20">
        <div 
          className="w-full h-full max-w-[1400px] max-h-[1400px] scale-125 md:scale-100 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        >
          <dotlottie-player
            src="https://lottie.host/27f3f11d-2830-466d-921c-a960965e6480/28GisCdfuR.lottie"
            background="transparent"
            speed="0.5"
            style={{ width: '100%', height: '100%' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>

      {/* Decorative Gradients for Visibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-slate-950/90" />
      </div>

      {/* Parallax Floating Elements - Enhanced Interaction */}
      <div 
        className="absolute top-[15%] left-[5%] hidden lg:block text-blue-600/20 dark:text-blue-400/30 animate-float transition-transform duration-500 ease-out"
        style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) rotate(${mousePos.x * 5}deg)` }}
      >
        <Code2 size={110} strokeWidth={1} />
      </div>
      <div 
        className="absolute bottom-[20%] right-[10%] hidden lg:block text-indigo-600/20 dark:text-indigo-400/30 animate-float transition-transform duration-700 ease-out"
        style={{ animationDelay: '1s', transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px) rotate(${mousePos.y * -5}deg)` }}
      >
        <Cpu size={130} strokeWidth={1} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-sm text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest mb-10 shadow-sm border border-blue-100 dark:border-blue-800/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Terminal size={18} className="animate-slow-pulse" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          {/* Main Tagline with Stagger Entrance and Enhanced Visibility */}
          <h1 className="text-glow text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter mb-10 flex flex-wrap gap-x-4">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 drop-shadow-md'} inline-block animate-in fade-in slide-in-from-bottom-8`}
                style={{ animationDuration: '1000ms', animationDelay: `${i * 120}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Description */}
          <div className="relative mb-14 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
            <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
            <p className="text-glow text-xl md:text-3xl text-slate-900 dark:text-slate-100 font-bold max-w-3xl leading-[1.3] pl-8 drop-shadow-sm">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="group w-full sm:w-auto hover:ring-2 hover:ring-blue-500 transition-all shadow-2xl"
              aria-label="Start your project inquiry now"
            >
              Start Project Inquiry <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToServices}
              className="w-full sm:w-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm"
              aria-label="View our capability matrix and services"
            >
              Our Capability Matrix
            </Button>
          </div>

          {/* Statistics Grid */}
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in duration-1000 delay-[1200ms]">
             <div className="group">
                <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">150+</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-0.5 bg-blue-600 rounded-full" />
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] font-black">Success Deliveries</p>
                </div>
             </div>
             <div className="group">
                <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">50+</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-0.5 bg-indigo-600 rounded-full" />
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] font-black">Engineering Leads</p>
                </div>
             </div>
             <div className="group">
                <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">98%</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-0.5 bg-green-600 rounded-full" />
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] font-black">Client Satisfaction</p>
                </div>
             </div>
             <div className="group">
                <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">24/7</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-0.5 bg-yellow-500 rounded-full" />
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] font-black">Global Support</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};