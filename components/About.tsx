import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Users, 
  Award, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Server, 
  Layout, 
  ArrowRight 
} from 'lucide-react';
import { SectionId } from '../types';
import { SectionWrapper } from './SectionWrapper';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const pillars = [
    {
      icon: <Server className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Elastic Scalability',
      description: 'Distributed microservices and serverless infrastructure engineered to withstand 100x traffic spikes without performance degradation.',
      badge: 'Zero Bottlenecks'
    },
    {
      icon: <Lock className="w-6 h-6 text-[#10B981]" />,
      title: 'Zero-Trust Security',
      description: 'Defense-in-depth security architecture with granular IAM policies, automated penetration testing, and continuous vulnerability scans.',
      badge: 'OWASP Verified'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
      title: 'High-Throughput Cloud',
      description: 'Ultra-low latency database indexing, distributed caching, and global edge compute acceleration for instantaneous response times.',
      badge: '<50ms Latency'
    },
    {
      icon: <Layout className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Human-Centric UI/UX',
      description: 'Swiss-modern design systems built with pixel-perfect accessible typography, keyboard navigation, and seamless 60FPS micro-interactions.',
      badge: 'WCAG AAA Ready'
    }
  ];

  const trustMilestones = [
    { label: 'Founded in Dhaka', value: '2016' },
    { label: 'Enterprise Systems', value: '150+' },
    { label: 'Global Client Markets', value: '12+' },
    { label: 'Codebase Test Coverage', value: '99.4%' }
  ];

  return (
    <SectionWrapper id={SectionId.ABOUT} className="bg-white dark:bg-[#070A13]">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
            <span>ABOUT & ARCHITECTURAL DNA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-950 dark:text-white mb-6">
            Engineering digital mastery with <span className="text-[#38BDF8]">uncompromising precision</span>.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            OITS Dhaka operates at the intersection of rigorous computer science and Swiss-modern digital craftsmanship. We discard cookie-cutter templates to build high-availability platforms tailored for long-term operational velocity.
          </p>
        </div>

        {/* Narrative & Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Team Collaboration Showcase Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl group">
              {!imgError ? (
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80&fm=webp" 
                  alt="OITS Dhaka software engineering team collaboration session" 
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-[#0A0F1D] text-center">
                  <Users className="w-16 h-16 text-[#38BDF8] mb-3" />
                  <p className="font-bold text-white">OITS Senior Engineering Core</p>
                  <p className="text-xs font-mono text-slate-400 mt-1">Dhaka, Bangladesh</p>
                </div>
              )}

              {/* Floating Experience Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#070A13]/90 backdrop-blur-xl border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="text-2xl font-extrabold font-mono text-[#10B981]">10+ Years</p>
                  <p className="text-xs font-mono text-slate-400">Industry Innovation & Engineering</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 text-[#38BDF8]">
                  <Award size={20} />
                </div>
              </div>
            </div>

            {/* ISO / Security Compliance Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                ✓ ISO 27001 Aligned
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-[#38BDF8] border border-[#38BDF8]/20">
                ✓ SOC2 Type II Certified
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-[#F59E0B] border border-amber-500/20">
                ✓ OWASP ASVS Verified
              </span>
            </div>
          </div>

          {/* 4-Quadrant Pillars Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800/90 hover:border-[#38BDF8]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Trust Milestones Strip */}
        <div className="p-8 rounded-3xl bg-slate-100 dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustMilestones.map((item, i) => (
            <div key={i} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-mono font-extrabold text-[#38BDF8] dark:text-[#38BDF8]">
                {item.value}
              </p>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
