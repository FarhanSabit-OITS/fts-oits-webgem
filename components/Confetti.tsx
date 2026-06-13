import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  delay: number;
  duration: number;
  spin: number;
}

export const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = [
      '#3b82f6', // blue
      '#ec4899', // pink
      '#eab308', // yellow-gold
      '#10b981', // green
      '#8b5cf6', // purple
      '#f97316', // orange
    ];

    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];

    // Generate 60 pieces
    const generated: Particle[] = Array.from({ length: 60 }).map((_, idx) => {
      return {
        id: idx,
        x: Math.random() * 100, // random start horizontal %
        y: -10 - Math.random() * 20, // start above screen
        size: Math.random() * 10 + 6, // 6px to 16px
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 1.5, // staggered fall delay
        duration: Math.random() * 2.5 + 2.5, // random fall duration (2.5s - 5.0s)
        spin: Math.random() * 360,
      };
    });

    setParticles(generated);

    // Auto cleanup after 7 seconds
    const timer = setTimeout(() => {
      setParticles([]);
    }, 7000);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-particle {
          animation: confettiFall var(--fall-duration) cubic-bezier(0.1, 0.8, 0.3, 1) var(--fall-delay) forwards;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {particles.map((p) => {
          const style: React.CSSProperties = {
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            opacity: 1,
            '--fall-duration': `${p.duration}s`,
            '--fall-delay': `${p.delay}s`,
          } as React.CSSProperties;

          let shapeElement: React.ReactNode = null;

          if (p.shape === 'circle') {
            style.borderRadius = '50%';
          } else if (p.shape === 'triangle') {
            style.width = '0px';
            style.height = '0px';
            style.borderLeft = `${p.size / 2}px solid transparent`;
            style.borderRight = `${p.size / 2}px solid transparent`;
            style.borderBottom = `${p.size}px solid ${p.color}`;
          }

          return (
            <div
              key={p.id}
              className="confetti-particle flex items-center justify-center transform-gpu"
              style={style}
            />
          );
        })}
      </div>
    </>
  );
};
