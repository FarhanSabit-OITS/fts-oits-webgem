import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Cloud, 
  CheckCircle2, 
  Gauge, 
  Sparkles,
  Search,
  Activity,
  Code2,
  Bookmark,
  ShieldAlert,
  SlidersHorizontal,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TECH_DOMAINS } from '../constants';

export type AdoptionStatus = 'ADOPT' | 'TRIAL' | 'ASSESS';

export interface TechProfile {
  name: string;
  domain: 'frontend' | 'backend' | 'cloud' | 'specialized';
  status: AdoptionStatus;
  description: string;
  expertiseLevel: number; // e.g. 95 for 95%
  useCases: string[];
  p99Metrics?: string;
}

const TECH_PROFILES: TechProfile[] = [
  // Frontend
  {
    name: 'React',
    domain: 'frontend',
    status: 'ADOPT',
    description: 'The primary architecture for rendering high-fidelity, high-speed single-page application user interfaces.',
    expertiseLevel: 98,
    useCases: ['SaaS Dashboard Clients', 'Stateful Administrative Systems', 'Custom Components'],
    p99Metrics: 'Component Render Latency < 2ms'
  },
  {
    name: 'Next.js',
    domain: 'frontend',
    status: 'ADOPT',
    description: 'The production-grade React meta-framework for static site generation, server-side rendering, and API routes.',
    expertiseLevel: 95,
    useCases: ['SEO-Optimized Enterprise Sites', 'Dynamic E-Commerce Gateways', 'Hybrid Server-Client Apps'],
    p99Metrics: 'Time To First Byte < 45ms'
  },
  {
    name: 'TypeScript',
    domain: 'frontend',
    status: 'ADOPT',
    description: 'Strict, typed syntax layer on top of JavaScript, establishing robust type safety, autocomplete, and compile-time validation.',
    expertiseLevel: 100,
    useCases: ['Universal Codebases', 'Shared Enterprise API Contracts', 'Durable Component Libraries'],
    p99Metrics: 'Zero Implicit Any Violations'
  },
  {
    name: 'Tailwind CSS',
    domain: 'frontend',
    status: 'ADOPT',
    description: 'A utility-first CSS styling foundation allowing high-speed visual layout adjustments directly inside component source code.',
    expertiseLevel: 98,
    useCases: ['Swiss-Modern Editorial Frameworks', 'Fluid Responsive Viewports', 'Adaptive Dark/Light Themes'],
    p99Metrics: 'Unused Class Tree Shaken'
  },
  {
    name: 'Vue.js',
    domain: 'frontend',
    status: 'TRIAL',
    description: 'An approachable, progressive client-side framework used as a specialized alternative for single-module components.',
    expertiseLevel: 85,
    useCases: ['Single-Screen App Modules', 'Rapid UI Prototypes', 'Incremental Site Enhancement'],
    p99Metrics: 'Asset Bundle Weight < 28kB'
  },
  {
    name: 'Three.js',
    domain: 'frontend',
    status: 'ASSESS',
    description: 'A WebGL wrapper framework allowing creation of custom immersive 3D scene projections directly on the browser canvas.',
    expertiseLevel: 75,
    useCases: ['Immersive Showrooms', 'Interactive Data Visualizations', 'Custom Animated Canvases'],
    p99Metrics: 'Constant Frame Rate @ 60FPS'
  },

  // Backend
  {
    name: 'Node.js',
    domain: 'backend',
    status: 'ADOPT',
    description: 'The robust runtime foundation executing high-speed, non-blocking backend server events on top of the V8 JavaScript Engine.',
    expertiseLevel: 96,
    useCases: ['High-Concurrency API Servers', 'Real-time WebSocket Proxies', 'Serverless Logic Pipelines'],
    p99Metrics: 'P99 Concurrency > 10k Req/s'
  },
  {
    name: 'PostgreSQL',
    domain: 'backend',
    status: 'ADOPT',
    description: 'The premier open-source relational database system providing strict ACID compliance and high-performance querying.',
    expertiseLevel: 94,
    useCases: ['Core Transaction Records', 'Structured Relational Schemas', 'Full-Text Search Indices'],
    p99Metrics: 'Query Execution Latency < 8ms'
  },
  {
    name: 'NestJS',
    domain: 'backend',
    status: 'ADOPT',
    description: 'A structured, scalable server-side framework utilizing TypeScript and clean, decoupled architectural patterns.',
    expertiseLevel: 92,
    useCases: ['Microservice Core API Layers', 'Domain-Driven Architectures', 'Robust Backends'],
    p99Metrics: 'Boot Time < 4.2s'
  },
  {
    name: 'Python',
    domain: 'backend',
    status: 'TRIAL',
    description: 'A powerful programming language utilized in our pipelines primarily for data orchestration, ETLs, and ML models.',
    expertiseLevel: 88,
    useCases: ['Custom LLM Fine-Tuning', 'Data Processing Pipelines', 'ML-Driven Routing Engines'],
    p99Metrics: 'Inference Over Edge < 180ms'
  },
  {
    name: 'GraphQL',
    domain: 'backend',
    status: 'TRIAL',
    description: 'A query language for APIs, allowing client-side engineers to ask for exactly the schema they need with zero overfetching.',
    expertiseLevel: 86,
    useCases: ['Unified API Gateway Portals', 'Optimized Mobile Data Feeds', 'Multi-System Integration'],
    p99Metrics: 'Query Parsing Overhead < 3ms'
  },
  {
    name: 'Rust',
    domain: 'backend',
    status: 'ASSESS',
    description: 'A memory-safe, ultra-high-performance system language evaluated for CPU-intensive computing modules.',
    expertiseLevel: 72,
    useCases: ['High-Frequency Crypto Processing', 'Custom Performance Extensions', 'CPU-Bound Tasks'],
    p99Metrics: 'Zero Garbage Collector Latency'
  },

  // Infrastructure
  {
    name: 'AWS',
    domain: 'cloud',
    status: 'ADOPT',
    description: 'Our primary cloud infrastructure foundation, providing highly reliable elastic scalability across regional zones.',
    expertiseLevel: 94,
    useCases: ['Multi-Zone Workload Clusters', 'S3 Secure Blob Management', 'Secure IAM Infrastructure'],
    p99Metrics: 'Regional Node Availability 99.99%'
  },
  {
    name: 'Docker',
    domain: 'cloud',
    status: 'ADOPT',
    description: 'The universal containerization standard, encapsulating code and system dependencies to guarantee consistency from local to prod.',
    expertiseLevel: 98,
    useCases: ['Standardized Dev Envs', 'Containerized Web Applications', 'CI/CD Pipeline Artifacts'],
    p99Metrics: 'Container Boot Ingress < 1.5s'
  },
  {
    name: 'CI/CD',
    domain: 'cloud',
    status: 'ADOPT',
    description: 'Continuous Integration & Deployment pipelines implementing automated syntax checks, unit testing, and canary releases.',
    expertiseLevel: 95,
    useCases: ['Automated Unit & E2E Testing', 'Vulnerability Scan Pipelines', 'Zero-Downtime Releases'],
    p99Metrics: 'Pipeline Run Time < 5.5 Minutes'
  },
  {
    name: 'Terraform',
    domain: 'cloud',
    status: 'TRIAL',
    description: 'Declarative Infrastructure as Code (IaC) templates allowing precise, version-controlled resource provisioning.',
    expertiseLevel: 88,
    useCases: ['Multi-Tier Cloud Topologies', 'VPC & Subnet Deployments', 'Secure CDN & DNS Routing'],
    p99Metrics: 'Provision Success Rate 100%'
  },
  {
    name: 'Kubernetes',
    domain: 'cloud',
    status: 'TRIAL',
    description: 'A container orchestration platform scaling multi-container applications across production node clusters automatically.',
    expertiseLevel: 85,
    useCases: ['High-Traffic Horizontal Scaling', 'Automated Workload Failover', 'Distributed Microservice Mesh'],
    p99Metrics: 'Pod Auto-Scale Response < 12s'
  },
  {
    name: 'Google Cloud (GCP)',
    domain: 'cloud',
    status: 'ASSESS',
    description: 'An alternative cloud environment evaluated for specialized big data analytics, BigQuery indexing, and container workloads.',
    expertiseLevel: 82,
    useCases: ['BigQuery Telemetry Pipelines', 'GKE Hybrid Workloads', 'Vertex AI Deployments'],
    p99Metrics: 'Query Cold Startup < 850ms'
  },

  // Specialized (AI/ML, IoT, AR/VR, Blockchain/Web-3/DApp, Intelligent Features, Cross-Platform, PWA)
  {
    name: 'Cross-Platform Solutions',
    domain: 'specialized',
    status: 'ADOPT',
    description: 'Unified mobile architectures (Flutter and React Native) allowing high-fidelity iOS and Android delivery from single codebases.',
    expertiseLevel: 95,
    useCases: ['HIPAA-Compliant Patient Portals', 'Global Logistics Mobile Client', 'NeoBank Banking Clients'],
    p99Metrics: 'App Launch Frame Rate @ 60FPS'
  },
  {
    name: 'Progressive Web Apps (PWA)',
    domain: 'specialized',
    status: 'ADOPT',
    description: 'Standard modern web capabilities configured with local service workers to provide instant-load, offline-capable mobile websites.',
    expertiseLevel: 92,
    useCases: ['Local-First POS Client Systems', 'Offline Workload Management', 'Mobile Ingress Portal'],
    p99Metrics: 'Service Worker Offline Sync < 1.2s'
  },
  {
    name: 'Intelligent Features Augmentation',
    domain: 'specialized',
    status: 'TRIAL',
    description: 'Enriching software ecosystems with server-side AI integrations, vector embeddings, and real-time cognitive logic.',
    expertiseLevel: 90,
    useCases: ['Automated Diagnostic Scopes', 'Intent-Driven Chat Assistants', 'Smart Document Parsers'],
    p99Metrics: 'API Vector Search < 35ms'
  },
  {
    name: 'AI & Machine Learning',
    domain: 'specialized',
    status: 'TRIAL',
    description: 'Custom diagnostic vision and statistical prediction models trained on specialized enterprise data to optimize logistics or pricing.',
    expertiseLevel: 88,
    useCases: ['Predictive Traffic Routing', 'Inventory Optimization Engine', 'Anisotropy Defect Detection'],
    p99Metrics: 'Model Prediction Variance < 2%'
  },
  {
    name: 'Internet of Things (IoT)',
    domain: 'specialized',
    status: 'ASSESS',
    description: 'Telemetry pipelines mapping, analyzing, and reporting edge telemetry data received from micro-controller sensor fleets.',
    expertiseLevel: 80,
    useCases: ['Smart Grid Telemetry Ingestion', 'Industrial Temp Fleet Trackers', 'MQTT Message Brokering'],
    p99Metrics: 'Message Ingestion Loss Rate < 0.01%'
  },
  {
    name: 'AR & VR Solutions',
    domain: 'specialized',
    status: 'ASSESS',
    description: 'Creating customized WebXR, Unity, and Unreal Engine interactive overlays representing immersive physical showrooms.',
    expertiseLevel: 75,
    useCases: ['Virtual Real Estate Galleries', 'Industrial Digital Twins', 'AR Training Assist Specs'],
    p99Metrics: 'Stereoscopic Scene Latency < 12ms'
  },
  {
    name: 'Blockchain, Web-3 & DApp',
    domain: 'specialized',
    status: 'ASSESS',
    description: 'Evaluating decentralized smart contract engines (Solidity, Rust) for secure transactions and unalterable ledger entries.',
    expertiseLevel: 70,
    useCases: ['Automated Supply Chain Settlement', 'Decentralized Audit Logs', 'High-Trust Smart Protocols'],
    p99Metrics: 'Gas Optimization Compliance 100%'
  }
];

