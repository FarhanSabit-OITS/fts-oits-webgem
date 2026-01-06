
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Tag, Clock, CheckCircle, RotateCcw, Filter, Eye, ChevronRight, X, Target, Settings, BarChart, Twitter, Linkedin, Facebook } from 'lucide-react';
// Import COMPANY_NAME from constants
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
          <div className="h-full min-h-[300px] lg:min-h-[600px] relative group">
            <img 
              src={project.imageUrl} 
              alt={`${project.title} project showcase`} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:bg-gradient-to-r" />
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
                <button onClick={onClose} className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:border-slate-200 dark:hover:border-slate-600">
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

const ShareButtons = ({ project }: { project: Project }) => {
  const currentUrl = window.location.href;
  const shareText = `Check out "${project.title}" by ${COMPANY_NAME}`;
  
  const shares = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-600'
    }
  ];

  return (
    <div className="flex items-center gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
      {shares.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${project.title} on ${social.name}`}
          className={`p-2.5 bg-slate-900/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all duration-300 border border-white/10 ${social.color} hover:scale-110 active:scale-90`}
        >
          <social.icon size={14} />
        </a>
      ))}
    </div>
  );
};

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

  const handleProjectInteraction = (project: Project) => {
    if (project.caseStudyUrl) {
      window.open(project.caseStudyUrl, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  const [activeAnimate, setActiveAnimate] = useState<string | null>(null);

  const applyFilter = (type: 'cat' | 'stat', val: string) => {
    setActiveAnimate(val);
    if (type === 'cat') setFilter(val);
    else setStatusFilter(val);
    setTimeout(() => setActiveAnimate(null), 300);
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
                  onClick={() => applyFilter('cat', cat)}
                  aria-label={`Filter by ${cat} category. ${getCategoryCount(cat)} projects available.`}
                  aria-pressed={filter === cat}
                  className={`group px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 flex items-center gap-2 active:scale-95 transform-gpu ${
                    filter === cat 
                      ? 'bg-slate-950 text-white dark:bg-blue-600 shadow-xl ring-2 ring-slate-950 dark:ring-blue-600 ring-offset-2 dark:ring-offset-slate-950 scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800'
                  } ${activeAnimate === cat ? 'animate-[subtle-bounce_0.3s_ease-in-out]' : ''}`}
                >
                  {cat}
                  <span 
                    aria-label={`${getCategoryCount(cat)} items`}
                    className={`px-2 py-0.5 rounded-md text-[9px] min-w-[20px] text-center transition-colors font-black ${filter === cat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}
                  >
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
                  onClick={() => applyFilter('stat', stat)}
                  aria-label={`Filter by ${stat} status. ${getStatusCount(stat)} projects available.`}
                  aria-pressed={statusFilter === stat}
                  className={`group px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 flex items-center gap-2 active:scale-95 transform-gpu ${
                    statusFilter === stat 
                      ? 'bg-blue-600 text-white shadow-xl ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-950 scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800'
                  } ${activeAnimate === stat ? 'animate-[subtle-bounce_0.3s_ease-in-out]' : ''}`}
                >
                  {stat}
                  <span 
                    aria-label={`${getStatusCount(stat)} items`}
                    className={`px-2 py-0.5 rounded-md text-[9px] min-w-[20px] text-center transition-colors font-black ${statusFilter === stat ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}
                  >
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
              className={`group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 dark:hover:shadow-blue-900/20 transform-gpu ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-95'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="aspect-video overflow-hidden relative cursor-pointer" onClick={() => handleProjectInteraction(project)}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[3px]"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/80 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[4px] border-2 border-transparent group-hover:border-blue-500/30 rounded-[2.5rem]" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75 space-y-5 text-center px-4">
                     <p className="text-white/90 text-sm font-bold leading-relaxed mb-4 line-clamp-2 max-w-xs mx-auto drop-shadow-md">
                       {project.description}
                     </p>
                     
                     <div className="flex flex-col items-center gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleProjectInteraction(project); }}
                          className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl ring-2 ring-white/20 border-none outline-none"
                          aria-label={`View details for ${project.title}`}
                        >
                          <Eye size={18} /> {project.caseStudyUrl ? 'Open Case Study' : 'View Details'}
                        </button>
                        
                        <ShareButtons project={project} />
                     </div>
                   </div>
                </div>

                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-xl border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h4 
                    className="text-2xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer" 
                    onClick={() => handleProjectInteraction(project)}
                  >
                    {project.title}
                  </h4>
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
                  {project.technologies?.slice(0, 3).map(tech => (
                    <div 
                      key={tech} 
                      className="relative group/tech"
                    >
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Tag size={10} /> {tech}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-950 text-white text-[10px] font-black uppercase rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl border border-slate-800 z-20 translate-y-1 group-hover/tech:translate-y-0">
                        {tech}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950"></div>
                      </div>
                    </div>
                  ))}
                  {(project.technologies?.length || 0) > 3 && (
                     <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center px-2 py-1.5">
                       +{ (project.technologies?.length || 0) - 3 } more
                     </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider">
                    <Clock size={14} /> {project.duration || '3-4 Months'}
                  </div>
                  <button 
                    onClick={() => handleProjectInteraction(project)}
                    className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] hover:translate-x-2 transition-transform flex items-center gap-2 group/cta" 
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
               <p className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-glow">No matching engineering artifacts.</p>
               <button onClick={resetFilters} aria-label="Clear filters and show all projects" className="mt-8 px-10 py-4 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};
