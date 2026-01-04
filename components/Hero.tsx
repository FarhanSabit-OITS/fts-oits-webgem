
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, LayoutGrid } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[100vh] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        {/* Restored and Animated Previous Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-30 blur-[1px] scale-110 will-change-transform transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25 + scrollY * 0.1}px) scale(1.1)`
          }}
          aria-hidden="true"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50/90 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95 transition-colors duration-500" />

        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] opacity-70 animate-float will-change-transform" 
          style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)` }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-10 text-center lg:text-left relative z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 dark:bg-blue-900/30 backdrop-blur-2xl border border-blue-100 dark:border-blue-800 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em] shadow-sm transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Pioneering Enterprise Solutions
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] overflow-hidden">
                <span className={`block transition-all duration-[1200ms] delay-[100ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
                  We Engineer
                </span>
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 transition-all duration-[1200ms] delay-[300ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
                  Digital Mastery
                </span>
              </h1>
            </div>
            
            <p className={`text-xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium transition-all duration-[1200ms] delay-[500ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {TAGLINE}. High-performance software engineering combined with award-winning design thinking.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start transition-all duration-[1200ms] delay-[700ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" variant="primary" 
                className="group h-20 px-14 rounded-3xl font-black text-xl transition-all duration-300" 
                onClick={scrollToContact}
              >
                Launch Project
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                variant="outline" size="lg" 
                className="h-20 px-12 rounded-3xl group font-black text-xl backdrop-blur-md"
                onClick={scrollToPortfolio}
              >
                <LayoutGrid className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Request Demo
              </Button>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-[1500ms] delay-[400ms] ease-out transform ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-24 rotate-3'}`}>
             {/* Refined Parallax Image Container */}
             <div className="relative group" style={{ perspective: '2000px' }}>
                <div 
                  className="relative bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden aspect-[4/3] transform-gpu transition-all duration-700 hover:scale-[1.02]"
                  style={{ transform: `rotateY(${mousePos.x * -12}deg) rotateX(${mousePos.y * 12}deg)` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Software Engineering Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                </div>
                
                {/* Interactive Floating Card */}
                <div 
                  className="absolute -bottom-10 -left-10 md:-left-16 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
                     <Play fill="white" size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Elite Scalability</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
