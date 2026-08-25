import React from 'react';
import { motion } from 'motion/react';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  children,
  className = '',
  containerClassName = ''
}) => {
  return (
    <section
      id={id}
      className={`py-24 sm:py-28 bg-slate-50 dark:bg-[#070A13] transition-colors duration-300 relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 ${containerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
};
