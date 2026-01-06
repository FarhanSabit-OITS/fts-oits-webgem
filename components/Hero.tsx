import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Code2, Cpu } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE } from '../constants';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    // Canvas Animation - High-performance fallback system
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let particles: Particle[] = [];
      let animationFrameId: number;
      let width = window.innerWidth;
      let height = window.innerHeight;

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
      };

      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;

        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = Math.random() * 1.5 + 1;
          this.speedX = Math.random() * 0.4 - 0.2;
          this.speedY = Math.random() * 0.4 - 0.2;
        }

        update(mouseData: {x: number, y: number}, scrollOffset: number) {
          this.x += this.speedX;
          this.y += this.speedY;

          const drawY = this.y - scrollOffset * 0.15;
          const currentMouseX = (mouseData.x / 2 + 0.5) * width;
          const currentMouseY = (mouseData.y / 2 + 0.5) * height;
          
          const dx = currentMouseX - this.x;
          const dy = currentMouseY - drawY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.x -= (dx / distance) * force * 1.2;
            this.y -= (dy / distance) * force * 1.2;
          }

          if (this.x > width) this.x = 0;
          if (this.x < 0) this.x = width;
          if (this.y > height + scrollOffset * 0.15) this.y = scrollOffset * 0.15;
          if (this.y < scrollOffset * 0.15 - 100) this.y = height + scrollOffset * 0.15;
        }

        draw(ctx: CanvasRenderingContext2D, scrollOffset: number, isDark: boolean) {
          ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.3)';
          ctx.beginPath();
          ctx.arc(this.x, this.y - scrollOffset * 0.15, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }

      const init = () => {
        particles = [];
        const count = Math.min(100, (width * height) / 15000);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.classList.contains('dark');
        
        particles.forEach(p => {
          p.update(mousePos, scrollY);
          p.draw(ctx, scrollY, isDark);
        });

        const connectDistance = 160;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = (particles[i].y - scrollY * 0.15) - (particles[j].y - scrollY * 0.15);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDistance) {
              const opacity = (1 - dist / connectDistance) * 0.15;
              ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(14, 165, 233, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y - scrollY * 0.15);
              ctx.lineTo(particles[j].x, particles[j].y - scrollY * 0.15);
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener('resize', resize);
      resize();
      animate();

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [mousePos, scrollY]);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" />

      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0) translate(30%, -30%)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0) translate(-30%, 30%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/95 dark:via-slate-950/40 dark:to-slate-950/95" />
      </div>

      {/* Decorative Parallax Icons */}
      <div 
        className="absolute top-[18%] left-[8%] hidden lg:block text-blue-600 dark:text-blue-400 opacity-20 transition-all duration-700 ease-out will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * -50}px, ${mousePos.y * -50}px, 0) rotate(${mousePos.x * 15}deg) scale(${1 + Math.abs(mousePos.x) * 0.1})` }}
      >
        <div className="bg-white/40 dark:bg-slate-900/40 p-8 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 dark:border-slate-800/40 shadow-2xl">
          <Code2 size={72} strokeWidth={1} />
        </div>
      </div>
      <div 
        className="absolute bottom-[22%] right-[10%] hidden lg:block text-indigo-600 dark:text-indigo-400 opacity-20 transition-all duration-700 ease-out will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * -90}px, ${mousePos.y * -90}px, 0) rotate(${mousePos.y * -20}deg) scale(${1 + Math.abs(mousePos.y) * 0.12})` }}
      >
        <div className="bg-white/40 dark:bg-slate-900/40 p-8 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 dark:border-slate-800/40 shadow-2xl">
          <Cpu size={84} strokeWidth={1} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-50/90 dark:bg-blue-900/40 backdrop-blur-md text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm border border-blue-100 dark:border-blue-800/50 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <Terminal size={18} className="animate-pulse" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          <h1 className="text-glow text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter mb-12 flex flex-wrap gap-x-5 drop-shadow-md">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 drop-shadow-sm'} inline-block transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu`}
                style={{ 
                  transitionDelay: `${i * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)'
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <div 
            className={`relative mb-16 transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="absolute -left-8 top-1 bottom-1 w-2 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
            <p className="text-2xl md:text-4xl text-slate-800 dark:text-slate-200 font-bold max-w-3xl leading-[1.3] pl-8 drop-shadow-sm text-glow">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          <div 
            className={`flex flex-col sm:flex-row items-center gap-8 transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="group w-full sm:w-auto shadow-2xl relative z-20 font-black tracking-widest border-2 border-white/10 dark:border-blue-500/30"
              aria-label="Start your project with OITS Dhaka"
            >
              Start Your Project <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform duration-300" size={26} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToServices} 
              className="w-full sm:w-auto relative z-20 font-black tracking-widest bg-white/30 backdrop-blur-xl dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white hover:border-blue-600 dark:hover:border-blue-400"
              aria-label="Explore our full capability matrix"
            >
              Our Capabilities
            </Button>
          </div>

          <div 
            className={`mt-24 pt-16 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-12 transition-all duration-[1800ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1300ms' }}
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
                   transitionDelay: `${1400 + (i * 150)}ms`,
                   transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                   opacity: isVisible ? 1 : 0
                 }}
               >
                  <p className="text-glow text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 drop-shadow-sm">{stat.val}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className={`w-10 h-1.5 ${stat.color} rounded-full group-hover:w-16 transition-all duration-500`} />
                    <p className="text-[12px] text-slate-700 dark:text-slate-400 uppercase tracking-[0.25em] font-black">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};