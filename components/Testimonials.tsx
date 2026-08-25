import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  Smartphone, 
  Cloud, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Verified Client Testimonials with Ratings
  const verifiedTestimonials = [
    {
      id: '1',
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Apex FinTech Global',
      rating: 5,
      content: 'OITS Dhaka re-engineered our core transactions ledger. They reduced database latency by 85% while seamlessly handling over 14 million daily financial events without a single dropped packet.',
      verified: true
    },
    {
      id: '2',
      name: 'Elena Rostova',
      role: 'Head of Engineering',
      company: 'OmniCloud SaaS',
      rating: 5,
      content: 'Their Swiss-modern UI precision combined with strict zero-trust Kubernetes architecture enabled us to pass SOC2 Type II certification in record time. Phenomenal engineering team.',
      verified: true
    },
    {
      id: '3',
      name: 'David Steinberg',
      role: 'VP of Digital Innovation',
      company: 'HealthLink Enterprise',
      rating: 5,
      content: 'Finding engineers who can translate complex healthcare security mandates into 60FPS mobile apps is rare. OITS Dhaka delivered on time, under budget, and with flawless test coverage.',
      verified: true
    }
  ];

  const techEcosystem = [
    { name: 'React 19', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Next.js 15', category: 'Framework' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Go / Golang', category: 'Backend' },
    { name: 'Python / PyTorch', category: 'AI/ML' },
    { name: 'Google Cloud Run', category: 'Cloud' },
    { name: 'AWS Kubernetes', category: 'DevOps' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis Cache', category: 'In-Memory' },
    { name: 'Docker', category: 'Containers' }
  ];

  const enterpriseClients = [
    'APEX GLOBAL',
    'NORDIC HEALTH',
    'TERRAFORM CLOUD',
    'VELOCITY PAY',
    'QUANTUM SYSTEMS',
    'ORBITAL COMMERCE'
  ];

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % verifiedTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, verifiedTestimonials.length]);

  return (
    <section 
      className="py-28 bg-white dark:bg-[#070A13] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>SOCIAL PROOF & VERIFIED FEEDBACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Trusted by leaders worldwide.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Direct endorsements from technology executives and product directors whose systems run on OITS Dhaka architecture.
          </p>
        </div>

        {/* Testimonials Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto mb-24"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                ))}
                <span className="ml-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                  5.0 Verified Review
                </span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + verifiedTestimonials.length) % verifiedTestimonials.length)}
                  className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#38BDF8] text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % verifiedTestimonials.length)}
                  className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#38BDF8] text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Testimonial Quote & Profile with Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-8">
                  "{verifiedTestimonials[activeIndex].content}"
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#10B981] flex items-center justify-center text-slate-950 font-bold font-mono text-base shrink-0 shadow-md">
                    {verifiedTestimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-950 dark:text-white text-base">
                        {verifiedTestimonials[activeIndex].name}
                      </h4>
                      <CheckCircle2 size={16} className="text-[#10B981]" />
                    </div>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {verifiedTestimonials[activeIndex].role} • {verifiedTestimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tech Ecosystem Infinite Marquee */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Verified Production Technology Stack
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-4 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
              {[...techEcosystem, ...techEcosystem].map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({item.category})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monochrome Client Logos Grid */}
        <div>
          <p className="text-center text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-8">
            Deployments Across Global Enterprise Sectors
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {enterpriseClients.map((client, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 text-center flex items-center justify-center opacity-60 hover:opacity-100 hover:border-[#38BDF8]/40 transition-all cursor-default"
              >
                <span className="text-xs font-mono font-extrabold tracking-wider text-slate-700 dark:text-slate-300">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
