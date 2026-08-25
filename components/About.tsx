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
  ArrowRight,
  Linkedin,
  Github,
  Twitter,
  ChevronDown,
  Mail,
  Check,
  Star,
  Globe,
  Heart,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SectionId } from '../types';
import { SectionWrapper } from './SectionWrapper';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Newsletter capture state
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const teamMembers = [
    {
      name: 'Tanvir Ahmed',
      role: 'Chief Technology Officer & Lead Architect',
      bio: 'Ex-Google Cloud architect with 12+ years expertise scaling distributed microservices and ACID-compliant transactional datastores.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Nusrat Jahan',
      role: 'VP of Engineering & Systems Safety',
      bio: 'Pioneer in zero-trust cybersecurity protocols, leading OWASP ASVS compliance audits across international enterprise applications.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Rahim Chowdhury',
      role: 'Head of Cloud Infrastructure & DevOps',
      bio: 'Kubernetes contributor overseeing high-velocity CI/CD automation pipelines for multi-region edge node networks.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      name: 'Ayesha Siddiqua',
      role: 'Principal AI & Intelligent Systems Engineer',
      bio: 'Specialist in Gemini LLM fine-tuning, retrieval-augmented generation (RAG) pipelines, and edge AI inferencing.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', github: '#', twitter: '#' }
    }
  ];

  const skillMeters = [
    { domain: 'Frontend Architecture (React/Next.js)', level: 98, tech: 'React 18+, TypeScript, Micro-frontends' },
    { domain: 'Backend & Distributed Services (Node/Go/Spanner)', level: 96, tech: 'Spanner, Express, Kafka, PostgreSQL' },
    { domain: 'Cloud & Infrastructure (Kubernetes/Terraform)', level: 95, tech: 'Docker, GCP, AWS, CI/CD, Vault' },
    { domain: 'AI Integration & Vector Systems (Gemini/RAG)', level: 92, tech: 'Gemini GenAI, Python, LangChain' }
  ];

  const cultureValues = [
    { title: 'Remote-First Culture', desc: 'Asynchronous communication, deep work focus hours, and global talent alignment.', icon: <Globe className="w-5 h-5 text-blue-500" /> },
    { title: 'Continuous Upskilling & Learning', desc: 'Dedicated engineering stipends for research papers, certifications, and open-source contributions.', icon: <BookOpen className="w-5 h-5 text-emerald-500" /> },
    { title: 'Product & Technical Ownership', desc: 'Direct client collaboration with end-to-end accountability for code quality and SLAs.', icon: <Award className="w-5 h-5 text-amber-500" /> },
    { title: 'Sustainable Work-Life Balance', desc: 'Preventing burnout through structured sprints, realistic deadlines, and wellness focus.', icon: <Heart className="w-5 h-5 text-rose-500" /> }
  ];

  const testimonials = [
    {
      quote: 'OITS Dhaka refactored our core payment engine into microservices, cutting deployment latency by 90% while sustaining zero downtime across Black Friday traffic spikes.',
      rating: 5,
      author: 'Marcus Vance',
      title: 'VP of Engineering, SecurePay Frankfurt',
      logo: 'SECURE • PAY'
    },
    {
      quote: 'Their deep mastery of Google Cloud, Spanner, and Next.js allowed us to launch our European logistics portal 3 weeks ahead of schedule.',
      rating: 5,
      author: 'Elena Rostova',
      title: 'Chief Product Officer, Apex Capital London',
      logo: 'APEX // CAPITAL'
    }
  ];

  const faqs = [
    {
      q: 'What is OITS Dhaka’s primary technology stack?',
      a: 'We specialize in enterprise React, Next.js, and TypeScript on the frontend, paired with Node.js, Go, and PostgreSQL/Spanner microservices on the backend, fully automated via Docker and Kubernetes on GCP/AWS.'
    },
    {
      q: 'How do you guarantee project delivery timelines and code quality?',
      a: 'Every project operates on bi-weekly Agile sprints backed by automated CI/CD quality gates, 90%+ unit test coverage requirements, SonarQube static analysis, and guaranteed 99.98% SLA commitments.'
    },
    {
      q: 'Can OITS Dhaka integrate with our existing engineering team?',
      a: 'Yes. We offer staff augmentation, dedicated pod integration, and full end-to-end project execution depending on your organizational requirements.'
    },
    {
      q: 'What is your security and compliance framework?',
      a: 'We adhere strictly to OWASP ASVS standards, zero-trust secrets management with HashiCorp Vault, ISO 27001 guidelines, and automated SAST/DAST vulnerability scans.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setEmail('');
    }, 1000);
  };

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionWrapper id={SectionId.ABOUT} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* 1. Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/40 text-[10px] font-mono font-bold tracking-widest text-blue-700 dark:text-blue-400 mb-6 uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>WHO WE ARE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[1.05] text-slate-950 dark:text-white mb-6">
          Engineers. Innovators. Partners.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          OITS Dhaka is an elite software engineering collective crafting resilient digital cores for global enterprises. We unite rigorous computer science with Swiss-Modern aesthetic precision.
        </p>
      </div>

      {/* 2. Company Highlights & Animated Metrics Counter */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20 shadow-sm">
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-mono font-black text-blue-500">120+</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Projects Completed</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-mono font-black text-emerald-500">50+</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Happy Clients</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-mono font-black text-amber-500">8+</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Years Experience</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-mono font-black text-blue-400">99.9%</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Uptime SLA Guarantee</p>
        </div>
      </div>

      {/* 3. Mission & Core Values */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            OUR PURPOSE & DNA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            Building software that outlasts market volatility.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Founded in Dhaka, Bangladesh, OITS Dhaka was established with a singular objective: to deliver world-class digital systems without technical debt or architectural compromise.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <Zap className="w-6 h-6 text-blue-500" />
            <h4 className="font-bold text-sm uppercase">Innovation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Adopting bleeding-edge frameworks while maintaining enterprise-grade stability.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-sm uppercase">Integrity</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Transparent communication, clear code documentation, and zero hidden costs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <Globe className="w-6 h-6 text-amber-500" />
            <h4 className="font-bold text-sm uppercase">Transparency</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Live CI/CD dashboards and daily telemetry reports for every stakeholder.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <Award className="w-6 h-6 text-rose-500" />
            <h4 className="font-bold text-sm uppercase">Quality</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Strict adherence to OWASP ASVS and 90%+ unit test coverage constraints.</p>
          </div>
        </div>
      </div>

      {/* 4. Meet the Team Showcase */}
      <div className="mb-24">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            ENGINEERING LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-3">
            Meet Our Senior Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div 
              key={i}
              onClick={() => setSelectedTeamMember(member)}
              className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all cursor-pointer hover:-translate-y-1 shadow-sm"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-4">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{member.name}</h3>
              <p className="text-[11px] font-mono text-blue-500 font-bold mt-0.5 mb-2">{member.role}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Technical Expertise & Progress Indicators */}
      <div className="mb-24 p-8 md:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30">
            DOMAINS & PROFICIENCY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3">
            Technical Expertise & Progress Indicators
          </h2>
        </div>

        <div className="space-y-6">
          {skillMeters.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-950 dark:text-white uppercase">{skill.domain}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{skill.level}% MASTERY</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${skill.level}%` }} />
              </div>
              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{skill.tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Culture Code Grid */}
      <div className="mb-24">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            ENGINEERING CULTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-3">
            Our Culture Code
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureValues.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-fit">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm uppercase">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Client Testimonials & Social Proof */}
      <div className="mb-24 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
        <div className="max-w-2xl mb-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3">
            What Enterprise Leaders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(test.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{test.quote}"
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs">{test.author}</h4>
                  <p className="text-[10px] font-mono text-slate-400">{test.title}</p>
                </div>
                <span className="font-mono text-[10px] font-bold text-blue-500">{test.logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. FAQ Accordion Section */}
      <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore insights into our engagement models, security standards, and technical delivery workflows.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Ask A Specific Question</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. Call-To-Action (CTA) & Newsletter Capture Banner */}
      <div className="p-8 md:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200/80 dark:border-slate-800 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Ready to Build Something Extraordinary?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
          Join 50+ enterprise partners leveraging OITS Dhaka for zero-debt software engineering and high-availability cloud infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/30"
          >
            Schedule Consultation
          </button>
        </div>

        {/* Newsletter Signup Form */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto">
          <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-3">
            SUBSCRIBE TO OUR SYSTEM ARCHITECTURE INSIGHTS
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-xs text-slate-950 dark:text-white focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit" 
              disabled={newsletterStatus === 'loading'}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-all"
            >
              {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>

          {newsletterStatus === 'success' && (
            <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-2 flex items-center justify-center gap-1">
              <Check size={12} /> Successfully subscribed to engineering updates!
            </p>
          )}

          {newsletterStatus === 'error' && (
            <p className="text-[11px] font-mono text-rose-500 dark:text-rose-400 mt-2">
              Please provide a valid work email address.
            </p>
          )}
        </div>

      </div>

    </SectionWrapper>
  );
};

