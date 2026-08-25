import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Activity,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionId } from '../types';

export interface ProcessStage {
  id: string;
  stepNumber: string; // e.g., '01', '02', '03', '04'
  title: string;
  subtitle: string;
  description: string;
  timeToMarket: string; // e.g., '1-2 Weeks', '3-4 Sprints'
  sprintVelocity: number; // Percentage integer e.g., 95
  deliverables: string[];
  metrics: { label: string; value: string }[];
  isCurrentActive?: boolean;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discovery',
    stepNumber: '01',
    title: 'Discovery & System Audit',
    subtitle: 'Architecture assessment & vulnerability mapping',
    description: 'We perform deep-code analysis, system bottleneck identification, and compliance alignment to establish baseline specs.',
    timeToMarket: '1-2 Weeks',
    sprintVelocity: 95,
    deliverables: ['System Architecture Blueprint', 'Vulnerability & SLA Gap Map', 'Sprint Capacity Estimation'],
    metrics: [{ label: 'Audit Depth', value: '100% Codebase' }, { label: 'Risk Latency', value: '< 24 Hours' }]
  },
  {
    id: 'architecture',
    stepNumber: '02',
    title: 'Core System Design',
    subtitle: 'Schema design, API contracts & cloud topology',
    description: 'Constructing microservice boundaries, event-driven data pipelines, and zero-trust security architecture.',
    timeToMarket: '2-3 Weeks',
    sprintVelocity: 98,
    deliverables: ['OpenAPI 3.0 Specs', 'Database Migration Schema', 'Cloud Infrastructure Topology'],
    metrics: [{ label: 'Schema Resilience', value: 'ACID Strict' }, { label: 'API P99 Target', value: '< 30ms' }]
  },
  {
    id: 'execution',
    stepNumber: '03',
    title: 'Sprint Execution & CI/CD',
    subtitle: 'Agile sprints with automated test suites',
    description: 'Bi-weekly sprint iterations backed by 90%+ unit test coverage, static analysis, and continuous deployment.',
    timeToMarket: 'Bi-weekly Sprints',
    sprintVelocity: 99,
    deliverables: ['Production React/TS Code', 'Docker & K8s Manifests', 'Automated E2E Test Suite'],
    metrics: [{ label: 'Code Coverage', value: '94.2%' }, { label: 'Deploy Cadence', value: 'Daily Automated' }]
  },
  {
    id: 'deployment',
    stepNumber: '04',
    title: 'Global Deployment & Monitoring',
    subtitle: 'Multi-region cluster launch & live telemetry',
    description: 'Deploying workloads to global edge nodes with 24/7 telemetry monitoring and automated failover.',
    timeToMarket: 'Continuous',
    sprintVelocity: 100,
    deliverables: ['Multi-Region Cluster', 'Datadog/Grafana Dashboards', '24/7 SLA Guarantee'],
    metrics: [{ label: 'Target SLA', value: '99.98%' }, { label: 'Global Edge RTT', value: '< 50ms' }]
  }
];

