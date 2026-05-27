import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, PenTool, Cloud, Code2, Server, Database, Layers, Terminal, Users } from 'lucide-react';
import { SERVICES, TECH_DOMAINS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8" />,
  Smartphone: <Smartphone className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Terminal: <Terminal className="w-8 h-8" />,
};

const domainIcons: Record<string, React.ReactNode> = {
  frontend: <Code2 size={18} />,
  backend: <Server size={18} />,
  mobile: <Smartphone size={18} />,
  database: <Database size={18} />,
  cloud: <Cloud size={18} />,
  specialized: <Layers size={18} />,
};

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(TECH_DOMAINS[0].id);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
          y: (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2),
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const expertiseTitle = "Comprehensive solutions for digital transformation.";

  return (
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-32 bg-white dark:bg-slate-950 relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-24 rotate-[-6deg]'}`}>
          <div className="max-w-2xl relative">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white leading-tight tracking-tighter cursor-default flex flex-wrap">
              {expertiseTitle.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="mr-3 transition-all duration-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 inline-block transform-gpu will-change-transform"
                  style={{ 
                    transform: isVisible ? `translate(${mousePos.x * (15 + i * 2)}px, ${mousePos.y * (10 + i * 1.5)}px)` : 'none'
                  }}
                >
                  {word}
                </span>
              ))}
            </h3>
          </div>
          <p className="text-slate-900 dark:text-slate-100 max-w-md pb-2 text-xl font-bold leading-relaxed">We leverage modern architectures and industry best practices to build software that lasts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              id={`service-card-${service.id}`}
              className={`group relative bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] sm:rounded-[3.5rem] p-8 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/40 hover:border-blue-500/30 transform-gpu ${isVisible ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-32 rotate-[-10deg] scale-90'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-20 h-20 shrink-0 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-900 dark:text-white shadow-xl mb-10 transition-all duration-700 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-125 group-hover:shadow-blue-500/40 group-hover:rotate-6">
                <div className="transition-all duration-500 group-hover:rotate-12 transform-gpu">
                  {iconMap[service.icon]}
                </div>
              </div>

              <h4 className="text-2xl font-black text-slate-950 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight text-glow">
                {service.title}
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-10 text-base leading-relaxed font-semibold">{service.description}</p>

              <div className="flex flex-wrap gap-2.5">
                {service.features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className={`px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-300 shadow-sm transition-all duration-500 transform scale-50 opacity-0 translate-y-6 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 transform-gpu`}
                    style={{ transitionDelay: `${(idx + 1) * 80}ms` }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-32 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm ring-1 ring-blue-500/20"><Layers size={16} /> Technology Stack</div>
             <h3 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 tracking-tighter leading-tight text-glow">Built with industrial strength.</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[4rem] shadow-2xl dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500">
             <div className="grid grid-cols-2 lg:flex lg:flex-row border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3 sm:p-5 gap-2.5 sm:gap-4 justify-center" role="tablist">
                {TECH_DOMAINS.map((domain) => (
                  <button 
                    key={domain.id} 
                    onClick={() => setActiveTab(domain.id)} 
                    role="tab" 
                    aria-selected={activeTab === domain.id} 
                    aria-label={`View ${domain.label} technologies`}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black transition-all duration-300 w-full lg:w-auto active:scale-95 transform-gpu ${activeTab === domain.id ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xl ring-2 ring-blue-500/10' : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/40'}`}
                  >
                    {domainIcons[domain.id]} <span className="truncate">{domain.label}</span>
                  </button>
                ))}
             </div>
             <div className="p-4 sm:p-8 md:p-14 min-h-[450px]" id="tech-skills-grid-wrapper">
                {TECH_DOMAINS.map((domain) => (
                  <div key={domain.id} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 ${activeTab === domain.id ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`} style={{ display: activeTab === domain.id ? 'grid' : 'none' }}>
                    {domain.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all duration-500 group cursor-default hover:bg-blue-600 hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-900/30 transform-gpu will-change-transform">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all shadow-md group-hover:scale-110 group-hover:rotate-6"><Terminal size={18} className="sm:w-5 sm:h-5" /></div>
                         <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-white text-xs sm:text-sm md:text-base tracking-tight transition-colors duration-300 whitespace-normal break-words leading-tight text-left">{skill}</span>
                      </div>
                    ))}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};