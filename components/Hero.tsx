
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, LayoutGrid, Zap, Cpu } from 'lucide-react';
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

  // Theme-aware Dynamic Particle Background Logic
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
        this.size = Math.random() * 1.5 + 0.2;
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;
        this.color = isDarkMode ? '56, 189, 248' : '37, 99, 235'; 
        this.alpha = Math.random() * 0.3 + 0.1;
      }
      update(mX: number, mY: number) {
        this.x += this.speedX + (mX * 0.3);
        this.y += this.speedY + (mY * 0.3);
        
        if (canvas) {
          if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = isDarkMode ? `rgba(56, 189, 248, ${this.alpha})` : `rgba(37, 99, 235, ${this.alpha})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor(window.innerWidth / 18);
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) { p.update(mousePos.x, mousePos.y); p.draw(); }
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
      
      {/* Dynamic Background Layers */}
      <div className="absolute top-0 left-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Looping Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-5 transition-opacity duration-1000 scale-105"
          style={{ transform: `scale(1.05) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
          poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-loop-animation-4424-large.mp4" type="video/mp4" />
        </video>

        {/* Layer 2: Theme-aware Gradient Mesh */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/95 via-slate-50/80 to-slate-50/95 dark:from-slate-950/98 dark:via-slate-950/90 dark:to-slate-950/98 transition-colors duration-500" />
        
        {/* Layer 3: Interactive Particle Overlay */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-20 opacity-30 pointer-events-none" 
          aria-hidden="true" 
        />
        
        {/* Layer 4: Abstract Glowing Blobs */}
        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[180px] opacity-70 animate-float will-change-transform z-0" 
          style={{ transform: `translate(${mousePos.x * -120}px, ${mousePos.y * -120}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Main Staggered Entrance Content */}
          <div className="flex-1 space-y-10 text-center lg:text-left relative z-40">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/90 dark:bg-blue-900/40 backdrop-blur-3xl border border-blue-200 dark:border-blue-800 text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em] shadow-sm transition-all duration-[1200ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Engineering High-Performance Futures
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
                <span className="block overflow-hidden">
                  {titleLine1.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-full scale-95'}`}
                      style={{ transitionDelay: `${i * 150 + 200}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 overflow-hidden">
                   {titleLine2.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-full scale-95'}`}
                      style={{ transitionDelay: `${i * 150 + 600}ms` }}
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
                  className={`inline-block transition-all duration-[800ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 70 + 1000}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
              <span className={`inline-block transition-all duration-[1200ms] delay-[1400ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                High-performance software engineering combined with award-winning design thinking.
              </span>
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start transition-all duration-[1000ms] delay-[1800ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" variant="primary" 
                className="group h-20 px-14 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/40 hover:scale-[1.1] active:scale-95 transition-all duration-500 z-50" 
                onClick={scrollToContact}
              >
                Launch Project
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                variant="outline" size="lg" 
                className="h-20 px-12 rounded-3xl group font-black text-xl backdrop-blur-3xl border-2 hover:bg-slate-900 hover:text-white z-50 transition-all duration-300"
                onClick={scrollToPortfolio}
              >
                <LayoutGrid className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Explore Portfolio
              </Button>
            </div>
          </div>

          {/* Right Visual Area: High Quality Laptop/Coding Image with Interaction */}
          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-[1800ms] delay-[400ms] ease-out transform ${isVisible ? 'opacity-100 translate-x-0 rotate-0 scale-100' : 'opacity-0 translate-x-32 rotate-6 scale-90'}`}>
             <div className="relative group" style={{ perspective: '2500px' }}>
                <div 
                  className="relative bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 rounded-[4rem] shadow-[0_80px_120px_-40px_rgba(0,0,0,0.25)] overflow-hidden aspect-[4/3] transform-gpu transition-all duration-700 hover:scale-[1.03] z-10"
                  style={{ transform: `rotateY(${mousePos.x * -20}deg) rotateX(${mousePos.y * 20}deg)` }}
                >
                   <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                    alt="Premium Coding Interface" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                </div>
                
                {/* Floating Cards with Pronounced Parallax */}
                <div 
                  className="absolute -bottom-12 -left-12 md:-left-20 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-300 ease-out"
                  style={{ transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px) rotateZ(${mousePos.x * 10}deg)` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                     <Cpu size={30} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Enterprise Scale</p>
                  </div>
                </div>

                <div 
                  className="absolute -top-16 -right-16 p-7 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-5 z-20 transition-transform duration-300 ease-out"
                  style={{ transform: `translate(${mousePos.x * -80}px, ${mousePos.y * -80}px) rotateZ(${mousePos.y * -10}deg)` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white group-hover:rotate-12 transition-transform duration-500">
                    <Zap size={26} className="animate-subtle-bounce" />
                  </div>
                  <div className="pr-4">
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">99.9% Uptime</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guaranteed SLA</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
