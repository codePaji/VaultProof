import React from 'react';
import { motion } from 'framer-motion';

export const TerminalMac = ({ title, children, status }: { title: string; children: React.ReactNode; status?: React.ReactNode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#090b11] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d111a]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="text-xs font-mono text-secondary font-medium tracking-wide">
          {title}
        </div>
        <div className="w-16 flex justify-end">
          {status && <div className="text-xs font-mono">{status}</div>}
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
      
      {/* Glow reflection at top edge */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
};
