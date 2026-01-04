
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Trigger animations immediately on mount for Hero section to avoid "late" loading
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string; alpha: number; targetAlpha: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.color = Math.random() > 0.5 ? '59, 130, 246' : '99, 102, 241';
        this.alpha = Math.random() * 0.4 + 0.1;
        this.targetAlpha = this.alpha;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (Math.abs(this.alpha - this.targetAlpha) < 0.01) this.targetAlpha = Math.random() * 0.4 + 0.1;
        else this.alpha += (this.targetAlpha - this.alpha) * 0.02;
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
      for (let p of particles) { p.update(); p.draw(); }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resizeCanvas(); init(); });
    resizeCanvas(); init(); animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[95vh] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 blur-md scale-110 will-change-transform transition-transform duration-700 ease-out"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30 + scrollY * 0.1}px) scale(1.1)`
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/70 to-slate-50/90 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-slate-950/90" />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div 
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] opacity-60 animate-float will-change-transform" 
          style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px] opacity-60 will-change-transform" 
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for new projects
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] transition-all duration-700 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              We Craft <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Excellence</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {TAGLINE}. We build robust software solutions that drive business growth, combining technical expertise with stunning design.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Button 
                size="lg" variant="primary" aria-label="Request a demo and start your journey"
                className="group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/40" 
                onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request a Demo
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700" aria-label="Learn how we work">
                <Play className="mr-2 w-4 h-4 fill-slate-900 dark:fill-white" />
                How We Work
              </Button>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-xl lg:max-w-none transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative" style={{ transform: `perspective(1000px) rotateY(${mousePos.x * -10}deg) rotateX(${mousePos.y * 10}deg)` }}>
              <div className="absolute top-4 -right-4 w-full h-full bg-slate-200/50 dark:bg-slate-700/30 rounded-2xl -rotate-2 backdrop-blur-sm" aria-hidden="true"></div>
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group">
                <img src="https://picsum.photos/800/600?random=10" alt="Software Preview" loading="eager" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl shadow-lg transform transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 animate-pulse"><Play size={16} fill="currentColor" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Project Performance</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">Real-time Analytics</p>
                    </div>
                    <div className="ml-auto text-green-600 dark:text-green-400 font-bold text-sm">+24%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
