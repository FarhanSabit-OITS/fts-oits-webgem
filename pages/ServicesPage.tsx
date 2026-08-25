import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Server, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Zap, 
  Activity, 
  Terminal, 
  TrendingUp, 
  ChevronRight, 
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_EMAIL, COMPANY_NAME } from '../constants';
import { CopyEmailButton } from '../components/CopyEmailButton';
import { SectionWrapper } from '../components/SectionWrapper';

// Define the Agile pipeline stages data model
export interface ProcessStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  timeToMarket: string;
  sprintVelocity: number;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discovery',
    stepNumber: '01',
    title: 'Discovery & System Audit',
    subtitle: 'Architecture assessment & vulnerability mapping',
    description: 'We perform deep-code analysis, system bottleneck identification, and compliance alignment to establish baseline specs before sprint commencement.',
    timeToMarket: '1-2 Weeks',
    sprintVelocity: 95,
    deliverables: [
      'System Architecture Blueprint & Dependency Graph',
      'Vulnerability & SLA Gap Analysis Report',
      'Sprint Capacity & Resource Allocation Map'
    ],
    metrics: [
      { label: 'Audit Depth', value: '100% Codebase' },
      { label: 'Risk Identification', value: '< 24 Hours' }
    ]
  },
  {
    id: 'architecture',
    stepNumber: '02',
    title: 'Core System Design',
    subtitle: 'Schema design, API contracts & cloud topology',
    description: 'Constructing microservice boundaries, event-driven data pipelines, and zero-trust security architecture tailored for multi-region scale.',
    timeToMarket: '2-3 Weeks',
    sprintVelocity: 98,
    deliverables: [
      'OpenAPI 3.0 Endpoints & Type Specifications',
      'Database Migration & ACID Schema Model',
      'Cloud Infrastructure Topology (Terraform / K8s)'
    ],
    metrics: [
      { label: 'Schema Resilience', value: 'ACID Strict' },
      { label: 'API P99 Target', value: '< 30ms' }
    ]
  },
  {
    id: 'execution',
    stepNumber: '03',
    title: 'Sprint Execution & CI/CD',
    subtitle: 'Agile sprints with automated test suites',
    description: 'Bi-weekly sprint iterations backed by 90%+ unit test coverage, static analysis, and continuous automated deployment pipelines.',
    timeToMarket: 'Bi-weekly Sprints',
    sprintVelocity: 99,
    deliverables: [
      'Production React/TypeScript Frontend Modules',
      'Docker Containers & Orchestration Manifests',
      'Automated E2E & Regression Test Suite'
    ],
    metrics: [
      { label: 'Code Coverage', value: '94.2%' },
      { label: 'Deploy Cadence', value: 'Daily Automated' }
    ]
  },
  {
    id: 'deployment',
    stepNumber: '04',
    title: 'Global Deployment & Monitoring',
    subtitle: 'Multi-region cluster launch & live telemetry',
    description: 'Deploying critical workloads to global edge nodes with 24/7 telemetry monitoring, log aggregation, and automated failover guarantees.',
    timeToMarket: 'Continuous',
    sprintVelocity: 100,
    deliverables: [
      'Multi-Region Cluster Deployment',
      'Datadog / Grafana Telemetry Dashboards',
      '24/7 SLA & Uptime Maintenance Agreement'
    ],
    metrics: [
      { label: 'Target SLA', value: '99.98%' },
      { label: 'Global Edge RTT', value: '< 50ms' }
    ]
  }
];

