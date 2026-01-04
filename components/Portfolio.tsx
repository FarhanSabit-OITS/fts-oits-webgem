
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Tag, Clock, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId } from '../types';

// Portfolio component showcasing previous work with category filtering and interactive cards
export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  
  // Calculate counts for each category
  const categoryCounts = categories.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = PROJECTS.length;
    } else {
      acc[cat] = PROJECTS.filter(p => p.category === cat).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

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
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">Engineering excellence in every pixel.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-label={`Filter projects by ${cat}. ${categoryCounts[cat]} projects available.`}
                className={`group px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                  filter === cat 
                    ? 'bg-slate-950 text-white dark:bg-blue-600 shadow-xl' 
                    : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filter === cat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-1000 ease-out hover:shadow-2xl hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.demoVideoUrl && (
                    <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch demo video for ${project.title}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-950 hover:scale-110 transition-transform shadow-xl">
                      <Play size={20} fill="currentColor" />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit project website for ${project.title}`} className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">{project.title}</h4>
                  {project.status === 'Completed' && <CheckCircle size={18} className="text-green-500" aria-label="Project Completed" />}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies?.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Tag size={10} /> {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} /> {project.duration || '3-4 Months'}
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] hover:translate-x-1 transition-transform" aria-label={`View case study for ${project.title}`}>
                    Case Study →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
