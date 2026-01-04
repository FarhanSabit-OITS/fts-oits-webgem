
import React, { useEffect, useRef, useState } from 'react';
/* Added Rocket to the lucide-react imports */
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight, Play, Film, Tag, Volume2, VolumeX, Pause, Subtitles, MonitorPlay, SearchX, ChevronLeft, ChevronRight, Clock, Info, Rocket } from 'lucide-react';
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
        <button onClick={togglePlay} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all focus:outline-none">{isPlaying ? <Pause size={20} /> : <Play size={20} />}</button>
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
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        <div className={`relative w-full ${isPlayingVideo ? 'aspect-video' : 'h-64 md:h-96'}`}>
          {isPlayingVideo ? (
            <CustomVideoPlayer src={project.demoVideoUrl!} poster={project.imageUrl} onClose={() => setIsPlayingVideo(false)} />
          ) : (
            <div className="w-full h-full relative">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all z-20"><X size={24} /></button>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase mb-3 inline-block shadow-lg">{project.category}</span>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">{project.title}</h3>
              </div>
              {project.demoVideoUrl && (
                <button onClick={() => setIsPlayingVideo(true)} className="absolute inset-0 flex items-center justify-center group z-10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform shadow-2xl"><Play size={32} fill="currentColor" className="ml-1" /></div>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">
                <Info size={18} /> Project Context
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{project.fullDescription || project.description}</p>
              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Code2 size={20} /> Technology Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map(t => <span key={t} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-6 shadow-sm">
                <h5 className="font-bold text-lg">Quick Snapshot</h5>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Cycle</span>
                     <span className="font-bold flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {project.duration || 'Flexible'}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Domain</span>
                     <span className="font-bold">{project.category}</span>
                   </div>
                </div>
                <Button className="w-full shadow-lg shadow-blue-500/10" onClick={() => window.open(project.link || '#', '_blank')}>Visit Live Project <ArrowUpRight className="ml-2 w-4 h-4" /></Button>
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
      className={`group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
      style={{ transitionDelay: `${(index % PROJECTS_PER_PAGE) * 80}ms` }}
    >
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onSelect(project, false)}>
        <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        
        {/* Description Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-[8px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out p-8 flex flex-col justify-center text-white pointer-events-none group-hover:pointer-events-auto">
          <p className="text-sm line-clamp-4 leading-relaxed font-medium mb-8 opacity-0 group-hover:opacity-100 transition-all delay-150 duration-500 transform translate-y-4 group-hover:translate-y-0">
            {project.description}
          </p>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all delay-200 duration-500 transform translate-y-4 group-hover:translate-y-0">
             <button className="px-5 py-2.5 bg-white text-slate-900 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all transform active:scale-90 flex items-center gap-1.5 shadow-xl" onClick={(e) => { e.stopPropagation(); onSelect(project, false); }}>
               View Details <ArrowUpRight size={14} />
             </button>
             {project.demoVideoUrl && (
               <button onClick={(e) => { e.stopPropagation(); onSelect(project, true); }} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all transform active:scale-90 flex items-center gap-2 shadow-xl">
                 <Play size={12} fill="currentColor" /> Play Demo
               </button>
             )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
           <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md">{project.category}</span>
           <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10} /> {project.duration || 'N/A'}</span>
        </div>
        <h4 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onSelect(project, false)}>{project.title}</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 4).map(t => (
            <div key={t} className="relative group/tag">
              <button 
                onClick={(e) => { e.stopPropagation(); onTagClick(t); }}
                className="text-[10px] bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-500 dark:text-slate-400 hover:text-white px-2.5 py-1 rounded-md transition-all transform hover:scale-105 active:scale-90 font-bold border border-slate-100 dark:border-slate-700 hover:border-blue-400"
              >
                {t}
              </button>
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] rounded shadow-2xl opacity-0 group-hover/tag:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 font-bold border border-white/10">
                Explore {t} projects
              </span>
            </div>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="text-[10px] bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-400 font-bold border border-slate-100 dark:border-slate-700">+{project.technologies.length - 4}</span>
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
    }, 400);
  };

  const handleSetTag = (tag: string) => {
    if (activeTag === tag) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveTag(tag);
      setCurrentPage(1);
      setIsFilterAnimating(false);
    }, 400);
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
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[900px] transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
             <Rocket size={14} /> Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">Our Success Stories</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-2xl mx-auto">We build products that matter. Explore our latest engineering milestones and digital transformations.</p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => handleSetCategory(c)} 
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 border ${activeCategory === c ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30 animate-pulse-subtle' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'}`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar pb-6 max-w-5xl mx-auto px-4">
            {tags.map(t => (
              <button 
                key={t} 
                onClick={() => handleSetTag(t)} 
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all transform hover:scale-110 active:scale-90 border whitespace-nowrap ${activeTag === t ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-xl' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 hover:shadow-md'}`}
              >
                {t === ALL_TAG && <Info size={12} className="inline mr-1.5 mb-0.5" />}
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-500 transform ${isFilterAnimating ? 'opacity-0 scale-98 translate-y-4 blur-sm' : 'opacity-100 scale-100 translate-y-0 blur-0'}`}>
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
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
            <div className="text-center py-32 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in duration-500">
               <SearchX size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-6" />
               <p className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">No matches in sight.</p>
               <p className="text-slate-500 dark:text-slate-400 mb-10">We haven't shared projects with that specific stack yet, but we're likely building one!</p>
               <Button onClick={resetFilters} variant="primary" size="lg" className="rounded-2xl px-12">Show All Work</Button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900">
              <button 
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm focus:outline-none"
                aria-label="Previous Projects Page"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentPage(i + 1); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`w-12 h-12 rounded-2xl text-base font-bold transition-all transform active:scale-90 border ${currentPage === i + 1 ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm focus:outline-none"
                aria-label="Next Projects Page"
              >
                <ChevronRight size={24} />
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
