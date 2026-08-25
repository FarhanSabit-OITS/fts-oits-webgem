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
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Calculator,
  RotateCcw
} from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId, Service } from '../types';
import { ServiceModal } from './ServiceModal';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Architecture Gaps Questionnaire State
  const [selectedGaps, setSelectedGaps] = useState<string[]>([]);
  const [auditGenerated, setAuditGenerated] = useState(false);

  const categories = ['All', 'Web Application', 'Mobile App', 'Cloud', 'UI/UX', 'Custom Software'];

  const serviceOfferings = [
    {
      id: 'web-app',
      category: 'Web Application',
      title: 'Web Application Development',
      description: 'High-performance, scalable web applications built to handle global traffic and complex business logic.',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      techStack: ['React/Next.js', 'Node.js', 'PostgreSQL'],
      capabilities: ['Server-Side Rendering', 'Microservices Architecture', 'Global CDN Edge Delivery']
    },
    {
      id: 'mobile-app',
      category: 'Mobile App',
      title: 'Mobile App Development',
      description: 'Cross-platform native experiences delivering smooth, responsive, and secure mobile solutions.',
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      techStack: ['React Native', 'Flutter', 'Swift/Kotlin'],
      capabilities: ['Offline-First Architecture', 'Real-time Push Notifications', 'Hardware Acceleration']
    },
    {
      id: 'cloud-solutions',
      category: 'Cloud',
      title: 'Cloud Solutions',
      description: 'Elastic, secure, and auto-scaling cloud infrastructure built for 99.99% enterprise uptime.',
      icon: <Cloud className="w-6 h-6 text-amber-500" />,
      techStack: ['AWS', 'Google Cloud', 'Kubernetes'],
      capabilities: ['Auto-scaling Clusters', 'Zero-Downtime Deployments', 'Multi-Region Failovers']
    },
    {
      id: 'ui-ux',
      category: 'UI/UX',
      title: 'UI/UX Design',
      description: 'Data-driven, user-centric interfaces meticulously designed for maximum engagement and conversion.',
      icon: <Layout className="w-6 h-6 text-purple-500" />,
      techStack: ['Figma', 'Framer Motion', 'Tailwind CSS'],
      capabilities: ['Interactive Prototyping', 'Accessibility Compliance (WCAG)', 'Design System Architecture']
    },
    {
      id: 'custom-software',
      category: 'Custom Software',
      title: 'Custom Software Development',
      description: 'Bespoke enterprise software tailored to automate your unique workflows and scale your business operations.',
      icon: <Cpu className="w-6 h-6 text-rose-500" />,
      techStack: ['Python', 'Go', 'Rust'],
      capabilities: ['Legacy System Modernization', 'Workflow Automation', 'Enterprise Integration']
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

  const gapOptions = [
    { id: 'monolith', label: 'Monolith Bottlenecks & Scaling Friction', risk: 25 },
    { id: 'cicd', label: 'Slow Manual CI/CD Deployments (>2 Hours)', risk: 20 },
    { id: 'latency', label: 'High Database Query Latency (>200ms)', risk: 25 },
    { id: 'security', label: 'Manual Security & Vulnerability Audits', risk: 15 },
    { id: 'silos', label: 'Data Silos & Missing Real-time Telemetry', risk: 15 }
  ];

  const toggleGap = (id: string) => {
    setSelectedGaps(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
    setAuditGenerated(false);
  };

  const calculatedRiskScore = selectedGaps.reduce((acc, currentId) => {
    const found = gapOptions.find(g => g.id === currentId);
    return acc + (found ? found.risk : 0);
  }, 0);

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id={SectionId.SERVICES} 
      className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/40 text-[10px] font-mono font-bold tracking-widest text-blue-700 dark:text-blue-400 mb-4 uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>ENTERPRISE CAPABILITIES</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-950 dark:text-white">
              ENGINEERING SERVICES & CAPABILITIES
            </h2>
          </div>

          <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm leading-relaxed font-normal">
            High-availability engineering across the digital infrastructure lifecycle. Every service is backed by guaranteed SLAs and zero-debt code standards.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4-Column Service Capability Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => handleOpenModal(service)}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header & Category Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors mb-2 uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverable Checklist */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills & Deep Dive */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {service.techStack.slice(0, 2).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-[10px] font-mono font-bold text-blue-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  DETAILS <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* B. Interactive Service Comparison Matrix */}
        <div className="mb-20 p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
              ARCHITECTURAL BENCHMARKING
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-3">
              Legacy Infrastructure vs. OITS Modern Digital Core
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Quantifiable performance metrics comparing typical monoliths against our zero-trust microservice architecture.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-widest text-[10px]">
                  <th className="py-4 px-4">Performance Vector</th>
                  <th className="py-4 px-4 text-rose-500">Legacy Systems</th>
                  <th className="py-4 px-4 text-emerald-500">OITS Modern Cloud Core</th>
                  <th className="py-4 px-4 text-right">Quantified Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">Query Throughput</td>
                  <td className="py-4 px-4 text-slate-500">~1,200 req/sec</td>
                  <td className="py-4 px-4 font-bold text-emerald-400">15,000+ req/sec</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-[10px]">
                      3.4x THROUGHPUT BOOST
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">Deployment Latency</td>
                  <td className="py-4 px-4 text-slate-500">Manual (2-4 Hours)</td>
                  <td className="py-4 px-4 font-bold text-blue-400">Automated (&lt; 3 Mins)</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[10px]">
                      98% SPEEDUP
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">Infrastructure Cost</td>
                  <td className="py-4 px-4 text-slate-500">Over-provisioned Idle Servers</td>
                  <td className="py-4 px-4 font-bold text-amber-400">Elastic Auto-scaling Nodes</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold text-[10px]">
                      60% INFRA COST REDUCTION
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">Security & Compliance</td>
                  <td className="py-4 px-4 text-slate-500">Perimeter Defense Only</td>
                  <td className="py-4 px-4 font-bold text-emerald-400">Zero-Trust & Vault Secrets</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-[10px]">
                      100% OWASP ASVS COMPLIANT
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* C. Architecture Gaps Audit Widget (#architecture-gaps) */}
        <div id="architecture-gaps" className="p-8 md:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200/80 dark:border-slate-800 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-500/30">
                ENTERPRISE SYSTEM DIAGNOSTICS
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Identify Your Architecture Gaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Select the structural friction points currently affecting your organization to compute a risk vulnerability score and generate an audit strategy.
              </p>

              <div className="space-y-2.5 pt-2">
                {gapOptions.map((gap) => {
                  const isSelected = selectedGaps.includes(gap.id);
                  return (
                    <button
                      key={gap.id}
                      onClick={() => toggleGap(gap.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-slate-950 dark:text-white shadow-sm font-bold' 
                          : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isSelected && <Check size={11} />}
                        </div>
                        <span>{gap.label}</span>
                      </div>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">+{gap.risk}% Risk</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 text-center shadow-sm">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 block font-bold mb-2">
                  COMPUTED VULNERABILITY INDEX
                </span>
                <div className="text-5xl font-black font-mono tracking-tighter text-amber-600 dark:text-amber-400 my-2">
                  {calculatedRiskScore}%
                </div>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {calculatedRiskScore === 0 
                    ? 'No vulnerabilities selected. Select gaps on the left.' 
                    : calculatedRiskScore > 50 
                    ? 'CRITICAL RISK: System requires immediate core refactoring.' 
                    : 'MODERATE RISK: Optimization recommended for scale.'}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setAuditGenerated(true);
                    scrollToContact();
                  }}
                  disabled={selectedGaps.length === 0}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/30"
                >
                  Request Custom Audit Quote
                </button>

                {selectedGaps.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedGaps([]);
                      setAuditGenerated(false);
                    }}
                    className="text-[10px] font-mono text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
                  >
                    Reset Diagnostic Selection
                  </button>
                )}
              </div>
            </div>

          </div>
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

