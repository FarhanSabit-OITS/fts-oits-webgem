import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-black tracking-tight transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.96] overflow-hidden relative";
  
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800 hover:scale-[1.08] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)]",
    secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200 hover:scale-[1.05] dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline: "border-2 border-slate-300 bg-white/50 backdrop-blur-sm text-slate-950 hover:bg-slate-950 hover:text-white hover:border-slate-950 hover:scale-[1.08] dark:border-slate-700 dark:text-white dark:bg-transparent dark:hover:bg-white dark:hover:text-slate-950 dark:hover:border-white shadow-sm hover:shadow-xl",
    ghost: "hover:bg-slate-100 text-slate-800 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 hover:scale-[1.05]",
  };

  const sizes = {
    sm: "h-11 px-6 text-sm",
    md: "h-14 px-10 text-base",
    lg: "h-20 px-14 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};