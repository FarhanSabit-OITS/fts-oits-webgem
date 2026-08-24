import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  Layout, 
  Check, 
  ArrowRight, 
  Sparkles,
  Layers,
  Terminal,
  Zap,
  ChevronRight,
  Database
} from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId, Service } from '../types';
import { ServiceModal } from './ServiceModal';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Cloud Architecture', 'AI & ML', 'Full-Stack', 'Cybersecurity'];

  // Categorize services dynamically
  const serviceOfferings = [
    {
      id: 'web-dev',
      category: 'Full-Stack',
      title: 'Custom Web & SaaS Apps',
      description: 'Modern single-page applications and high-availability enterprise web portals with server-side rendering.',
      icon: <Globe className="w-6 h-6 text-[#38BDF8]" />,
      techStack: ['React 19', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
      capabilities: ['Server-Side Rendering & ISR', 'State Orchestration with Zustand', 'Core Web Vitals 99+ Index', 'REST & GraphQL API Gateways']
    },
    {
      id: 'cloud-infrastructure',
      category: 'Cloud Architecture',
      title: 'Cloud & Kubernetes Infrastructure',
      description: 'Elastic multi-region infrastructure with automated Terraform provisioning and zero-downtime blue/green deployments.',
      icon: <Cloud className="w-6 h-6 text-[#10B981]" />,
      techStack: ['AWS / GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
      capabilities: ['Auto-scaling Container Clusters', 'Infrastructure as Code (IaC)', 'Zero-Downtime Rollouts', 'Multi-Region Data Replicas']
    },
    {
      id: 'ai-ml',
      category: 'AI & ML',
      title: 'AI & Machine Learning Systems',
      description: 'Enterprise AI agents, retrieval-augmented generation (RAG) pipelines, and intelligent predictive algorithms.',
      icon: <Cpu className="w-6 h-6 text-[#F59E0B]" />,
      techStack: ['Gemini GenAI', 'Python', 'PyTorch', 'LangChain', 'Vector DBs'],
      capabilities: ['Bespoke LLM Integrations', 'Domain-Specific RAG Pipelines', 'Automated Data Labeling & ETL', 'Edge AI Model Inference']
    },
    {
      id: 'mobile-dev',
      category: 'Full-Stack',
      title: 'Native & Cross-Platform Mobile',
      description: 'Ultra-responsive iOS and Android applications with 60FPS fluid gestures and offline-first data synchronization.',
      icon: <Smartphone className="w-6 h-6 text-[#38BDF8]" />,
      techStack: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'SQLite'],
      capabilities: ['Hardware & Biometric Auth', 'Offline-First SQLite Cache', 'Native Push & Background Sync', 'Cross-Device State Hydration']
    },
    {
      id: 'security-audit',
      category: 'Cybersecurity',
      title: 'Enterprise DevOps & Security',
      description: 'Hardened zero-trust defense perimeters, automated vulnerability scanners, and continuous compliance monitors.',
      icon: <ShieldCheck className="w-6 h-6 text-[#10B981]" />,
      techStack: ['SonarQube', 'HashiCorp Vault', 'OWASP ASVS', 'OAuth2/OIDC'],
      capabilities: ['Automated SAST & DAST Testing', 'Secrets Management in Vault', 'Granular Role-Based Access Control', 'Penetration Testing Audits']
    },
    {
      id: 'ui-ux',
      category: 'Full-Stack',
      title: 'UI/UX Engineering & Design Systems',
      description: 'Swiss-modern design systems, responsive atomic component libraries, and certified accessible interfaces.',
      icon: <Layout className="w-6 h-6 text-[#F59E0B]" />,
      techStack: ['Figma', 'Storybook', 'Tailwind', 'Motion', 'Radix UI'],
      capabilities: ['Multi-Brand Token Libraries', 'WCAG AAA Color & Screen Readers', 'Fluid Layout Transitions', 'Design-to-Code Automation']
    }
  ];

  const filteredServices = activeCategory === 'All' 
    ? serviceOfferings 
    : serviceOfferings.filter(s => s.category === activeCategory);

  const handleOpenModal = (serviceItem: typeof serviceOfferings[0]) => {
    const matchedConstant = SERVICES.find(s => s.id === serviceItem.id) || {
      id: serviceItem.id,
      title: serviceItem.title,
      description: serviceItem.description,
      icon: 'Globe',
      features: serviceItem.capabilities,
      longDescription: serviceItem.description,
      technicalSpecs: serviceItem.techStack.map(t => ({ label: 'Technology', value: t }))
    };
    setSelectedService(matchedConstant);
    setIsModalOpen(true);
  };

  return (
    <section 
      id={SectionId.SERVICES} 
      className="py-28 bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>ENTERPRISE CAPABILITIES</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Modular services built for <span className="text-[#38BDF8]">scale</span>.
            </h2>
          </div>

          <p className="text-slate-600 dark:text-slate-400 max-w-md text-base leading-relaxed font-normal">
            Bespoke engineering across the digital lifecycle. Every offering is backed by strict SLAs and zero-debt architecture.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md shadow-black/10'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid of Modular Services (6-Card Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => handleOpenModal(service)}
              className="group p-8 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-[#38BDF8] transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Monospaced Feature Checklist */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <Check size={14} className="text-[#10B981] shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Tech Stack & CTA Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {service.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#38BDF8] group-hover:underline inline-flex items-center gap-1">
                  Deep Dive <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </section>
  );
};
