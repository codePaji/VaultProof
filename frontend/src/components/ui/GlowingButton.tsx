import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface GlowingButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const GlowingButton = ({ children, to, onClick, className = '', variant = 'primary', disabled = false }: GlowingButtonProps) => {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";
  
  const Component = to ? Link : 'button';
  const props = to ? { to, className: `${baseClasses} ${className}` } : { onClick, disabled, className: `${baseClasses} ${className}` };

  if (variant === 'primary') {
    return (
      <Component {...props as any}>
        {/* Glow behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-indigo-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Button body */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:-200%_0,0_0] hover:duration-[1500ms]" />
        
        {/* Border */}
        <div className="absolute inset-0 rounded-full border border-white/20" />
        
        <span className="relative z-10 flex items-center gap-2 text-white font-semibold drop-shadow-md">
          {children}
        </span>
      </Component>
    );
  }

  return (
    <Component {...props as any}>
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
      <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-300" />
      <span className="relative z-10 flex items-center gap-2 text-white">
        {children}
      </span>
    </Component>
  );
};
