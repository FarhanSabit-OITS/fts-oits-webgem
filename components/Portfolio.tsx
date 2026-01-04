
import React, { useEffect, useRef, useState } from 'react';
import { X, Code2, ArrowUpRight, Play, Pause, SearchX, Clock, Info, Rocket, RefreshCw, Eye, Target, TrendingUp, Cpu, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

const ALL_CATEGORY = 'All';
const ALL_TAG = 'All Technologies';
const ALL_STATUS = 'All Statuses';
const PROJECTS_PER_PAGE = 9;

// --- Custom Video Player ---
interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, poster, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
      else if (e.key === 'Escape') { onClose(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    video.play().catch(() => {});
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-center overflow-hidden">
      {!isVideoLoaded && <div className="absolute inset-0 flex items-center justify-center z-10"><div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></div>}
      <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-contain z-10" onClick={togglePlay} playsInline onLoadedData={() => setIsVideoLoaded(true)} onPlaying={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button onClick={togglePlay} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">{isPlaying ? <Pause size={20} /> : <Play size={20} />}</button>
        <button onClick={onClose} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"><X size={20} /></button>
      </div>
    </div>
  );
};

// --- Modal Component ---
interface ProjectModalProps {
  project: Project | null;
  mode: 'full' | 'quick' | 'video';
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, mode, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (project) { setIsVisible(true); document.body.style.overflow = 'hidden'; }
    else { setIsVisible(false); document.body.style.overflow = 'unset'; }
  }, [project]);

  if (!isVisible || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity duration-500" onClick={onClose} />
      <div role="dialog" className={`relative w-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 scroll-smooth ${mode === 'quick' ? 'max-w-2xl' : 'max-w-6xl'}`}>
        {mode === 'full' && (
          <>
            <div className="relative h-64 md:h-[30rem] w-full">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all z-20 group"><X size={24} className="group-hover:rotate-90 transition-transform duration-300" /></button>
              <div className="absolute bottom-10 left-6 md:left-12 text-white z-10">
                <span className="px-5 py-2 bg-blue-600 rounded-full text-xs font-black uppercase mb-4 inline-block shadow-2xl tracking-[0.2em]">{project.category}</span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-2">{project.title}</h3>
                <div className="flex items-center gap-4 text-blue-100/80 text-sm font-bold">
                   <span className="flex items-center gap-2"><Clock size={16} /> {project.duration}</span>
                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                   <span className="flex items-center gap-2">Status: {project.status}</span>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                <div className="lg:col-span-2 space-y-12">
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm"><Target size={20} /> Problem Statement</div>
                    <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">{project.problemStatement || project.description}</p>
                  </section>
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm"><Cpu size={20} /> Engineering Approach</div>
                    <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">{project.technicalApproach || project.fullDescription}</p>
                  </section>
                </div>
                <aside className="space-y-12">
                  <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[3rem] border-2 border-white dark:border-slate-800 space-y-10 shadow-sm">
                    <div>
                      <h5 className="font-black text-2xl tracking-tight mb-6 text-slate-900 dark:text-white">Core Tech</h5>
                      <div className="flex flex-wrap gap-2.5">
                        {project.technologies?.map(t => (
                          <span key={t} className="px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl text-xs font-bold border border-slate-100 dark:border-slate-700 shadow-sm">{t}</span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full h-16 rounded-2xl shadow-2xl shadow-blue-500/20 text-lg font-black" onClick={() => window.open(project.link || '#', '_blank')}>Visit Live <ArrowUpRight className="ml-2 w-5 h-5" /></Button>
                  </div>
                </aside>
              </div>
            </div>
          </>
        )}
        {mode === 'quick' && (
          <div className="p-12 md:p-16 text-center">
            <div className="mb-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"><Info size={40} /></div>
              <span className="px-4 py-1 bg-blue-50 dark:bg-blue-900/40 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4">{project.category}</span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">{project.title}</h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 mb-10">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium italic">{project.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button onClick={() => window.open(project.link || '#', '_blank')} className="flex-1 h-16 rounded-2xl text-lg font-black shadow-xl shadow-blue-500/10">Launch Project</Button>
              <Button variant="outline" onClick={onClose} className="flex-1 h-16 rounded-2xl text-lg font-black border-2">Close Preview</Button>
            </div>
          </div>
        )}
        {mode === 'video' && <div className="aspect-video w-full bg-black"><CustomVideoPlayer src={project.demoVideoUrl!} poster={project.imageUrl} onClose={onClose} /></div>}
      </div>
    </div>
  );
};

// --- Project Card Component ---
const ProjectCard: React.FC<{ project: Project; index: number; onSelect: (p: Project, mode: 'full' | 'quick' | 'video') => void; onTagClick: (tag: string) => void }> = ({ project, index, onSelect, onTagClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const getStatusColor = (status: string | undefined) => {
    switch(status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Maintenance': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div ref={ref} className={`group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-700 ease-out hover:-translate-y-4 hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${(index % PROJECTS_PER_PAGE) * 80}ms` }}>
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onSelect(project, 'full')}>
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out p-10 flex flex-col justify-center text-white pointer-events-none group-hover:pointer-events-auto">
          <p className="text-sm md:text-base line-clamp-3 leading-relaxed font-bold mb-10 opacity-0 group-hover:opacity-100 transition-all delay-150 duration-500 text-blue-50">
            {project.description}
          </p>
          <div className="grid grid-cols-2 gap-4 opacity-0 group-hover:opacity-100 transition-all delay-250 duration-500">
             <button className="px-4 py-4 bg-white text-slate-900 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-2xl ring-2 ring-white/10" onClick={(e) => { e.stopPropagation(); onSelect(project, 'full'); }}>Case Study <ArrowUpRight size={14} /></button>
             <button className="px-4 py-4 bg-slate-800 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-2xl ring-2 ring-white/10" onClick={(e) => { e.stopPropagation(); onSelect(project, 'quick'); }}>Quick View <Eye size={14} /></button>
             {project.demoVideoUrl && (
               <button onClick={(e) => { e.stopPropagation(); onSelect(project, 'video'); }} className="col-span-2 px-6 py-4 bg-blue-600 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/20">
                 <Play size={14} fill="currentColor" /> Play Demo
               </button>
             )}
          </div>
        </div>
      </div>
      <div className="p-8 md:p-10">
        <div className="flex justify-between items-center mb-5">
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">{project.category}</span>
             <div className="flex items-center gap-1.5 ml-2 group/status relative">
               <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${getStatusColor(project.status)}`} />
               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{project.status}</span>
             </div>
           </div>
           <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5"><Clock size={14} /> {project.duration || 'N/A'}</span>
        </div>
        <h4 className="text-2xl md:text-3xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-tight">{project.title}</h4>
        <div className="flex flex-wrap gap-2.5">
          {project.technologies?.slice(0, 4).map(t => (
            <div key={t} className="relative group/tag">
              <button onClick={(e) => { e.stopPropagation(); onTagClick(t); }} className="text-[10px] bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-500 dark:text-slate-400 hover:text-white px-3.5 py-2 rounded-xl transition-all transform hover:scale-110 active:scale-90 font-black border border-slate-100 dark:border-slate-700">{t}</button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/tag:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/tag:translate-y-0 shadow-2xl border border-slate-700 whitespace-nowrap z-30">{t} Stack<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900"></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Skeleton Shimmer ---
const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    </div>
    <div className="p-8 md:p-10 space-y-4">
      <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-24"></div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
    </div>
  </div>
);

// --- Main Portfolio ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem('portfolio_cat') || ALL_CATEGORY);
  const [activeTag, setActiveTag] = useState(() => localStorage.getItem('portfolio_tag') || ALL_TAG);
  const [activeStatus, setActiveStatus] = useState(() => localStorage.getItem('portfolio_status') || ALL_STATUS);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ project: Project; mode: 'full' | 'quick' | 'video' } | null>(null);

  useEffect(() => {
    localStorage.setItem('portfolio_cat', activeCategory);
    localStorage.setItem('portfolio_tag', activeTag);
    localStorage.setItem('portfolio_status', activeStatus);
  }, [activeCategory, activeTag, activeStatus]);

  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setIsFilterAnimating(true);
    setTimeout(() => { setter(value); setTimeout(() => setIsFilterAnimating(false), 500); }, 400);
  };

  const resetFilters = () => {
    setIsFilterAnimating(true);
    setTimeout(() => { setActiveCategory(ALL_CATEGORY); setActiveTag(ALL_TAG); setActiveStatus(ALL_STATUS); setTimeout(() => setIsFilterAnimating(false), 500); }, 400);
  };

  const filteredProjects = PROJECTS.filter(p => (activeCategory === ALL_CATEGORY || p.category === activeCategory) && (activeTag === ALL_TAG || p.technologies?.includes(activeTag)) && (activeStatus === ALL_STATUS || p.status === activeStatus));
  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const statuses = [ALL_STATUS, 'Completed', 'In Progress', 'Maintenance'];

  const getCount = (type: 'cat' | 'stat', val: string) => {
    if (type === 'cat') return val === ALL_CATEGORY ? PROJECTS.length : PROJECTS.filter(p => p.category === val).length;
    return val === ALL_STATUS ? PROJECTS.length : PROJECTS.filter(p => p.status === val).length;
  };

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[800px] transition-colors duration-500 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
             <Rocket size={16} /> Showcase Gallery
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white">Engineering <br className="hidden md:block"/> Success Stories</h2>
          
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(c => (
                <button key={c} onClick={() => handleFilterChange(setActiveCategory, c)} className={`px-8 md:px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 flex items-center gap-3 ${activeCategory === c ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/40 ring-4 ring-blue-500/10' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-blue-400/50'}`}>
                  {c} <span className={`text-[9px] px-2 py-0.5 rounded-full ${activeCategory === c ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{getCount('cat', c)}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
                <div className="px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 whitespace-nowrap"><Filter size={12} /> Status</div>
                {statuses.map(s => (
                  <button key={s} onClick={() => handleFilterChange(setActiveStatus, s)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeStatus === s ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{s === ALL_STATUS ? 'All' : s} <span className="opacity-60 text-[8px]">({getCount('stat', s)})</span></button>
                ))}
              </div>
              <button onClick={resetFilters} className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border-2 border-slate-200 dark:border-slate-800 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 font-black uppercase text-[11px] tracking-widest shadow-sm group"><RefreshCw size={14} className={`group-hover:rotate-180 transition-transform duration-700 ${isFilterAnimating ? 'animate-spin' : ''}`} /> Reset Filters</button>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-500 transform ${isFilterAnimating ? 'opacity-40 scale-[0.98] blur-sm' : 'opacity-100 scale-100'}`}>
          {isFilterAnimating ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">{[1,2,3].map(i => <ProjectSkeleton key={i} />)}</div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onTagClick={(tag) => handleFilterChange(setActiveTag, tag)} onSelect={(p, m) => setSelectedProject({ project: p, mode: m })} />)}
            </div>
          ) : (
            <div className="text-center py-40 bg-white dark:bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in duration-700">
               <SearchX size={80} className="mx-auto text-slate-200 dark:text-slate-800 mb-8" />
               <p className="text-3xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Zero matches found.</p>
               <Button onClick={resetFilters} variant="primary" size="lg" className="rounded-2xl px-16 h-16 text-lg font-black">View All Work</Button>
            </div>
          )}
        </div>
      </div>
      <ProjectModal project={selectedProject?.project || null} mode={selectedProject?.mode || 'full'} onClose={() => setSelectedProject(null)} />
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </section>
  );
};