export const Process: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('discovery');

  const activeStage = PROCESS_STAGES.find(s => s.id === activeStageId) || PROCESS_STAGES[0];

  const handleStageClick = (id: string) => {
    setActiveStageId(id);
  };

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'discovery': return <Search size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'architecture': return <Layers size={18} className="text-[#10B981] dark:text-[#10B981]" />;
      case 'execution': return <Code2 size={18} className="text-amber-500 dark:text-amber-400" />;
      case 'deployment': return <Rocket size={18} className="text-rose-500 dark:text-rose-400" />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <section 
      id={SectionId.PROCESS} 
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
              <Zap size={11} className="animate-pulse" /> SPRINT WORKFLOW METHODOLOGY
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Precision Lifecycle Engineering
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
              Every system designed, scaled, or audited by OITS Dhaka moves through strict, metrics-validated quality gates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">CI/CD VELOCITY INDEX</span>
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-mono block">100% Automated</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">QUALITY GAUNTLET STANDARD</span>
              <span className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono block">Zero-Trust SLA</span>
            </div>
          </div>
        </div>

        {/* Timeline Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4 Stages Nav Rail */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PROCESS_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(stage.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all relative flex gap-5 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none ${
                    isActive 
                      ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-md translate-x-1 lg:translate-x-2'
                      : 'bg-white/40 dark:bg-slate-900/20 border-slate-200/60 dark:border-slate-900/60 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-white/80 dark:hover:bg-slate-900/40'
                  }`}
                >
                  {/* Left Accent Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-stage-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-500 rounded-l-2xl" 
                    />
                  )}

                  {/* Icon Panel */}
                  <div className={`p-3 rounded-xl h-11 w-11 flex items-center justify-center shrink-0 border ${
                    isActive 
                      ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                  }`}>
                    {getStageIcon(stage.id)}
                  </div>

                  {/* Content Summary */}
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-100/60 dark:border-blue-900/20">
                        PHASE {stage.stepNumber}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        • {stage.timeToMarket}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">
                      {stage.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Stage Detail Panel (AnimatePresence) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Watermark Big Number */}
            <div className="absolute top-2 right-4 text-[120px] md:text-[160px] font-mono font-black text-slate-100 dark:text-slate-900/40 select-none pointer-events-none tracking-tighter leading-none h-full flex items-start">
              {activeStage.stepNumber}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8 relative z-10"
              >
                {/* Header Information */}
                <div className="space-y-2 max-w-[85%]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold block">
                      STAGE METRIC INSPECTION
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {activeStage.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/20 inline-block font-semibold">
                    {activeStage.subtitle}
                  </p>
                </div>

                {/* Core Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-[90%] font-normal">
                  {activeStage.description}
                </p>

                {/* Performance Analytics (Sprint Velocity Bar) */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-900/40">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="text-slate-400 dark:text-slate-500 uppercase tracking-widest">SPRINT EXEcUTION VELOCITY</span>
                    <span className="text-blue-600 dark:text-blue-400 font-black">{activeStage.sprintVelocity}% RATED</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeStage.sprintVelocity}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-full"
                    />
                  </div>
                  <p className="text-[9px] font-mono text-slate-400">
                    Calculated standard variance across historical telemetry releases.
                  </p>
                </div>

                {/* Core Deliverables Checklist */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-bold">
                    CORE GATE DELIVERABLES
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStage.deliverables.map((deliverable, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-700 dark:text-slate-300 font-mono"
                      >
                        <div className="h-5 w-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                          <Check size={11} className="stroke-[3]" />
                        </div>
                        <span className="truncate" title={deliverable}>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Impact Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {activeStage.metrics.map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                        {metric.label}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono block">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Status Panel */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                <span className="uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Activity size={12} className="text-emerald-500 animate-pulse" /> SPRINT STABILIZATION ONLINE
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  SLA APPROVED • NEXT GATES ARMED
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Quality Gates Assurance Strip */}
        <div className="p-6 sm:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200/80 dark:border-slate-800 shadow-md mt-12 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute right-0 bottom-0 h-32 w-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-[#10B981]/20 text-emerald-600 dark:text-[#10B981] border border-emerald-200 dark:border-[#10B981]/30 shrink-0">
              <Activity size={24} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold uppercase tracking-tight">Automated CI/CD Quality Gates</h4>
              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">Penetration Tested • SonarQube Audited • 99.98% SLA Guaranteed</p>
            </div>
          </div>

          <button
            onClick={() => {
              const contactEl = document.getElementById(SectionId.CONTACT);
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-[#10B981] text-white hover:text-slate-950 font-bold text-xs font-mono uppercase tracking-wider border border-blue-700 hover:border-[#10B981] transition-all whitespace-nowrap shadow-md shadow-blue-900/20 active:scale-98 relative z-10"
          >
            Start Discovery Sprint
          </button>
        </div>

      </div>
    </section>
  );
};
