
import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar, Code2, ArrowUpRight, Play, SearchX, ChevronLeft, ChevronRight, Clock, Info, Rocket } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

const ALL_CATEGORY = 'All';
const ALL_TAG = 'All Technologies';
const PROJECTS_PER_PAGE = 9;

// --- Custom Video Player Component ---
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
    const onEnded = () => setIsPlaying(false);
    const onLoadedData = () => setIsVideoLoaded(true);
    const onPlaying = () => { setIsVideoLoaded(true); setIsPlaying(true); };
    const onPause = () => setIsPlaying(false);

    video.addEventListener('ended', onEnded);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.play().catch(err => console.error("Autoplay failed:", err));

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-center overflow-hidden" tabIndex={0} role="region" aria-label="Project Demo Player">
      {!isVideoLoaded && <div className="absolute inset-0 flex items-center justify-center z-10"><div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></div>}
      <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-contain z-10" onClick={togglePlay} playsInline />
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button onClick={togglePlay} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all focus:outline-none">{isPlaying ? <X size={20} className="rotate-45" /> : <Play size={20} />}</button>
        <button onClick={onClose} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all focus:outline-none"><X size={20} /></button>
      </div>
    </div>
  );
};

// --- Modal Component ---
interface ProjectModalProps {
  project: Project | null;
  autoPlay?: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, autoPlay = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      setIsPlayingVideo(autoPlay && !!project.demoVideoUrl);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [project, autoPlay]);

  if (!isVisible || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        <div className={`relative w-full ${isPlayingVideo ? 'aspect-video' : 'h-64 md:h-96'}`}>
          {isPlayingVideo ? (
            <CustomVideoPlayer src={project.demoVideoUrl!} poster={project.imageUrl} onClose={() => setIsPlayingVideo(false)} />
          ) : (
            <div className="w-full h-full relative">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button onClick={onClose} className="absolute top-6 right-6 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-all z-20"><X size={24} /></button>
              <div className="absolute bottom-10 left-10 text-white z-10">
                <span className="px-4 py-1.5 bg-blue-600 rounded-full text-xs font-black uppercase mb-4 inline-block shadow-2xl">{project.category}</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter">{project.title}</h3>
              </div>
              {project.demoVideoUrl && (
                <button onClick={() => setIsPlayingVideo(true)} className="absolute inset-0 flex items-center justify-center group z-10">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform shadow-2xl"><Play size={40} fill="currentColor" className="ml-2" /></div>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm">
                <Rocket size={20} /> Project Deep Dive
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed font-medium">{project.fullDescription || project.description}</p>
              <div className="space-y-6 pt-6">
                <h4 className="font-black text-slate-900 dark:text-white text-xl flex items-center gap-3"><Code2 size={24} className="text-blue-500" /> Technical Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map(t => <span key={t} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border-2 border-white dark:border-slate-800 space-y-8 shadow-sm">
                <h5 className="font-black text-2xl tracking-tight">Analytics</h5>
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-base">
                     <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Delivery Time</span>
                     <span className="font-black text-slate-900 dark:text-white flex items-center gap-2"><Clock size={16} className="text-blue-500" /> {project.duration || 'Variable'}</span>
                   </div>
                   <div className="flex justify-between items-center text-base">
                     <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Industry</span>
                     <span className="font-black text-slate-900 dark:text-white">{project.category}</span>
                   </div>
                </div>
                <Button className="w-full h-16 rounded-2xl shadow-xl shadow-blue-500/20 text-lg font-black" onClick={() => window.open(project.link || '#', '_blank')}>Live Preview <ArrowUpRight className="ml-2 w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Project Card Component ---
const ProjectCard: React.FC<{ project: Project; index: number; onSelect: (p: Project, autoPlay: boolean) => void; onTagClick: (tag: string) => void }> = ({ project, index, onSelect, onTagClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
      style={{ transitionDelay: `${(index % PROJECTS_PER_PAGE) * 80}ms` }}
    >
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onSelect(project, false)}>
        <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        
        {/* Description Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out p-8 flex flex-col justify-center text-white translate-y-4 group-hover:translate-y-0">
          <p className="text-sm line-clamp-4 leading-relaxed font-semibold mb-8 opacity-0 group-hover:opacity-100 transition-all delay-200 duration-500">
            {project.description}
          </p>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all delay-300 duration-500">
             <button className="px-6 py-3 bg-white text-slate-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform active:scale-90 flex items-center gap-2 shadow-2xl" onClick={(e) => { e.stopPropagation(); onSelect(project, false); }}>
               Case Study <ArrowUpRight size={14} />
             </button>
             {project.demoVideoUrl && (
               <button onClick={(e) => { e.stopPropagation(); onSelect(project, true); }} className="px-6 py-3 bg-blue-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all transform active:scale-90 flex items-center gap-2 shadow-2xl">
                 <Play size={12} fill="currentColor" /> Play Demo
               </button>
             )}
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
           <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">{project.category}</span>
           <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5"><Clock size={12} /> {project.duration || 'N/A'}</span>
        </div>
        <h4 className="text-2xl font-black mb-6 tracking-tight group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onSelect(project, false)}>{project.title}</h4>
        <div className="flex flex-wrap gap-2.5">
          {project.technologies?.slice(0, 4).map(t => (
            <div key={t} className="relative group/tag">
              <button 
                onClick={(e) => { e.stopPropagation(); onTagClick(t); }}
                className="text-[10px] bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-500 dark:text-slate-400 hover:text-white px-3 py-1.5 rounded-xl transition-all transform hover:scale-110 active:scale-90 font-black border border-slate-100 dark:border-slate-700 hover:border-blue-400"
              >
                {t}
              </button>
              {/* Refined Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/tag:opacity-100 transition-all pointer-events-none whitespace-nowrap z-30 shadow-2xl border border-white/10 scale-90 group-hover/tag:scale-100">
                Show {t} Projects
              </span>
            </div>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="text-[10px] bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-400 font-black border border-slate-100 dark:border-slate-700">+{project.technologies.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem('portfolio_cat') || ALL_CATEGORY);
  const [activeTag, setActiveTag] = useState(() => localStorage.getItem('portfolio_tag') || ALL_TAG);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<{ project: Project; autoPlay: boolean } | null>(null);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_cat', activeCategory);
    localStorage.setItem('portfolio_tag', activeTag);
  }, [activeCategory, activeTag]);

  const handleSetCategory = (cat: string) => {
    if (activeCategory === cat) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setCurrentPage(1);
      setIsFilterAnimating(false);
    }, 450);
  };

  const handleSetTag = (tag: string) => {
    if (activeTag === tag) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveTag(tag);
      setCurrentPage(1);
      setIsFilterAnimating(false);
    }, 450);
  };

  const resetFilters = () => {
    handleSetCategory(ALL_CATEGORY);
    handleSetTag(ALL_TAG);
  };

  const filteredProjects = PROJECTS.filter(p => (activeCategory === ALL_CATEGORY || p.category === activeCategory) && (activeTag === ALL_TAG || p.technologies?.includes(activeTag)));
  
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const tags = [ALL_TAG, ...Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort()];

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[1000px] transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white dark:from-slate-950 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
             <Rocket size={16} /> Showcase Gallery
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white">Engineering <br className="hidden md:block"/> Success Stories</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium mb-16 max-w-2xl mx-auto">From concept to production, we ship high-performance digital products for global clients.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => handleSetCategory(c)} 
                className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 border-2 ${activeCategory === c ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/40 ring-4 ring-blue-500/10' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800 hover:border-blue-300'}`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar pb-8 max-w-5xl mx-auto px-4">
            {tags.map(t => (
              <button 
                key={t} 
                onClick={() => handleSetTag(t)} 
                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all transform hover:scale-110 active:scale-90 border-2 whitespace-nowrap ${activeTag === t ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-2xl' : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800 hover:shadow-lg'}`}
              >
                {t === ALL_TAG && <Info size={12} className="inline mr-2" />}
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-700 transform ${isFilterAnimating ? 'opacity-0 scale-95 translate-y-8 blur-xl' : 'opacity-100 scale-100 translate-y-0 blur-0'}`}>
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
              {currentProjects.map((p, i) => (
                <ProjectCard 
                  key={p.id} 
                  project={p} 
                  index={i} 
                  onTagClick={handleSetTag} 
                  onSelect={(p, a) => setSelectedProject({ project: p, autoPlay: a })} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-white dark:bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in duration-700">
               <SearchX size={80} className="mx-auto text-slate-200 dark:text-slate-800 mb-8" />
               <p className="text-3xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Zero matches found.</p>
               <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-md mx-auto">Try clearing your technical filters or exploring our other industry categories.</p>
               <Button onClick={resetFilters} variant="primary" size="lg" className="rounded-2xl px-16 h-16 text-lg font-black">View All Projects</Button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-20 pt-12 border-t-2 border-slate-100 dark:border-slate-900">
              <button 
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className="p-5 rounded-[1.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 disabled:opacity-20 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus:outline-none"
                aria-label="Previous Page"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="flex items-center gap-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentPage(i + 1); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`w-14 h-14 rounded-2xl text-lg font-black transition-all transform active:scale-90 border-2 ${currentPage === i + 1 ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/30 scale-110' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className="p-5 rounded-[1.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 disabled:opacity-20 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus:outline-none"
                aria-label="Next Page"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      </div>
      <ProjectModal 
        project={selectedProject?.project || null} 
        autoPlay={selectedProject?.autoPlay} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
