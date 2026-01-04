import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Code2, Cpu, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE } from '../constants';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles: any[] = [];
      let animationFrameId: number;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      class Particle {
        x: number; y: number; size: number; speedX: number; speedY: number;
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * 0.4 - 0.2;
          this.speedY = Math.random() * 0.4 - 0.2;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x > canvas.width) this.x = 0;
          if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          if (this.y < 0) this.y = canvas.height;
        }
        draw() {
          if (!ctx) return;
          const isDark = document.documentElement.classList.contains('dark');
          ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(14, 165, 233, 0.15)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const init = () => {
        particles = [];
        for (let i = 0; i < 70; i++) particles.push(new Particle());
      };

      const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener('resize', resize);
      resize();
      init();
      animate();

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
      };
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Background Animation Fix (Reliable Public URL) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30 dark:opacity-20">
        <div 
          className="w-full h-full max-w-[1400px] max-h-[1400px] scale-125 md:scale-100 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        >
          <dotlottie-player
            src="https://lottie.host/64731853-6239-4977-84f9-25f05a18a8f0/U3xT2WvK8M.json"
            background="transparent"
            speed="0.6"
            style={{ width: '100%', height: '100%' }}
            loop={true}
            autoplay={true}
          ></dotlottie-player>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-slate-950/95" />
      </div>

      {/* More Interactive Parallax Floating Icons */}
      <div 
        className="absolute top-[18%] left-[8%] hidden lg:block text-blue-600/20 dark:text-blue-400/30 animate-float transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px) rotate(${mousePos.x * 10}deg)` }}
      >
        <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl">
          <Code2 size={64} strokeWidth={1.5} />
        </div>
      </div>
      <div 
        className="absolute bottom-[25%] right-[12%] hidden lg:block text-indigo-600/20 dark:text-indigo-400/30 animate-float transition-transform duration-1000 ease-out"
        style={{ animationDelay: '1.2s', transform: `translate(${mousePos.x * -90}px, ${mousePos.y * -90}px) rotate(${mousePos.y * -15}deg)` }}
      >
        <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl">
          <Cpu size={80} strokeWidth={1.5} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50/90 dark:bg-blue-900/40 backdrop-blur-sm text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest mb-10 shadow-sm border border-blue-100 dark:border-blue-800/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Terminal size={18} className="animate-slow-pulse" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          {/* Main Tagline with Pronounced Stagger and Glow */}
          <h1 className="text-glow text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter mb-10 flex flex-wrap gap-x-4">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 drop-shadow-md'} inline-block animate-in fade-in slide-in-from-bottom-12 duration-1000 transform-gpu`}
                style={{ animationDelay: `${i * 150}ms`, scale: isVisible ? '1' : '0.8' }}
              >
                {word}
              </span>
            ))}
          </h1>

          <div className="relative mb-14 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-[1000ms]">
            <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
            <p className="text-glow text-xl md:text-3xl text-slate-900 dark:text-slate-100 font-bold max-w-3xl leading-[1.3] pl-8 drop-shadow-sm">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[1400ms]">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="group w-full sm:w-auto hover:ring-4 hover:ring-blue-500/20 transition-all shadow-2xl"
            >
              Start Project Inquiry <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices} className="w-full sm:w-auto">
              Our Capability Matrix
            </Button>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in duration-1000 delay-[1800ms]">
             {[
               { val: "150+", label: "Deliveries", color: "bg-blue-600" },
               { val: "50+", label: "Engineers", color: "bg-indigo-600" },
               { val: "98%", label: "Satisfaction", color: "bg-green-600" },
               { val: "24/7", label: "Support", color: "bg-yellow-500" }
             ].map((stat, i) => (
               <div key={i} className="group cursor-default">
                  <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">{stat.val}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-6 h-0.5 ${stat.color} rounded-full group-hover:w-10 transition-all`} />
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] font-black">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};