export const ServicesPage: React.FC = () => {
  // Audit Checklist Form state
  const [hasMonolithBottlenecks, setHasMonolithBottlenecks] = useState(false);
  const [hasSlowDeploys, setHasSlowDeploys] = useState(false);
  const [hasComplianceGaps, setHasComplianceGaps] = useState(false);
  const [activeProcessTab, setActiveProcessTab] = useState<string>('discovery');

  // Interactive dynamic calculation logic
  const calculateRiskIndex = () => {
    let score = 20;
    if (hasMonolithBottlenecks) score += 30;
    if (hasSlowDeploys) score += 25;
    if (hasComplianceGaps) score += 25;
    return score;
  };

  const getAuditRecommendation = () => {
    const risk = calculateRiskIndex();
    if (risk > 60) return {
      level: 'CRITICAL',
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      action: 'Schedule an immediate architecture gap audit to secure operations.'
    };
    if (risk > 30) return {
      level: 'MODERATE',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      action: 'Consider microservice modularization & CI/CD deployment standardizing.'
    };
    return {
      level: 'OPTIMAL',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      action: 'Your system is stable. Partner with OITS for next-gen performance scaling.'
    };
  };

  const riskScore = calculateRiskIndex();
  const recommendation = getAuditRecommendation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* A. Services Page Header Hero Banner */}
      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* Visual elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} className="text-slate-600" />
            <span className="text-blue-400">Services & Solutions</span>
          </nav>

          {/* Content Cluster */}
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900/50 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full border border-blue-500/20">
              ENTERPRISE SOLUTIONS CAPABILITIES
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">
              Precision Engineering & <br className="hidden md:block" />
              <span className="text-[#38BDF8]">Cloud Architecture</span>
            </h1>

            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed font-normal">
              We deploy highly structured web portals, distributed systems pipelines, zero-debt microservices topologies, and secure compliance environments matched with peak SLAs.
            </p>
          </div>

        </div>
      </section>

      {/* B. Services & Solutions Main Section */}
      <SectionWrapper id="services" className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
        
        {/* Section Heading */}
        <div className="mb-16 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>CAPABILITY SETS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Comprehensive Engineering <span className="text-[#38BDF8]">Ecosystem</span>.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm sm:text-base">
            Every layer is optimized for Swiss-Modern compliance, low maintenance latency, and high-performance throughput.
          </p>
        </div>

        {/* 4-Column Bento-style Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Frontend Card */}
          <div className="group p-7 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="p-3 w-fit rounded-2xl bg-sky-500/10 text-sky-500">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400">01 / FRONTEND</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors">
                  Frontend Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  High-performance single page systems and editorial client portals optimized for rapid page delivery metrics.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> React 19 / Next.js</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Tailwind / CSS Tokens</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Motion / Micro-interactions</li>
              </ul>
            </div>
            <div className="pt-5 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>99+ LIGHTHOUSE</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Backend Card */}
          <div className="group p-7 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Server className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400">02 / BACKEND</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors">
                  Backend Services
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Distributed microservice pipelines with strict type enforcement and sub-30ms execution speeds.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Node.js / Go APIs</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> PostgreSQL & ACID</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> OpenAPI Speccing</li>
              </ul>
            </div>
            <div className="pt-5 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>SUB-30MS TARGET</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Cloud Card */}
          <div className="group p-7 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-500">
                <Cloud className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400">03 / DEVOPS</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors">
                  Cloud & Infrastructure
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Highly persistent multi-region Kubernetes clusters managed via standardized Terraform scripts.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> K8s / Dockerized Containers</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Terraform / Ansible</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Multi-Region Failover</li>
              </ul>
            </div>
            <div className="pt-5 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>99.98% SLA GATEWAY</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Specialized Card */}
          <div className="group p-7 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-500">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400">04 / INTELLIGENT</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors">
                  Specialized Solutions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  RAG pipelines powered by Gemini models, real-time WebSockets, and zero-debt Web-3 dApp frameworks.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Gemini LLM RAG pipelines</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Socket.IO integration</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Decentralized Nodes</li>
              </ul>
            </div>
            <div className="pt-5 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>AI AGENTS INCLUDED</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Interactive Architecture Comparison Matrix */}
        <div className="mb-24 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              PERFORMANCE ARCHITECTURE METRIC COMPARISON
            </h3>
            <h4 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
              Enterprise Topology Benchmark Matrix
            </h4>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0C1222] shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="p-4 sm:p-5">Performance Dimension</th>
                  <th className="p-4 sm:p-5">Legacy Enterprise Systems</th>
                  <th className="p-4 sm:p-5 text-blue-500">OITS Modern Cloud Solutions</th>
                  <th className="p-4 sm:p-5 text-right">Optimization Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs sm:text-sm font-normal">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">API Response Latency</td>
                  <td className="p-4 sm:p-5 text-slate-400 dark:text-slate-500 font-mono">~350ms - 800ms</td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-mono font-bold">sub-30ms P99</td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                      11.6x Latency Reduction
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Deployment Frequency</td>
                  <td className="p-4 sm:p-5 text-slate-400 dark:text-slate-500 font-mono">Monthly / Quarterly</td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-mono font-bold">Daily Automated (CI/CD)</td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                      Continuous Integration
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Infrastructure Maintenance Overhead</td>
                  <td className="p-4 sm:p-5 text-slate-400 dark:text-slate-500 font-mono">Dedicated Server Management</td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-mono font-bold">Serverless & Auto-Scaling</td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                      60% Cost Reduction
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Regulatory Security Compliance</td>
                  <td className="p-4 sm:p-5 text-slate-400 dark:text-slate-500 font-mono">Manual Auditing / Static</td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-mono font-bold">Real-time Policy Scanning</td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                      SOC2 / ISO Ready
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Architecture Gaps Audit Widget */}
        <div id="architecture-gaps" className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-850">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                <AlertTriangle size={11} className="text-blue-400 animate-pulse" />
                <span>SELF-ASSESSMENT UTILITY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Evaluate Your Architecture Gaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Check all operational indicators below that apply to your current system architecture to compute a vulnerability index and engineering direction recommendation instantly.
              </p>

              {/* Assessment checklist */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMonolithBottlenecks}
                    onChange={(e) => setHasMonolithBottlenecks(e.target.checked)}
                    className="w-4 h-4 text-blue-500 border-slate-700 bg-slate-950 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-mono font-bold text-white">MONOLITHIC BOTTLENECKS</p>
                    <p className="text-[10px] text-slate-400 font-normal">Slow queries, single failure nodes, and server resource spiking.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSlowDeploys}
                    onChange={(e) => setHasSlowDeploys(e.target.checked)}
                    className="w-4 h-4 text-blue-500 border-slate-700 bg-slate-950 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-mono font-bold text-white">SLOW MANUAL DEPLOYMENTS</p>
                    <p className="text-[10px] text-slate-400 font-normal">Deploy processes exceed 1 hour, lack automated static test pipelines.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasComplianceGaps}
                    onChange={(e) => setHasComplianceGaps(e.target.checked)}
                    className="w-4 h-4 text-blue-500 border-slate-700 bg-slate-950 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-mono font-bold text-white">COMPLIANCE AND AUDIT GAPS</p>
                    <p className="text-[10px] text-slate-400 font-normal">No unified logs collection, lack secret rotation tokens, SOC2 ready gap.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Assessment results visualization panel */}
            <div className="p-7 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-6 justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">VULNERABILITY CALCULATION INDEX</span>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black font-mono tracking-tighter text-blue-400">
                    {riskScore}%
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold border ${recommendation.color}`}>
                    {recommendation.level}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-900">
                <p className="text-xs font-mono font-bold text-slate-300">SYSTEM RECOMMENDATION:</p>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {recommendation.action}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row gap-3">
                <CopyEmailButton className="flex-1" />
                <button
                  onClick={() => {
                    setHasMonolithBottlenecks(false);
                    setHasSlowDeploys(false);
                    setHasComplianceGaps(false);
                  }}
                  className="px-4 py-2 text-xs font-mono font-bold border border-slate-800 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 justify-center cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </SectionWrapper>

      {/* C. Process Section (4-Stage Agile Engineering Pipeline) */}
      <SectionWrapper id="process" className="bg-white dark:bg-[#070A13] border-t border-slate-200 dark:border-slate-900">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>ENGINEERING PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Structured Agile Delivery <span className="text-blue-500">Pipeline</span>.
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed font-normal">
            We bypass traditional design cycles to deploy features inside predictable sprints protected by strict velocity metrics and continuous SLA logs.
          </p>
        </div>

        {/* Process Stage Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {PROCESS_STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveProcessTab(stage.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col gap-2 ${
                activeProcessTab === stage.id
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-xl shadow-black/10'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold">{stage.stepNumber}</span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${
                  activeProcessTab === stage.id ? 'bg-blue-500/20 text-blue-400 dark:text-blue-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {stage.timeToMarket}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold truncate">{stage.title}</p>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Display Card */}
        {PROCESS_STAGES.map((stage) => {
          if (stage.id !== activeProcessTab) return null;
          return (
            <div
              key={stage.id}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0C1222] border border-slate-200 dark:border-slate-850 grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded">
                      STAGE {stage.stepNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ {stage.timeToMarket}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-bold uppercase">
                    {stage.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {stage.description}
                </p>

                {/* Checklist deliverables */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide">
                    STAGE KEY DELIVERABLES:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stage.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight font-normal">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar stats panel */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block">DELIVERY VELOCITY BAROMETER</span>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Target Velocity</span>
                      <span className="font-bold text-emerald-500">{stage.sprintVelocity}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${stage.sprintVelocity}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-850 font-mono text-xs">
                  {stage.metrics.map((met, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-400">{met.label}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{met.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-850">
                  <Link
                    to="/"
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-bold text-center block hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
                  >
                    RETURN TO HOME
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      </SectionWrapper>

      {/* D. Swiss-Modern Enterprise Footer */}
      <footer id="footer-root" className="bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 text-white font-extrabold tracking-tight text-xl">
                <span>OITS DHAKA</span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Structured Enterprise Systems. Zero technical debt architecture mapped to high-speed delivery velocity.
              </p>
              <div className="flex items-center gap-2 font-mono text-[9px] text-emerald-400 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ALL SYSTEMS OPERATIONAL (99.98% SLA)</span>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">
                Nav Channels
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home Dashboard</Link></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Capability Sets</a></li>
                <li><a href="#process" className="hover:text-blue-400 transition-colors">Agile Pipeline</a></li>
              </ul>
            </div>

            {/* Capabilities Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">
                Capability Sectors
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><span className="text-slate-500 block">Frontend Engineering</span></li>
                <li><span className="text-slate-500 block">Backend Distributed</span></li>
                <li><span className="text-slate-500 block">Kubernetes Scaling</span></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">
                Direct Consultation
              </h4>
              <p className="text-xs text-slate-400 font-normal">
                Directly connect to our engineering node terminal below.
              </p>
              <CopyEmailButton />
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <span>© 2026 {COMPANY_NAME}. All rights reserved.</span>
            <span>NODE: DAC-CORE-01 [VERIFIED]</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
