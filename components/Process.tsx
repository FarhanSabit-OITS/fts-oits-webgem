import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2, 
  Calendar, 
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Activity
} from 'lucide-react';
import { SectionId } from '../types';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const deliveryPhases = [
    {
      phase: '01',
      title: 'Discovery & Strategic Roadmap',
      turnaround: 'Weeks 1 – 2',
      description: 'Deep architectural discovery, domain boundary mapping, user journeys, and infrastructure scoping.',
      deliverables: [
        'Domain Architecture Blueprint',
        'Security Threat Model & RBAC Spec',
        'Database Schema & ERD Documentation',
        'Sprint Velocity & Milestones Plan'
      ],
      qualityGate: 'Architecture Signoff & Threat Review'
    },
    {
      phase: '02',
      title: 'Architecture & Security Hardening',
      turnaround: 'Weeks 2 – 4',
      description: 'Infrastructure as Code (Terraform), foundational API gateways, CI/CD pipeline automation, and design system creation.',
      deliverables: [
        'Terraform Cloud Ingress & VPCs',
        'Multi-Tier Auth & Token Lifecycle',
        'Reusable Component System (Figma to React)',
        'Automated Mock Servers & Contract Tests'
      ],
      qualityGate: 'Zero-Trust Perimeter Validation'
    },
    {
      phase: '03',
      title: 'Agile Sprint Delivery & QA',
      turnaround: 'Weeks 4 – 10',
      description: 'Two-week agile sprints with bi-weekly client demos, automated unit/integration suites, and continuous code audits.',
      deliverables: [
        'Sprint Feature Implementations',
        'E2E Playwright/Detox Test Suites',
        'Automated SonarQube Code Scans',
        'Bi-Weekly Staging Environment Demos'
      ],
      qualityGate: '95%+ Unit Test Coverage & Zero SAST Warnings'
    },
    {
      phase: '04',
      title: 'Production Launch & 24/7 SLA',
      turnaround: 'Week 10+',
      description: 'Canary rollout, blue/green production deployment, live telemetry monitoring, and guaranteed 99.9% uptime SLA.',
      deliverables: [
        'Zero-Downtime Blue/Green Release',
        'Grafana/Datadog Telemetry Dashboards',
        '24/7 SecOps Monitoring & PagerDuty',
        'Comprehensive Operational Runbooks'
      ],
      qualityGate: 'SOC2 & ISO Penetration Audit Approval'
    }
  ];

  return (
    <section 
      id={SectionId.PROCESS} 
      className="py-28 bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
            <span>LIFECYCLE & DELIVERY METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            4-Phase <span className="text-[#38BDF8]">Precision Delivery</span>.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Every product engineered by OITS Dhaka moves through strict quality gates to guarantee security, performance, and predictability.
          </p>
        </div>

        {/* 4 Connected Milestone Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {deliveryPhases.map((step, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-7 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                activeStep === idx
                  ? 'bg-white dark:bg-[#0C1222] border-[#38BDF8] shadow-xl shadow-sky-500/10 -translate-y-2'
                  : 'bg-white/60 dark:bg-[#0A0F1D]/80 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Node Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-extrabold text-[#38BDF8]">
                    {step.phase}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <Clock size={12} />
                    {step.turnaround}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Core Deliverables</p>
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={13} className="text-[#10B981] shrink-0 mt-0.5" />
                      <span className="leading-tight">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Gate Badge */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#F59E0B] bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span className="truncate">{step.qualityGate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Gates Assurance Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#10B981]/20 text-[#10B981]">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold">Automated CI/CD Quality Gates</h4>
              <p className="text-xs font-mono text-slate-400 mt-0.5">Penetration Tested • SonarQube Audited • 99.9% Uptime Verified</p>
            </div>
          </div>

          <button
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-[#38BDF8] hover:bg-[#10B981] text-[#070A13] font-bold text-xs font-mono uppercase tracking-wider border border-amber-950/20 hover:border-emerald-400/80 transition-all whitespace-nowrap shadow-md hover:shadow-emerald-500/20 active:scale-98"
          >
            Start Discovery Sprint
          </button>
        </div>

      </div>
    </section>
  );
};
