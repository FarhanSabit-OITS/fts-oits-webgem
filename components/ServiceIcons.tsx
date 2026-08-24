import React from 'react';

interface ServiceIconProps {
  className?: string;
  size?: number;
}

// 1. Web Development SVG Icon
export const WebDevIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="3" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="5" cy="5.5" r="1" fill="currentColor"/>
    <circle cx="8" cy="5.5" r="1" fill="currentColor"/>
    <circle cx="11" cy="5.5" r="1" fill="currentColor"/>
    <path d="M7 12L10 15L7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 2. Mobile Apps SVG Icon
export const MobileAppsIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="18" r="1" fill="currentColor"/>
    <path d="M8 9H16M8 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// 3. Dedicated Teams SVG Icon
export const DedicatedTeamsIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 21V19C16 16.7909 14.2091 15 12 15C9.79086 15 8 16.7909 8 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 21V19C21.9986 17.1771 20.765 15.5857 19 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3.13C17.7699 3.58316 19.0078 5.18068 19.0078 7.01C19.0078 8.83932 17.7699 10.4368 16 10.89" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 4. Cloud Infrastructure SVG Icon
export const CloudSolutionsIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 10C18 6.68629 15.3137 4 12 4C9.3398 4 7.0945 5.73351 6.3023 8.15178C3.8637 8.52093 2 10.6385 2 13.2C2 16.0719 4.3281 18.4 7.2 18.4H17.5C19.9853 18.4 22 16.3853 22 13.9C22 11.5833 20.2483 9.6749 18 9.4239" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11V16M12 11L10 13M12 11L14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 5. Tech Frontiers SVG Icon
export const TechFrontiersIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2V5M15 2V5M9 19V22M15 19V22M2 9H5M2 15H5M19 9H22M19 15H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 6. Cross Platform SVG Icon
export const CrossPlatformIcon: React.FC<ServiceIconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="11" y="9" width="11" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 16H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16.5" cy="18" r="0.8" fill="currentColor"/>
  </svg>
);

export const getServiceSVG = (serviceId: string, size = 20, className = '') => {
  switch (serviceId) {
    case 'web-dev':
      return <WebDevIcon size={size} className={className} />;
    case 'mobile-dev':
      return <MobileAppsIcon size={size} className={className} />;
    case 'dedicated-teams':
      return <DedicatedTeamsIcon size={size} className={className} />;
    case 'cloud':
      return <CloudSolutionsIcon size={size} className={className} />;
    case 'tech-frontiers':
      return <TechFrontiersIcon size={size} className={className} />;
    case 'cross-platform':
      return <CrossPlatformIcon size={size} className={className} />;
    default:
      return <WebDevIcon size={size} className={className} />;
  }
};
