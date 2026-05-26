import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Tag, Clock, CheckCircle, RotateCcw, Filter, Eye, ChevronRight, X, Target, Settings, BarChart, Twitter, Linkedin, Facebook, Play, BookOpen } from 'lucide-react';
import { PROJECTS, COMPANY_NAME } from '../constants';
import { SectionId, Project } from '../types';

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-500 ease-out" role="dialog" aria-modal="true">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-500 ease-out" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in-90 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-slate-200 dark:border-slate-800 no-scrollbar">
        <button 
          onClick={onClose} 
          aria-label="Close project modal" 
          className="absolute top-6 right-6 z-20 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-500 hover:text-red-500 rounded-full transition-all hover:rotate-90 hover:scale-110 border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <X size={24} />
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full min-h-[300px] lg:min-h-[600px] relative group overflow-hidden bg-black flex items-center justify-center">
            {project.demoVideoUrl ? (
              <video 
                controls 
                className="w-full h-full object-contain" 
                poster={project.imageUrl}
                aria-label={`Demo video for ${project.title}`}
              >
                <source src={project.demoVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img 
                  src={project.imageUrl} 
                  alt={`${project.title} project showcase`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:bg-gradient-to-r" />
              </>
            )}
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/50">{project.category}</span>
              <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                project.status === 'Completed' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}>
                {project.status}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-8 tracking-tighter leading-[1.1]">{project.title}</h2>
            
            <div className="space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Target size={18} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest">The Challenge</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{project.problemStatement || project.description}</p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <Settings size={18} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest">Our Solution</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{project.technicalApproach || "Utilizing cutting-edge cloud architecture for maximum scalability."}</p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-3 text-green-600 dark:text-green-400">
                  <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <BarChart size={18} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest">Impact</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">{project.results || "Significant performance improvements and operational efficiency."}</p>
              </section>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.technologies?.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">{tech}</span>
                ))}
              </div>
              
              <div className="pt-8 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit live demo for ${project.title}`} className="flex items-center gap-3 px-8 py-4 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl">
                    <ExternalLink size={18} /> Visit Project
                  </a>
                )}
                {project.caseStudyUrl && (
                  <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Read full case study for ${project.title}`} className="flex items-center gap-3 px-8 py-4 bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border-2 border-blue-100 dark:border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                    <BookOpen size={18} /> Read Case Study
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
    <div className="aspect-video shimmer-bg animate-shimmer" />
    <div className="p-10 space-y-4">
      <div className="h-8 w-3/4 shimmer-bg animate-shimmer rounded-lg" />
      <div className="flex gap-2">
        <div className="h-6 w-20 shimmer-bg animate-shimmer rounded-full" />
        <div className="h-6 w-20 shimmer-bg animate-shimmer rounded-full" />
      </div>
      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between">
        <div className="h-4 w-24 shimmer-bg animate-shimmer rounded" />
        <div className="h-4 w-16 shimmer-bg animate-shimmer rounded" />
      </div>
    </div>
  </div>
);

const ShareButtons = ({ project }: { project: Project }) => {
  const currentUrl = window.location.href;
  const shareText = `Check out "${project.title}" by ${COMPANY_NAME}`;
  
  const shares = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-sky-500 hover:border-sky-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-700 hover:border-blue-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-600 hover:border-blue-400'
    }
  ];

  return (
    <div className="flex items-center gap-4 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 pointer-events-auto">
      {shares.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${project.title} on ${social.name}`}
          className={`group flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/20 ${social.color} hover:scale-110 active:scale-95 z-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <social.icon size={16} className="drop-shadow-md" />
        </a>
      ))}
    </div>
  );
};

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  const statuses = ['All', 'Completed', 'In Progress', 'Maintenance'];
  
  const getCategoryCount = (cat: string) => PROJECTS.filter(p => (cat === 'All' || p.category === cat) && (statusFilter === 'All' || p.status === statusFilter)).length;
  const getStatusCount = (stat: string) => PROJECTS.filter(p => (stat === 'All' || p.status === stat) && (filter === 'All' || p.category === filter)).length;

  const resetFilters = () => {
    setIsFiltering(true);
    setFilter('All');
    setStatusFilter('All');
    setTimeout(() => setIsFiltering(false), 600);
  };

  const applyFilter = (type: 'cat' | 'stat', val: string) => {
    setIsFiltering(true);
    if (type === 'cat') setFilter(val);
    else setStatusFilter(val);
    setTimeout(() => setIsFiltering(false), 600);
  };

  const filteredProjects = PROJECTS.filter(p => (filter === 'All' || p.category === filter) && (statusFilter === 'All' || p.status === statusFilter));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 transition-all duration-1000 transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">Engineering excellence in every pixel.</h3>
          </div>
          
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2"><Filter size={12} /> Categories</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => applyFilter('cat', cat)}
                  className={`group px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 active:scale-95 ${filter === cat ? 'bg-slate-950 text-white dark:bg-blue-600 shadow-xl' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800'}`}
                >
                  {cat}
                  <span className={`px-1.5 py-0.5 rounded-md text-[8px] sm:text-[9px] min-w-[18px] sm:min-w-[20px] text-center font-black ${filter === cat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>{getCategoryCount(cat)}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2"><CheckCircle size={12} /> Status</span>
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => applyFilter('stat', stat)}
                  className={`group px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 active:scale-95 ${statusFilter === stat ? 'bg-blue-600 text-white shadow-xl' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800'}`}
                >
                  {stat}
                  <span className={`px-1.5 py-0.5 rounded-md text-[8px] sm:text-[9px] min-w-[18px] sm:min-w-[20px] text-center font-black ${statusFilter === stat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>{getStatusCount(stat)}</span>
                </button>
              ))}
              {(filter !== 'All' || statusFilter !== 'All') && (
                <button onClick={resetFilters} className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"><RotateCcw size={12} /> Clear</button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
          {isFiltering ? (
            Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] transform-gpu animate-in fade-in slide-in-from-bottom-4`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video overflow-hidden relative cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/80 transition-all duration-500 backdrop-blur-none group-hover:backdrop-blur-sm flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 z-10">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100 text-center w-full">
                      <p className="text-white text-sm font-bold mb-6 drop-shadow-xl">{project.description}</p>
                      <div className="flex flex-col items-center gap-4">
                        <button className="flex items-center gap-3 px-8 py-3 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                          <Eye size={16} /> Details {project.demoVideoUrl && <Play size={14} className="ml-1 fill-current" />}
                        </button>
                        {project.caseStudyUrl && (
                          <a 
                            href={project.caseStudyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <BookOpen size={16} /> Case Study
                          </a>
                        )}
                        <ShareButtons project={project} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 transition-opacity group-hover:opacity-0">
                    <span className="px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-xl border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>{project.title}</h4>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-100 dark:border-green-800/50">
                      <span className="text-[9px] font-black uppercase text-green-700 dark:text-green-300">{project.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {project.technologies?.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-wider"><Clock size={14} /> {project.duration || '3-4 Months'}</div>
                    <button onClick={() => setSelectedProject(project)} className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1">View <ChevronRight size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center"><p className="text-slate-500 text-lg font-bold">No projects matching your search.</p></div>
          )}
        </div>
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};