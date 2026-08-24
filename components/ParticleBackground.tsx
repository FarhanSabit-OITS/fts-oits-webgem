import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const ParticleBackground: React.FC = () => {
  // Generate a fixed set of deterministic particles for visual stability
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: (i * 13.7 + 7) % 100,
      y: (i * 23.3 + 11) % 100,
      size: (i % 3) * 2 + 3,
      duration: 12 + (i % 5) * 4,
      delay: (i % 4) * 1.5,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Ambient gradient glow spheres */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500/40 dark:bg-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ['0%', '-30%', '10%', '0%'],
            x: ['0%', '15%', '-15%', '0%'],
            opacity: [p.opacity, p.opacity * 2, p.opacity * 0.5, p.opacity],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
