import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, var(--spotlight-color, rgba(37, 99, 235, 0.07)) 0%, transparent 80%)`,
      }}
    >
      <style>{`
        :root {
          --spotlight-color: rgba(37, 99, 235, 0.04);
        }
        .dark {
          --spotlight-color: rgba(59, 130, 246, 0.08);
        }
      `}</style>
    </div>
  );
};
