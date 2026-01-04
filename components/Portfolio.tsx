
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight, Play, Film, Tag, Volume2, VolumeX, Pause, Subtitles, MonitorPlay, SearchX } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

const ALL_CATEGORY = 'All';
const ALL_TAG = 'All Tech';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// --- Custom Video Player Component ---
interface CustomVideoPlayerProps {
  src: string;
  captionsUrl?: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, captionsUrl, poster, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      <video ref={videoRef} src={src} className="w-full h-full object-contain z-10" onClick={togglePlay} playsInline />
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
  autoPlay?: boolean;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, autoPlay = false, onClose, onProjectSelect }) => {
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
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <div className={`relative w-full ${isPlayingVideo ? 'aspect-video' : 'h-64 md:h-96'}`}>
          {isPlayingVideo ? (
            <CustomVideoPlayer src={project.demoVideoUrl!} poster={project.imageUrl} onClose={() => setIsPlayingVideo(false)} />
          ) : (
            <div className="w-full h-full relative">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all"><X size={24} /></button>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase mb-3 inline-block">{project.category}</span>
                <h3 className="text-4xl font-bold">{project.title}</h3>
              </div>
              {project.demoVideoUrl && (
                <button onClick={() => setIsPlayingVideo(true)} className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform"><Play size={32} fill="currentColor" className="ml-1" /></div>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Overview</h4>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{project.fullDescription || project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map(t => <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">{t}</span>)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-4">
                <h5 className="font-bold">Project Details</h5>
                <div className="flex flex-col text-sm"><span className="text-slate-500">Timeline</span><span className="font-semibold">3-4 Months</span></div>
                <Button className="w-full" onClick={() => window.open(project.link || '#', '_blank')}>Visit Live Project</Button>
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
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onSelect(project, false)}>
        <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        
        {/* Description Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center text-white">
          <p className="text-sm line-clamp-4 leading-relaxed font-medium mb-4">{project.description}</p>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white text-slate-900 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors">Case Study</button>
             {project.demoVideoUrl && (
               <button onClick={(e) => { e.stopPropagation(); onSelect(project, true); }} className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                 <Play size={12} fill="currentColor" /> Play Demo
               </button>
             )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 block">{project.category}</span>
        <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onSelect(project, false)}>{project.title}</h4>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 4).map(t => (
            <button 
              key={t} 
              onClick={(e) => { e.stopPropagation(); onTagClick(t); }}
              className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-0.5 rounded transition-colors"
            >
              {t}
            </button>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">+{project.technologies.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [selectedProject, setSelectedProject] = useState<{ project: Project; autoPlay: boolean } | null>(null);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedCat = localStorage.getItem('portfolio_cat') || ALL_CATEGORY;
    const savedTag = localStorage.getItem('portfolio_tag') || ALL_TAG;
    setActiveCategory(savedCat);
    setActiveTag(savedTag);
  }, []);

  const handleSetCategory = (cat: string) => {
    if (activeCategory === cat) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveCategory(cat);
      localStorage.setItem('portfolio_cat', cat);
      setIsFilterAnimating(false);
    }, 300);
  };

  const handleSetTag = (tag: string) => {
    if (activeTag === tag) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveTag(tag);
      localStorage.setItem('portfolio_tag', tag);
      setIsFilterAnimating(false);
    }, 300);
  };

  const resetFilters = () => {
    handleSetCategory(ALL_CATEGORY);
    handleSetTag(ALL_TAG);
  };

  const filteredProjects = PROJECTS.filter(p => (activeCategory === ALL_CATEGORY || p.category === activeCategory) && (activeTag === ALL_TAG || p.technologies?.includes(activeTag)));

  const categories = [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const tags = [ALL_TAG, ...Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort()];

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[800px] transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Portfolio</h2>
          <h3 className="text-4xl font-bold mb-6">Our Success Stories</h3>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => handleSetCategory(c)} 
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95 ${activeCategory === c ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar pb-4 max-w-3xl mx-auto">
            {tags.map(t => (
              <button 
                key={t} 
                onClick={() => handleSetTag(t)} 
                className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-tight transition-all active:scale-90 ${activeTag === t ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-300 transform ${isFilterAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, i) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                index={i} 
                onTagClick={handleSetTag} 
                onSelect={(p, a) => setSelectedProject({ project: p, autoPlay: a })} 
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
               <SearchX size={48} className="mx-auto text-slate-300 mb-4" />
               <p className="text-xl font-bold mb-4">No projects found matching these filters.</p>
               <Button onClick={resetFilters} variant="outline">Reset All Filters</Button>
            </div>
          )}
        </div>
      </div>
      <ProjectModal 
        project={selectedProject?.project || null} 
        autoPlay={selectedProject?.autoPlay} 
        onClose={() => setSelectedProject(null)} 
        onProjectSelect={(p) => setSelectedProject({ project: p, autoPlay: false })} 
      />
    </section>
  );
};
