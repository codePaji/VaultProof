import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import Logo from './Logo';
import { Vote, BarChart3, Info, ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const location = useLocation();
  const { isConnected, isConnecting, address, connect, disconnect } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    const clean = addr.replace(/^0x/, '');
    return `${clean.slice(0, 6)}...${clean.slice(-4)}`;
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Vote', path: '/vote', icon: <Vote size={14} /> },
    { name: 'Results', path: '/results', icon: <BarChart3 size={14} /> },
    { name: 'Admin', path: '/admin', icon: <ShieldCheck size={14} /> },
    { name: 'About', path: '/about', icon: <Info size={14} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center w-full pointer-events-none">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 py-3 rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0d121f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]' 
            : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center">
          <Logo size={28} variant="full" />
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive(link.path) ? 'text-white' : 'text-secondary hover:text-white'
              }`}
            >
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {link.icon}
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent">Preprod</span>
          </div>

          <div className="relative group">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {isConnected && address ? (
              <button
                onClick={disconnect}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-mono transition-colors"
                title="Disconnect"
              >
                <CheckCircle2 size={14} className="text-emerald-400" />
                {formatAddress(address)}
              </button>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                <Wallet size={15} />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
