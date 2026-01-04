import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Tag, Clock, CheckCircle, RotateCcw, Filter, Eye, ChevronRight, X, Sparkles, Target, Settings, BarChart } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  const statuses = ['All', 'Completed', 'In Progress', 'Maintenance'];
  
  const getCategoryCount = (cat: string) => {
    return PROJECTS.filter(p => (cat === 'All' || p.category === cat) && (statusFilter === 'All' || p.status === statusFilter)).length;
  };

  const getStatusCount = (stat: string) => {
    return PROJECTS.filter(p => (stat === 'All' || p.status === stat) && (filter === 'All' || p.category === filter)).length;
  };

  const resetFilters = () => {
    setFilter('All');
    setStatusFilter('All');
  };

  const filteredProjects = PROJECTS.filter(p => 
    (filter === 'All' || p.category === filter) && 
    (statusFilter === 'All' || p.status === statusFilter)
  );

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

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    if (!project) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
        <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300">
          <button onClick={onClose} aria-label="Close project modal" className="absolute top-8 right-8 z-10 p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-full transition-all hover:rotate-90">
            <X size={24} />
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full min-h-[400px]">
              <img src={project.imageUrl} alt={`${project.title} project showcase`} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">{project.category}</span>
                <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{project.status}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-8 tracking-tighter">{project.title}</h2>
              
              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-3 mb-4 text-blue-600">
                    <Target size={20} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Problem Statement</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{project.problemStatement || project.description}</p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4 text-indigo-600">
                    <Settings size={20} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Technical Approach</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{project.technicalApproach || "Our engineering team utilized a multi-layered microservices architecture to ensure scalability and reliability."}</p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4 text-green-600">
                    <BarChart size={20} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Quantifiable Results</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium font-bold">{project.results || "Achieved 99.9% uptime and a significant reduction in operational overhead within the first 3 months."}</p>
                </section>

                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map(tech => (
                    <span key={tech} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{tech}</span>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit live demo for ${project.title}`} className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                      <ExternalLink size={18} /> Visit Project
                    </a>
                  )}
                  <button onClick={onClose} aria-label="Close modal" className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 transition-all duration-1000 transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">Engineering excellence in every pixel.</h3>
          </div>
          
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2">
                <Filter size={12} /> Categories
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-label={`Filter by ${cat} category`}
                  aria-pressed={filter === cat}
                  className={`group px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-2 active:scale-95 ${
                    filter === cat 
                      ? 'bg-slate-950 text-white dark:bg-blue-600 shadow-xl ring-2 ring-slate-950 dark:ring-blue-600 ring-offset-2 dark:ring-offset-slate-950 scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                  <span className={`px-2 py-0.5 rounded-md text-[9px] transition-colors ${filter === cat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2">
                <CheckCircle size={12} /> Project Status
              </span>
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => setStatusFilter(stat)}
                  aria-label={`Filter by ${stat} status`}
                  aria-pressed={statusFilter === stat}
                  className={`group px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-2 active:scale-95 ${
                    statusFilter === stat 
                      ? 'bg-blue-600 text-white shadow-xl ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-950 scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {stat}
                  <span className={`px-2 py-0.5 rounded-md text-[9px] transition-colors ${statusFilter === stat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    {getStatusCount(stat)}
                  </span>
                </button>
              ))}
              
              {(filter !== 'All' || statusFilter !== 'All') && (
                <button 
                  onClick={resetFilters}
                  aria-label="Clear all active filters"
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-all animate-in fade-in zoom-in duration-300 active:scale-95 shadow-sm"
                >
                  <RotateCcw size={12} /> Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
          {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-1000 ease-out hover:shadow-2xl hover:-translate-y-4 transform-gpu ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-95'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-10 text-center backdrop-blur-[6px]">
                  <p className="text-white/90 text-sm font-medium mb-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed max-w-[280px]">
                    {project.description}
                  </p>
                  <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Quick view details for ${project.title}`}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl"
                    >
                      <Eye size={16} /> Quick View
                    </button>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View live demo for ${project.title}`} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-xl border border-white/20">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h4>
                  <div className="flex flex-col items-end gap-2">
                    {project.status === 'Completed' ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800/50">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                        <span className="text-[9px] font-black uppercase text-green-700 dark:text-green-300">Done</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/50">
                        <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-300">{project.status}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.technologies?.map(tech => (
                    <div 
                      key={tech} 
                      className="relative group/tech"
                      title={`Built with ${tech}`}
                    >
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 group-hover/tech:bg-blue-600 group-hover/tech:text-white group-hover/tech:border-blue-600 transition-all cursor-help">
                        <Tag size={10} /> {tech}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider">
                    <Clock size={14} /> {project.duration || '3-4 Months'}
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] hover:translate-x-1.5 transition-transform flex items-center gap-2 group/cta" 
                    aria-label={`View comprehensive case study for ${project.title}`}
                  >
                    Case Study <ChevronRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-slate-400 animate-in fade-in zoom-in duration-500">
               <RotateCcw size={48} className="opacity-20 mb-8" />
               <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching engineering artifacts.</p>
               <button onClick={resetFilters} aria-label="Clear filters and show all projects" className="mt-8 px-10 py-4 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};