import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Code2, Cpu } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE } from '../constants';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const lottieRef = useRef<any>(null);

  // Cast custom element to any to bypass TypeScript check for custom tag
  const DotLottiePlayer = 'dotlottie-player' as any;

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Set boolean properties directly on the custom element to prevent 
    // "loop must be a positive integer or a boolean" warning caused by React attribute stringification
    if (lottieRef.current) {
      lottieRef.current.loop = true;
      lottieRef.current.autoplay = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Increased sensitivity for deeper immersion
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 4,
        y: (e.clientY / window.innerHeight - 0.5) * 4,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* Lottie Background Animation - Lowered opacity for better text contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
         <DotLottiePlayer
            ref={lottieRef}
            src="https://assets5.lottiefiles.com/packages/lf20_tno6cg2w.json"
            background="transparent"
            speed="0.5"
            style={{ width: '100%', height: '100%' }}
        ></DotLottiePlayer>
      </div>

      {/* Readability Gradient Overlay - Made solid on left side for text legibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 pointer-events-none" />

      {/* Decorative Parallax Icons - Enhanced Depth & Interactivity */}
      <div 
        className="absolute top-[20%] left-[5%] hidden xl:block text-blue-600 dark:text-blue-400 opacity-10 transition-all duration-300 ease-out will-change-transform z-0"
        style={{ transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0) rotate(${mousePos.x * 2}deg)` }}
      >
        <div className="bg-white/40 dark:bg-slate-800/40 p-6 rounded-3xl backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
          <Code2 size={64} strokeWidth={1} />
        </div>
      </div>
      <div 
        className="absolute bottom-[20%] right-[5%] hidden xl:block text-indigo-600 dark:text-indigo-400 opacity-10 transition-all duration-300 ease-out will-change-transform z-0"
        style={{ transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0) rotate(${mousePos.y * -3}deg)` }}
      >
        <div className="bg-white/40 dark:bg-slate-800/40 p-8 rounded-3xl backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
          <Cpu size={80} strokeWidth={1} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-50/90 dark:bg-blue-900/60 backdrop-blur-md text-blue-700 dark:text-blue-200 text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm border border-blue-100 dark:border-blue-700 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <Terminal size={18} className="animate-pulse" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          {/* Animated Tagline with Pronounced Stagger & Text Shadow */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.9] tracking-tighter mb-12 flex flex-wrap gap-x-5 gap-y-2 drop-shadow-2xl text-glow perspective-1000">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400'} inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-gpu will-change-transform backface-hidden`}
                style={{ 
                  transitionDelay: `${150 + i * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1) rotateX(0)' : 'translateY(40px) scale(0.9) rotateX(10deg)',
                  filter: i >= 2 ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' : 'none'
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Description */}
          <div 
            className={`relative mb-14 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="absolute -left-8 top-2 bottom-2 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full opacity-80" />
            <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 dark:text-slate-100 font-bold max-w-3xl leading-snug pl-8 drop-shadow-xl text-glow">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          {/* Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="w-full sm:w-auto shadow-2xl shadow-blue-900/30 relative z-20 font-black tracking-widest text-sm md:text-base border-2 border-slate-900 dark:border-blue-500 hover:border-slate-800 dark:hover:border-blue-400 ring-2 ring-white/30 dark:ring-blue-900/50"
              aria-label="Start your project with OITS Dhaka"
            >
              Start Your Project <ArrowRight className="ml-4 transition-transform duration-300 group-hover:translate-x-2" size={24} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToServices} 
              className="w-full sm:w-auto relative z-20 font-black tracking-widest text-sm md:text-base bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white hover:bg-white dark:hover:bg-slate-800 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-xl transition-all"
              aria-label="Explore our full capability matrix"
            >
              Our Capabilities
            </Button>
          </div>

          {/* Stats Grid */}
          <div 
            className={`mt-24 pt-12 border-t border-slate-200 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1200ms' }}
          >
             {[
               { val: "150+", label: "Deliveries", color: "bg-blue-600" },
               { val: "50+", label: "Engineers", color: "bg-indigo-600" },
               { val: "98%", label: "Satisfaction", color: "bg-green-600" },
               { val: "24/7", label: "Support", color: "bg-yellow-500" }
             ].map((stat, i) => (
               <div 
                 key={i} 
                 className="group cursor-default transition-all duration-1000 transform-gpu ease-out"
                 style={{ 
                   transitionDelay: `${1300 + (i * 100)}ms`,
                   transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                   opacity: isVisible ? 1 : 0
                 }}
               >
                  <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 drop-shadow-md text-glow">{stat.val}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className={`w-10 h-1.5 ${stat.color} rounded-full group-hover:w-16 transition-all duration-500`} />
                    <p className="text-[12px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.25em] font-black shadow-black/5">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};