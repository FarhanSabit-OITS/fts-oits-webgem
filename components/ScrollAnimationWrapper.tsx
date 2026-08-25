import React from 'react';
import { motion } from 'motion/react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} // Premium Swiss-Modern easing curve
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
