import React from 'react';
import { ShieldCheck, Zap, Users, Lightbulb, Target, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const reasons = [
  {
    icon: <Users className="w-6 h-6 text-[#38BDF8]" />,
    title: 'Client-Centric Approach',
    description: 'We prioritize your vision, working collaboratively to ensure the final product aligns perfectly with your business goals.'
  },
  {
    icon: <Zap className="w-6 h-6 text-[#10B981]" />,
    title: 'Agile Methodologies',
    description: 'Our iterative development process ensures rapid delivery, continuous feedback, and the flexibility to adapt to changing requirements.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />,
    title: 'Uncompromising Quality',
    description: 'Rigorous QA testing and automated CI/CD pipelines guarantee secure, high-performance, and bug-free software.'
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-[#10B981]" />,
    title: 'Innovation First',
    description: 'We leverage the latest frameworks and cloud architectures to future-proof your digital infrastructure.'
  },
  {
    icon: <Target className="w-6 h-6 text-[#38BDF8]" />,
    title: 'Domain Expertise',
    description: 'Deep technical knowledge across industries including FinTech, HealthTech, SaaS, and Enterprise Logistics.'
  },
  {
    icon: <Clock className="w-6 h-6 text-[#10B981]" />,
    title: 'Timely Delivery',
    description: 'Transparent roadmaps and strict project management ensure we hit our milestones on time, every time.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#070A13]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Why Choose OITS Dhaka?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We don't just write code; we build scalable digital solutions that drive real business growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-[#0C1222] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-[#38BDF8] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
