import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Code2, Cpu } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE } from '../constants';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax factor
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
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
      
      {/* Optimized Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{ 
          transform: `scale(1.1) translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)` 
        }}
      >
         <picture>
           <source 
             srcSet="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=75&w=640&auto=format&fit=crop&fm=webp 640w, https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop&fm=webp 1200w, https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=85&w=2000&auto=format&fit=crop&fm=webp 2000w" 
             sizes="100vw"
             type="image/webp" 
           />
           <img 
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional software engineer focused on architecting industrial digital systems"
              className="w-full h-full object-cover opacity-100 dark:opacity-40 transition-opacity duration-700 animate-fade-in"
              loading="eager"
              // @ts-ignore - fetchPriority is a valid experimental attribute
              fetchPriority="high"
           />
         </picture>
         
         {/* Noise Texture for Realism */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Heavier Gradient Overlay for Guaranteed Legibility */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950/40 pointer-events-none animate-gradient-shift" 
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Decorative Parallax Icons - Deeper depth */}
      <div 
        className="absolute top-[20%] left-[5%] hidden xl:block text-blue-600 dark:text-blue-400 opacity-20 transition-all duration-300 ease-out will-change-transform z-0"
        style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0) rotate(${mousePos.x * 5}deg)` }}
      >
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-3xl backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl">
          <Code2 size={64} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
      <div 
        className="absolute bottom-[20%] right-[5%] hidden xl:block text-indigo-600 dark:text-indigo-400 opacity-20 transition-all duration-300 ease-out will-change-transform z-0"
        style={{ transform: `translate3d(${mousePos.x * -50}px, ${mousePos.y * -50}px, 0) rotate(${mousePos.y * -8}deg)` }}
      >
        <div className="bg-white/60 dark:bg-slate-800/60 p-8 rounded-3xl backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl">
          <Cpu size={80} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-50/90 dark:bg-blue-900/60 backdrop-blur-md text-blue-800 dark:text-blue-200 text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm border border-blue-200 dark:border-blue-700 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <Terminal size={18} className="animate-pulse" aria-hidden="true" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          {/* Tagline with Corrected Visibility, Glow, and Outline for readability */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.9] tracking-tighter mb-12 flex flex-wrap gap-x-5 gap-y-2 drop-shadow-2xl perspective-1000">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white drop-shadow-md text-glow' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 drop-shadow-lg'} inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-gpu will-change-transform backface-hidden`}
                style={{ 
                  transitionDelay: `${150 + i * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1) rotateX(0)' : 'translateY(40px) scale(0.9) rotateX(10deg)',
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Description - Corrected Visibility with subtle outline and glow */}
          <div 
            className={`relative mb-14 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="absolute -left-8 top-2 bottom-2 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full opacity-100 shadow-lg" />
            <p className="text-2xl md:text-3xl lg:text-4xl text-slate-950 dark:text-slate-100 font-bold max-w-3xl leading-snug pl-8 drop-shadow-xl text-glow">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          {/* Buttons - Ensured High Contrast backgrounds by removing partial opacity */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="w-full sm:w-auto relative z-20 font-black tracking-widest text-sm md:text-base border-2 border-slate-900 dark:border-blue-500 hover:border-slate-800 dark:hover:border-blue-400 ring-2 ring-white/30 dark:ring-blue-900/50 shadow-xl shadow-blue-900/20"
              aria-label="Start your industrial software project with OITS Dhaka"
            >
              Start Your Project <ArrowRight className="ml-4 transition-transform duration-300 group-hover:translate-x-2" size={24} aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToServices} 
              className="w-full sm:w-auto relative z-20 font-black tracking-widest text-sm md:text-base bg-white dark:bg-slate-950 backdrop-blur-xl border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg"
              aria-label="Explore our comprehensive engineering capability matrix"
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
                    <div className={`w-10 h-1.5 ${stat.color} rounded-full group-hover:w-16 transition-all duration-500 shadow-sm`} aria-hidden="true" />
                    <p className="text-[12px] text-slate-800 dark:text-slate-200 uppercase tracking-[0.25em] font-black shadow-black/5">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};