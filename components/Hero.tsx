
import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { COMPANY_NAME, TAGLINE } from '../constants';

// Hero component providing the landing page header section with high-performance animations
export const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Terminal size={16} />
            <span>Dhaka's Premier Engineering Studio</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-white leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {TAGLINE.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {TAGLINE.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            We build high-performance software for startups and global enterprises. From concept to scale, we are your engineering partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button variant="primary" size="lg" onClick={scrollToContact} className="group">
              Start Your Project <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices}>
              Our Capabilities
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-1000 delay-500">
             <div>
                <p className="text-3xl font-black text-slate-950 dark:text-white">150+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Shipped</p>
             </div>
             <div>
                <p className="text-3xl font-black text-slate-950 dark:text-white">50+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Experts</p>
             </div>
             <div>
                <p className="text-3xl font-black text-slate-950 dark:text-white">98%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Retention</p>
             </div>
             <div>
                <p className="text-3xl font-black text-slate-950 dark:text-white">24/7</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Support</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
