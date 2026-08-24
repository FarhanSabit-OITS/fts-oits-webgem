import React from 'react';
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface SocialLinksProps {
  variant?: 'floating' | 'footer' | 'inline';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'inline' }) => {
  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/oitsdhaka',
      icon: Linkedin,
      label: 'Corporate & Careers'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/oitsdhaka',
      icon: Twitter,
      label: 'Technical Updates'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/oitsdhaka',
      icon: Github,
      label: 'Open Source'
    }
  ];

  if (variant === 'floating') {
    return (
      <aside 
        aria-label="Floating social media links"
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 p-2 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full shadow-2xl"
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <MagneticButton key={social.name} strength={0.4}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow OITS Dhaka on ${social.name} (${social.label})`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-all group relative"
              >
                <Icon size={18} />
                <span className="absolute bottom-full mb-2 hidden group-hover:block group-focus-visible:block bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md whitespace-nowrap border border-slate-800 shadow-xl pointer-events-none">
                  {social.name}
                </span>
              </a>
            </MagneticButton>
          );
        })}
      </aside>
    );
  }

  return (
    <nav aria-label="Social media channels" className="flex flex-wrap items-center gap-4">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <MagneticButton key={social.name} strength={0.25}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit OITS Dhaka ${social.name} profile - ${social.label}`}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-transform">
                <Icon size={16} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1">
                  {social.name}
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {social.label}
                </div>
              </div>
            </a>
          </MagneticButton>
        );
      })}
    </nav>
  );
};

