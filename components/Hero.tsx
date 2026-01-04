
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, LayoutGrid, Zap, Cpu, Code2, Rocket, Server, Database } from 'lucide-react';
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

  // Theme-aware Dynamic Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; alpha: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update(mX: number, mY: number, sY: number) {
        // Particles react to mouse and scroll
        this.x += this.speedX + (mX * 0.2);
        this.y += this.speedY + (mY * 0.2) + (sY * 0.02);
        
        if (canvas) {
          if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
        }
      }
      draw(isDark: boolean) {
        if (!ctx) return;
        // High visibility theme-adaptive colors
        ctx.fillStyle = isDark ? `rgba(56, 189, 248, ${this.alpha})` : `rgba(37, 99, 235, ${this.alpha * 0.8})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 12);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) { p.update(mousePos.x, mousePos.y, scrollY); p.draw(isDarkMode); }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resizeCanvas(); init(); });
    resizeCanvas(); init(); animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, scrollY]);

  const scrollToPortfolio = () => document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });

  const titleLine1 = "We Engineer";
  const titleLine2 = "Digital Mastery";
  const taglineWords = TAGLINE.split(' ');

  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[100vh] flex items-center">
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-50 overflow-hidden pointer-events-none">
        {/* Subtle, high-quality looping video background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-10 transition-opacity duration-1000 scale-105"
          poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-loop-animation-4424-large.mp4" type="video/mp4" />
        </video>
        
        {/* Layered overlays for contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/98 via-slate-50/90 to-slate-50/98 dark:from-slate-950/98 dark:via-slate-950/92 dark:to-slate-950/98 transition-colors duration-500" />
        
        {/* Interactive Dynamic Particle Overlay */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-20 opacity-60 dark:opacity-40 pointer-events-none" 
        />
        
        {/* Glowing Decorative Blobs */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[220px] opacity-70 animate-float z-0" 
          style={{ transform: `translate(${mousePos.x * -100}px, ${mousePos.y * -100}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-40">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-28">
          
          {/* Main Staggered Content Area */}
          <div className="flex-1 space-y-12 text-center lg:text-left relative z-50">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100/90 dark:bg-blue-900/50 backdrop-blur-3xl border border-blue-200 dark:border-blue-800 text-[11px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-[0.35em] shadow-sm transition-all duration-[1200ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              Architecting Digital Futures
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-slate-950 dark:text-white tracking-tighter leading-[0.9] pb-4 drop-shadow-sm">
                <span className="block overflow-hidden h-auto py-2">
                  {titleLine1.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-full scale-90'}`}
                      style={{ transitionDelay: `${i * 150 + 200}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 dark:from-blue-500 dark:via-indigo-400 dark:to-sky-400 py-6 -my-6 h-auto min-h-[1.1em] overflow-visible text-glow">
                   {titleLine2.split(' ').map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block transition-all duration-[1000ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-full scale-90'}`}
                      style={{ transitionDelay: `${i * 150 + 600}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold flex flex-wrap justify-center lg:justify-start">
              {taglineWords.map((word, i) => (
                <span 
                  key={i}
                  className={`inline-block transition-all duration-[800ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 60 + 1000}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
              <span className={`inline-block transition-all duration-[1200ms] delay-[1400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                High-performance software engineering combined with award-winning design thinking.
              </span>
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start transition-all duration-[1000ms] delay-[1800ms] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative z-50`}>
              <Button 
                size="lg" variant="primary" 
                className="group h-20 px-14 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/50 hover:scale-[1.1] active:scale-95 transition-all duration-500" 
                onClick={scrollToContact}
              >
                Launch Project 
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                variant="outline" size="lg" 
                className="h-20 px-12 rounded-3xl group font-black text-xl border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-950 hover:text-white transition-all duration-300 backdrop-blur-md"
                onClick={scrollToPortfolio}
              >
                <LayoutGrid className="mr-3 w-5 h-5 group-hover:rotate-12" /> Explore Work
              </Button>
            </div>
          </div>

          {/* Right Visual Area: Interactive Lottie Animation */}
          <div className={`flex-1 w-full max-w-2xl lg:max-w-none transition-all duration-[1800ms] delay-[400ms] transform ${isVisible ? 'opacity-100 translate-x-0 rotate-0 scale-100' : 'opacity-0 translate-x-32 rotate-6 scale-90'} relative`}>
             <div className="relative group" style={{ perspective: '2000px' }}>
                <div 
                  className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-4 border-white dark:border-slate-800 rounded-[5rem] shadow-[0_80px_120px_-40px_rgba(0,0,0,0.25)] dark:shadow-none overflow-hidden aspect-[4/3] transform-gpu transition-all duration-700 hover:scale-[1.03] z-10 flex items-center justify-center p-4"
                  style={{ transform: `rotateY(${mousePos.x * -12}deg) rotateX(${mousePos.y * 12}deg)` }}
                >
                   {/* Dynamic Lottie Animation representing Digital Transformation */}
                   <dotlottie-player
                    src="https://lottie.host/80f7f32f-4f81-4b1a-8c3e-90c008f5d02e/7vE6mGfM6M.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100%', height: '100%' }}
                    direction="1"
                    playMode="normal"
                    loop
                    autoplay
                  ></dotlottie-player>
                </div>

                {/* Interactive Floating Parallax Elements */}
                <div 
                  className="absolute -bottom-12 -left-12 md:-left-20 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-300 ease-out"
                  style={{ transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px) rotateZ(${mousePos.x * 5}deg)` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                     <Cpu size={32} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Architecture</p>
                    <p className="text-2xl font-black text-slate-950 dark:text-white leading-tight">Enterprise Scale</p>
                  </div>
                </div>

                <div 
                  className="absolute -top-16 -right-12 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-300 ease-out"
                  style={{ transform: `translate(${mousePos.x * -80}px, ${mousePos.y * -80}px) rotateZ(${mousePos.y * -8}deg)` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white group-hover:rotate-12 transition-transform duration-500">
                    <Zap size={28} className="animate-subtle-bounce" />
                  </div>
                  <div className="pr-2">
                    <p className="text-xl font-black text-slate-950 dark:text-white leading-tight">99.9% Uptime</p>
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
