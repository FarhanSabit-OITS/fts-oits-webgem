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
    setIsVisible(true);

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

    // Canvas Animation
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

          // Parallax Y is offset by scroll
          const drawY = this.y - scrollOffset * 0.15;

          // Mouse proximity force
          const dx = mouseData.x - this.x;
          const dy = mouseData.y - drawY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }

          // Boundary wrap
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
        const count = Math.min(80, (width * height) / 20000);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.classList.contains('dark');
        
        const currentMouseX = (mousePos.x / 2 + 0.5) * width;
        const currentMouseY = (mousePos.y / 2 + 0.5) * height;

        particles.forEach(p => {
          p.update({x: currentMouseX, y: currentMouseY}, scrollY);
          p.draw(ctx, scrollY, isDark);
        });

        // Constellation Lines
        const connectDistance = 150;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = (particles[i].y - scrollY * 0.15) - (particles[j].y - scrollY * 0.15);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDistance) {
              const opacity = (1 - dist / connectDistance) * 0.2;
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
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePos, scrollY]);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* High-Performance Native Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/95 dark:via-slate-950/40 dark:to-slate-950/95" />
      </div>

      {/* Decorative Interactive Icons with enhanced Parallax */}
      <div 
        className="absolute top-[15%] left-[5%] hidden lg:block text-blue-600/20 dark:text-blue-400/20 transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0) rotate(${mousePos.x * 12}deg)` }}
      >
        <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-slate-800/40 shadow-xl">
          <Code2 size={64} strokeWidth={1} />
        </div>
      </div>
      <div 
        className="absolute bottom-[20%] right-[8%] hidden lg:block text-indigo-600/20 dark:text-indigo-400/20 transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translate3d(${mousePos.x * -70}px, ${mousePos.y * -70}px, 0) rotate(${mousePos.y * -15}deg)` }}
      >
        <div className="bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-slate-800/40 shadow-xl">
          <Cpu size={80} strokeWidth={1} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50/90 dark:bg-blue-900/40 backdrop-blur-sm text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest mb-10 shadow-sm border border-blue-100 dark:border-blue-800/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Terminal size={18} className="animate-pulse" />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          <h1 className="text-glow text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter mb-10 flex flex-wrap gap-x-4">
            {TAGLINE.split(' ').map((word, i) => (
              <span 
                key={i} 
                className={`${i < 2 ? 'text-slate-950 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-300 drop-shadow-sm'} inline-block animate-in fade-in slide-in-from-bottom-12 duration-1000 transform-gpu`}
                style={{ animationDelay: `${i * 120}ms`, scale: isVisible ? '1' : '0.9' }}
              >
                {word}
              </span>
            ))}
          </h1>

          <div className="relative mb-14 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-[800ms]">
            <div className="absolute -left-6 top-1 bottom-1 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
            <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 font-bold max-w-3xl leading-[1.35] pl-8 drop-shadow-sm">
              We architect high-performance digital systems for global disruptors. <br className="hidden md:block" />
              From strategic consultation to industrial-grade deployment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[1000ms]">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToContact} 
              className="group w-full sm:w-auto shadow-2xl relative z-20"
              aria-label="Start your project with OITS Dhaka"
            >
              Start Your Project <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToServices} 
              className="w-full sm:w-auto relative z-20 font-black"
              aria-label="Explore our full capability matrix"
            >
              Our Capabilities
            </Button>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in duration-1000 delay-[1200ms]">
             {[
               { val: "150+", label: "Deliveries", color: "bg-blue-600" },
               { val: "50+", label: "Engineers", color: "bg-indigo-600" },
               { val: "98%", label: "Satisfaction", color: "bg-green-600" },
               { val: "24/7", label: "Support", color: "bg-yellow-500" }
             ].map((stat, i) => (
               <div key={i} className="group cursor-default animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${1300 + (i * 150)}ms` }}>
                  <p className="text-glow text-4xl md:text-5xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors drop-shadow-sm">{stat.val}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-8 h-1 ${stat.color} rounded-full group-hover:w-12 transition-all duration-300`} />
                    <p className="text-[11px] text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em] font-black">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};