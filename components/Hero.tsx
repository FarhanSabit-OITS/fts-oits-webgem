
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, LayoutGrid, Play, Zap, Cpu } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Particle Background Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isDarkMode = document.documentElement.classList.contains('dark');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string; alpha: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        // Theme-aware particle color
        this.color = isDarkMode ? '59, 130, 246' : '37, 99, 235';
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update(mX: number, mY: number) {
        // Particles react to mouse position
        this.x += this.speedX + (mX * 0.4);
        this.y += this.speedY + (mY * 0.4);
        
        if (canvas) {
          if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor(window.innerWidth / 12);
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) { 
        p.update(mousePos.x, mousePos.y); 
        p.draw(); 
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resizeCanvas(); init(); });
    resizeCanvas(); init(); animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const scrollToPortfolio = () => {
    document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleLine1 = "We Engineer";
  const titleLine2 = "Digital Mastery";
  const taglineWords = TAGLINE.split(' ');

  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[100vh] flex items-center">
      {/* Background Layers */}
      <div className="absolute top-0 left-0 w-full h-full -z-40 overflow-hidden pointer-events-none">
        {/* Layer 1: Parallax Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20 transition-transform duration-1000 ease-out will-change-transform scale-110"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40 + scrollY * 0.15}px) scale(1.1)`
          }}
          aria-hidden="true"
        />
        
        {/* Layer 2: Theme Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/95 via-slate-50/70 to-slate-50/95 dark:from-slate-950/95 dark:via-slate-950/85 dark:to-slate-950/95" />
        
        {/* Layer 3: Particle Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-20 opacity-50 pointer-events-none" 
          aria-hidden="true" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="flex-1 space-y-10 text-center lg:text-left relative">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-3xl border border-blue-200 dark:border-blue-800 text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.25em] shadow-sm transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Pioneering Enterprise Solutions
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
                <span className="block overflow-hidden">
                  {titleLine1.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[800ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                      style={{ transitionDelay: `${i * 100 + 200}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 overflow-hidden">
                   {titleLine2.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[800ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                      style={{ transitionDelay: `${i * 100 + 500}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium overflow-hidden flex flex-wrap justify-center lg:justify-start">
              {taglineWords.map((word, i) => (
                <span 
                  key={i}
                  className={`inline-block transition-all duration-[600ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 50 + 800}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start transition-all duration-[1000ms] delay-[1200ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" variant="primary" 
                className="group h-20 px-14 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/30 hover:scale-[1.08] active:scale-95 transition-all duration-300" 
                onClick={scrollToContact}
              >
                Launch Project
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                variant="outline" size="lg" 
                className="h-20 px-12 rounded-3xl group font-black text-xl backdrop-blur-xl border-2 hover:bg-slate-900 hover:text-white"
                onClick={scrollToPortfolio}
              >
                <LayoutGrid className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Request Demo
              </Button>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-[1500ms] delay-[400ms] ease-out transform ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-24 rotate-3'}`}>
             <div className="relative group" style={{ perspective: '2000px' }}>
                <div 
                  className="relative bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden aspect-[4/3] transform-gpu transition-all duration-700 hover:scale-[1.02] z-10"
                  style={{ transform: `rotateY(${mousePos.x * -15}deg) rotateX(${mousePos.y * 15}deg)` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Digital Innovation Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent" />
                </div>
                
                {/* Enhanced Interactive Parallax Elements */}
                <div 
                  className="absolute -bottom-10 -left-10 md:-left-16 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePos.x * 70}px, ${mousePos.y * 70}px) rotateZ(${mousePos.x * 5}deg)` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                     <Cpu size={28} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Elite Scalability</p>
                  </div>
                </div>

                <div 
                  className="absolute -top-8 -right-8 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 z-20 transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px) rotateZ(${mousePos.y * -5}deg)` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white">
                    <Zap size={22} className="animate-bounce" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">99.9% Uptime</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
