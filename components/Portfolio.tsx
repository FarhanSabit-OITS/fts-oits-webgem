import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Tag, 
  Clock, 
  CheckCircle, 
  RotateCcw, 
  Filter, 
  Eye, 
  ChevronRight, 
  X, 
  Target, 
  Settings, 
  BarChart, 
  Play, 
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS, COMPANY_NAME } from '../constants';
import { SectionId, Project } from '../types';

import { SectionWrapper } from './SectionWrapper';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = ['All', 'Fintech', 'Enterprise SaaS', 'AI', 'HealthTech'];

  // Map or augment project domains
  const augmentedProjects: Project[] = PROJECTS.map((proj, idx) => {
    let domain = 'Enterprise SaaS';
    if (idx % 4 === 0) domain = 'Fintech';
    else if (idx % 4 === 1) domain = 'AI';
    else if (idx % 4 === 2) domain = 'HealthTech';

    return {
      ...proj,
      category: domain,
      results: proj.results || '10x Throughput & 99.99% Uptime',
      technologies: proj.technologies || ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'GCP']
    };
  });

  const filteredProjects = activeCategory === 'All'
    ? augmentedProjects
    : augmentedProjects.filter(p => p.category === activeCategory);

  return (
    <>
      <SectionWrapper id={SectionId.PORTFOLIO} className="bg-white dark:bg-[#070A13]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
              <span>CASE STUDIES & ARTIFACTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Proven results, <span className="text-[#10B981]">quantified</span>.
            </h2>
          </div>

          <p className="text-slate-600 dark:text-slate-400 max-w-md text-base leading-relaxed font-normal">
            Explore production systems we have engineered, scaled, and secured for high-growth enterprises globally.
          </p>
        </div>

        {/* Domain Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-slate-50 dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail & Video Preview Fallback */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Domain Badge & Status */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#070A13]/80 backdrop-blur-md text-[#38BDF8] border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Quantifiable Outcome Metric Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-xl bg-[#070A13]/90 backdrop-blur-md border border-white/10 text-white flex items-center gap-2">
                      <Zap size={14} className="text-[#10B981]" />
                      <span className="text-xs font-mono font-bold">{project.results}</span>
                    </div>

                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-[#38BDF8] group-hover:text-slate-950 transition-colors">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                    {(project.technologies || []).slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-stone-700/60 hover:border-[#10B981] dark:hover:border-[#10B981] hover:text-[#10B981] dark:hover:text-[#10B981] hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 flex items-center justify-center gap-2 transition-all">
                  <span>Architecture Deep-Dive</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Interactive Project Architecture Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" 
          role="dialog" 
          aria-modal="true"
        >
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setSelectedProject(null)} 
          />

          <div className="relative bg-white dark:bg-[#0C1222] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 p-6 sm:p-10 no-scrollbar">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-[#38BDF8]">
                {selectedProject.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-[#10B981]">
                Verified Production
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-6">
              {selectedProject.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-bold mb-2">The Challenge</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.problemStatement || selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-bold mb-2">Architectural Solution</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.technicalApproach || 'Engineered microservice pipelines with horizontally autoscaling cloud compute instances.'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">Quantified Impact</h4>
                  <p className="text-xl font-mono font-bold text-[#10B981]">{selectedProject.results}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">Verified Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProject.technologies || []).map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