export const TechStackSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTechName, setActiveTechName] = useState<string>('React');

  const filteredTechs = TECH_PROFILES.filter(tech => {
    const domainMatch = selectedDomain === 'all' || tech.domain === selectedDomain;
    const statusMatch = selectedStatus === 'all' || tech.status === selectedStatus;
    return domainMatch && statusMatch;
  });

  const activeTech = TECH_PROFILES.find(t => t.name === activeTechName) || TECH_PROFILES[0];

  const getDomainLabel = (domain: string) => {
    switch (domain) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'cloud': return 'Infrastructure';
      case 'specialized': return 'Specialized';
      default: return domain;
    }
  };

  const getStatusColor = (status: AdoptionStatus) => {
    switch (status) {
      case 'ADOPT': return 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30';
      case 'TRIAL': return 'bg-blue-100/70 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/30';
      case 'ASSESS': return 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // Polar coordinate math for placing dots in the 4-quadrant radar SVG
  // Quad 0: Top-Right (Frontend), Quad 1: Bottom-Right (Backend)
  // Quad 2: Bottom-Left (Infrastructure), Quad 3: Top-Left (Specialized)
  const getRadarCoordinates = (tech: TechProfile) => {
    let angleRange = [0, 90]; // angles in degrees
    if (tech.domain === 'frontend') angleRange = [15, 75];
    else if (tech.domain === 'backend') angleRange = [105, 165];
    else if (tech.domain === 'cloud') angleRange = [195, 255];
    else if (tech.domain === 'specialized') angleRange = [285, 345];

    let radius = 180; // ADOPT: inner ring
    if (tech.status === 'ADOPT') radius = 70;
    else if (tech.status === 'TRIAL') radius = 130;
    else if (tech.status === 'ASSESS') radius = 190;

    // Distribute skills along the angle range based on their name characters
    const hash = tech.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const angleDegree = angleRange[0] + (hash % (angleRange[1] - angleRange[0]));
    const angleRad = (angleDegree * Math.PI) / 180;

    // SVG Center is (220, 220)
    const cx = 220;
    const cy = 220;
    const x = cx + radius * Math.cos(angleRad);
    const y = cy - radius * Math.sin(angleRad); // negative because SVG y axis goes down

    return { x, y };
  };

  return (
    <section 
      id="tech-stack" 
      className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500"
    >
      {/* Top gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      {/* Subtle grid pattern dot overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] bg-[size:24px_24px] opacity-25 dark:opacity-20 pointer-events-none" 
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-200 dark:border-slate-900">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/60 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full">
              <SlidersHorizontal size={11} className="animate-pulse" /> TECHNOLOGY ECOSYSTEM ADOPTION RADAR
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Operational Tech Radar
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
              We monitor, benchmark, and adopt next-generation architectures grouped across our core delivery quadrants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">RADAR RADIAL DOMAINS</span>
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-mono block">4 Key Sectors</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">TOTAL CAPABILITIES CATALOG</span>
              <span className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono block">{TECH_PROFILES.length} Active Stacks</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900/60 rounded-2xl">
          {/* Domain Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                selectedDomain === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40 font-bold'
                  : 'bg-white dark:bg-slate-900/50 text-slate-500 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Domains
            </button>
            {['frontend', 'backend', 'cloud', 'specialized'].map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                  selectedDomain === dom
                    ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40 font-bold'
                    : 'bg-white dark:bg-slate-900/50 text-slate-500 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {getDomainLabel(dom)}
              </button>
            ))}
          </div>

          {/* Status Rings Filters */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                selectedStatus === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40 font-bold'
                  : 'bg-white dark:bg-slate-900/50 text-slate-500 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Statuses
            </button>
            {['ADOPT', 'TRIAL', 'ASSESS'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                  selectedStatus === st
                    ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40 font-bold'
                    : 'bg-white dark:bg-slate-900/50 text-slate-500 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Grid: Radar Map and Technical Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: SVG Polar Radar Board (Desktop-First Interactive Canvas) */}
          <div className="lg:col-span-6 xl:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-[2rem] p-6 shadow-sm flex flex-col justify-center items-center relative overflow-hidden">
            {/* Legend watermarks inside layout */}
            <div className="absolute top-4 left-6 font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-bold">
              RADAR QUADRANT VISUALIZER
            </div>

            {/* Radar SVG */}
            <div className="w-full max-w-[440px] aspect-square relative py-6">
              <svg 
                viewBox="0 0 440 440" 
                className="w-full h-full overflow-visible select-none drop-shadow-sm"
              >
                {/* Radial Rings: ADOPT, TRIAL, ASSESS */}
                {/* Center Circle is at (220, 220) */}
                <circle cx="220" cy="220" r="190" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-900/60" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="220" cy="220" r="130" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-900/60" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="220" cy="220" r="70" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-900/60" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Quadrant Separation Axis Lines */}
                <line x1="220" y1="20" x2="220" y2="420" stroke="currentColor" className="text-slate-200 dark:text-slate-900/40" strokeWidth="1.2" />
                <line x1="20" y1="220" x2="420" y2="220" stroke="currentColor" className="text-slate-200 dark:text-slate-900/40" strokeWidth="1.2" />

                {/* Ring Labels */}
                <text x="220" y="146" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none">ADOPT</text>
                <text x="220" y="86" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none">TRIAL</text>
                <text x="220" y="26" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none">ASSESS</text>

                {/* Quadrant Sector Text Labels */}
                <text x="390" y="45" textAnchor="end" className="fill-blue-500/80 dark:fill-blue-400/60 font-mono text-[9px] font-black uppercase tracking-widest pointer-events-none">FRONTEND</text>
                <text x="390" y="405" textAnchor="end" className="fill-emerald-500/80 dark:fill-emerald-400/60 font-mono text-[9px] font-black uppercase tracking-widest pointer-events-none">BACKEND</text>
                <text x="50" y="405" textAnchor="start" className="fill-indigo-500/80 dark:fill-indigo-400/60 font-mono text-[9px] font-black uppercase tracking-widest pointer-events-none">CLOUD</text>
                <text x="50" y="45" textAnchor="start" className="fill-rose-500/80 dark:fill-rose-400/60 font-mono text-[9px] font-black uppercase tracking-widest pointer-events-none">SPECIALIZED</text>

                {/* Interactive Node Bullets mapping each skill */}
                {TECH_PROFILES.map((tech) => {
                  const { x, y } = getRadarCoordinates(tech);
                  const isCurrentlyActive = tech.name === activeTechName;
                  const isVisibleInFilters = filteredTechs.some(t => t.name === tech.name);

                  // Colors based on domain
                  let bulletColor = 'text-blue-500';
                  if (tech.domain === 'backend') bulletColor = 'text-emerald-500';
                  else if (tech.domain === 'cloud') bulletColor = 'text-indigo-500';
                  else if (tech.domain === 'specialized') bulletColor = 'text-rose-500';

                  return (
                    <g 
                      key={tech.name}
                      onClick={() => setActiveTechName(tech.name)}
                      className={`cursor-pointer transition-all duration-300 ${
                        isVisibleInFilters ? 'opacity-100' : 'opacity-10 dark:opacity-5'
                      }`}
                    >
                      {/* Outer pulse ring for active nodes */}
                      {isCurrentlyActive && (
                        <circle 
                          cx={220} 
                          cy={220} 
                          r={tech.status === 'ADOPT' ? 70 : tech.status === 'TRIAL' ? 130 : 190} 
                          fill="none" 
                          stroke="currentColor" 
                          className="text-blue-500/10 dark:text-blue-400/10" 
                          strokeWidth="8"
                          style={{ transformOrigin: 'center' }}
                        />
                      )}

                      {/* Outer node glow ring */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isCurrentlyActive ? 12 : 6} 
                        fill="currentColor" 
                        className={`${bulletColor} opacity-20`}
                      />

                      {/* Core node */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isCurrentlyActive ? 6 : 3.5} 
                        fill="currentColor" 
                        className={`${bulletColor} transition-all duration-300`}
                        stroke={isCurrentlyActive ? '#ffffff' : 'none'}
                        strokeWidth="1.5"
                      />

                      {/* Floating node label on active */}
                      {isCurrentlyActive && (
                        <g>
                          <rect 
                            x={x - 30} 
                            y={y - 28} 
                            width="60" 
                            height="16" 
                            rx="4" 
                            fill="#0f172a" 
                            className="stroke-slate-800 stroke-[1]"
                          />
                          <text 
                            x={x} 
                            y={y - 17} 
                            textAnchor="middle" 
                            fill="#ffffff" 
                            className="font-mono text-[8px] font-bold"
                          >
                            {tech.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Micro-Interaction Hint */}
            <p className="font-mono text-[9px] text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider mt-4">
              * Click coordinates above to view domain-level engineering profile profiles
            </p>
          </div>

          {/* Right: Technical Profile Card Inspector */}
          <div className="lg:col-span-6 xl:col-span-5 bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            {/* Watermark Section Indicator */}
            <div className="absolute top-4 right-6 font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold block">
              ADOPTION PROFILE
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  {/* Category, Status & Level Row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-bold">
                      {getDomainLabel(activeTech.domain)} Sector
                    </span>
                    
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black border ${getStatusColor(activeTech.status)}`}>
                      {activeTech.status} RING
                    </span>
                  </div>

                  {/* Tech Brand Typography */}
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {activeTech.name}
                    </h3>
                    <div className="font-mono text-[9px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                      OITS DEPLOYMENT NODE • VERIFIED
                    </div>
                  </div>

                  {/* Core Description block */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                      ARCHITECTURAL SYNOPsIS
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {activeTech.description}
                    </p>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-900/40">
                    <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                      <span className="text-slate-400 dark:text-slate-500 uppercase tracking-widest">ENGINEERING FLUENCY RATE</span>
                      <span className="text-blue-600 dark:text-blue-400 font-black">{activeTech.expertiseLevel}%</span>
                    </div>
                    {/* Track */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeTech.expertiseLevel}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Core Use Cases */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-bold">
                      PROVEN USE CASES
                    </span>
                    <div className="flex flex-col gap-2">
                      {activeTech.useCases.map((useCase, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-900/60 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-mono"
                        >
                          <div className="h-4 w-4 rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                            <CheckCircle2 size={10} className="stroke-[3]" />
                          </div>
                          <span className="truncate text-slate-700 dark:text-slate-300">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark target telemetry */}
                  {activeTech.p99Metrics && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                        BENCHMARK RELEASE TELEMETRY
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/20">
                        {activeTech.p99Metrics}
                      </span>
                    </div>
                  )}

                </div>

                {/* Bottom Card Action Footer */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-8">
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 dark:text-slate-500">
                    <span className="uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <Activity size={12} className="text-emerald-500 animate-pulse" /> TARGET RADAR LOCKED
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      SLA COMpLIANT
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Tabbed Grid list view for filtering search below */}
        <div className="mt-12 bg-white dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-900/50 rounded-3xl p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-6">
            <Workflow className="w-4 h-4 text-blue-500" />
            <span>Operational Stack Checklist ({filteredTechs.length} elements selected)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredTechs.map((tech) => (
              <button
                key={tech.name}
                onClick={() => setActiveTechName(tech.name)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  tech.name === activeTechName
                    ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/80 font-bold'
                    : 'bg-white dark:bg-slate-900/20 border-slate-200/60 dark:border-slate-900/60 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                }`}
              >
                <span className="font-sans text-xs font-bold leading-tight line-clamp-1">{tech.name}</span>
                <span className="font-mono text-[8px] uppercase tracking-wider block opacity-70">
                  {tech.status} Ring
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
