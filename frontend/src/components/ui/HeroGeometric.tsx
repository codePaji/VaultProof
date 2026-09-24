import React from 'react';
import { motion } from 'framer-motion';

export const HeroGeometric = ({
  headline,
  highlight,
  description,
  children
}: {
  headline: React.ReactNode;
  highlight?: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-main flex flex-col items-center justify-center min-h-[85vh] pt-24 pb-12">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-accent-glow rounded-full blur-[140px] opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[rgba(99,102,241,0.25)] rounded-full blur-[140px] opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-secondary tracking-widest uppercase">VaultProof Engine v1.0</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.05]">
            <span className="text-white drop-shadow-sm">{headline}</span>
            <br />
            {highlight && (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-cyan-400 to-indigo-500 pb-2 inline-block">
                {highlight}
              </span>
            )}
          </h1>

          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
