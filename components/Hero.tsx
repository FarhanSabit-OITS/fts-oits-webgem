
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Cpu, Zap, Code, Database } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered activation
    const timer = setTimeout(() => setIsVisible(true), 200);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
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
      x: number; y: number; size: number; speedX: number; speedY: number; color: string; alpha: number; targetAlpha: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        // Theme-aware colors: Cool blue for dark, vibrant cyan for light
        this.color = isDarkMode ? '59, 130, 246' : '14, 165, 233';
        this.alpha = Math.random() * 0.3 + 0.05;
        this.targetAlpha = this.alpha;
      }
      update() {
        this.x += this.speedX + (mousePos.x * 0.5);
        this.y += this.speedY + (mousePos.y * 0.5);
        if (Math.abs(this.alpha - this.targetAlpha) < 0.01) this.targetAlpha = Math.random() * 0.3 + 0.05;
        else this.alpha += (this.targetAlpha - this.alpha) * 0.01;
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
      const numberOfParticles = Math.floor(window.innerWidth / 15);
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) { p.update(); p.draw(); }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resizeCanvas(); init(); });
    resizeCanvas(); init(); animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <section ref={containerRef} id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[100vh] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 transition-opacity duration-1000"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-loop-animation-4424-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50/90 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95 transition-colors duration-500" />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />

        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] opacity-70 animate-float will-change-transform" 
          style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)` }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-10 text-center lg:text-left relative z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 dark:bg-blue-900/30 backdrop-blur-2xl border border-blue-100 dark:border-blue-800 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em] shadow-sm transition-all duration-[1200ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Pioneering Enterprise Solutions
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] overflow-hidden">
                <span className={`block transition-all duration-[1500ms] delay-[100ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
                  We Engineer
                </span>
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 transition-all duration-[1500ms] delay-[300ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
                  Digital Mastery
                </span>
              </h1>
            </div>
            
            <p className={`text-xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium transition-all duration-[1500ms] delay-[500ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {TAGLINE}. High-performance engineering for the visionary age.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start transition-all duration-[1500ms] delay-[700ms] ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" variant="primary" aria-label="Request a demo"
                className="group h-20 px-14 rounded-3xl font-black text-xl transition-all duration-300" 
                onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              >
                Launch Project
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-20 px-12 rounded-3xl group font-black text-xl backdrop-blur-md" aria-label="Learn how we work">
                <Play className="mr-3 w-5 h-5 fill-current" />
                Workflow
              </Button>
            </div>
          </div>

          {/* Right Column: Animated "Lottie-style" SVG and Parallax Card */}
          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-[2000ms] delay-[400ms] ease-out transform ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-24 rotate-3'}`}>
            <div className="relative" style={{ perspective: '2000px' }}>
              <div 
                className="relative bg-white/10 dark:bg-slate-900/20 backdrop-blur-3xl border-2 border-white/20 dark:border-slate-800 rounded-[4rem] shadow-2xl overflow-hidden aspect-[1/1] flex items-center justify-center transform-gpu transition-all duration-700 hover:shadow-blue-500/10"
                style={{ transform: `rotateY(${mousePos.x * -15}deg) rotateX(${mousePos.y * 15}deg) translateZ(50px)` }}
              >
                {/* Custom Digital Transformation SVG Animation */}
                <svg viewBox="0 0 400 400" className="w-4/5 h-4/5">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Floating Tech Orbs */}
                  <g className="animate-float" style={{ animationDuration: '4s' }}>
                    <circle cx="200" cy="200" r="100" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
                    <circle cx="200" cy="200" r="140" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="20 10" className="animate-[spin_40s_linear_infinite_reverse]" />
                    
                    {/* Pulsing Core */}
                    <circle cx="200" cy="200" r="40" fill="url(#grad1)" className="animate-pulse opacity-40" filter="url(#glow)" />
                    <g className="text-white">
                       <rect x="180" y="180" width="40" height="40" rx="8" fill="rgba(255,255,255,0.2)" backdrop-filter="blur(4px)" stroke="white" strokeWidth="2" />
                       <path d="M190 200 L197 207 L210 193" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </g>

                  {/* Tech Connectors */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const r = 140;
                    const x = 200 + r * Math.cos((angle * Math.PI) / 180);
                    const y = 200 + r * Math.sin((angle * Math.PI) / 180);
                    return (
                      <g key={i}>
                        <line x1="200" y1="200" x2={x} y2={y} stroke="url(#grad1)" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                        <circle cx={x} cy={y} r="8" fill="url(#grad1)" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              {/* Parallax Floating Card */}
              <div 
                className="absolute -bottom-10 -right-10 md:-right-16 p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 flex items-center gap-6 z-20 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px) rotateZ(${mousePos.x * 5}deg)` }}
              >
                <div className="w-16 h-16 rounded-[1.25rem] bg-blue-100 dark:bg-blue-600 flex items-center justify-center text-blue-600 dark:text-white shadow-xl shadow-blue-500/20">
                  <Cpu size={32} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">Enterprise Scaled</p>
                </div>
              </div>

              <div 
                className="absolute -top-10 -left-10 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 z-20 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-600 flex items-center justify-center text-indigo-600 dark:text-white">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">99.9% Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
