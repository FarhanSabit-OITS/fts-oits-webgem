"use client";

import React from 'react';
import { motion } from 'motion/react';
import { TECH_DOMAINS, COMPANY_NAME } from '@/constants';

export default function TechStackPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mb-6">
          Technology <span className="text-blue-600 dark:text-blue-500">Stack</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
          Our engineering matrices are built on industrial-grade, highly scalable technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TECH_DOMAINS.map((domain, index) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              {domain.label}
            </h3>
            <ul className="space-y-4">
              {domain.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}