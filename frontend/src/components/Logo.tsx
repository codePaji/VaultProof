import React from 'react';

interface LogoProps {
  size?: number;
  variant?: 'full' | 'icon';
  className?: string;
  glow?: boolean;
}

export default function Logo({
  size = 36,
  variant = 'full',
  className = '',
  glow = true,
}: LogoProps) {
  const iconSize = size;
  const heightRatio = variant === 'full' ? size : size;

  return (
    <div
      className={`logo-container inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height: heightRatio }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`logo-emblem ${glow ? 'logo-glow' : ''}`}
      >
        <defs>
          <linearGradient id="vp-shield" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F5D4" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          <linearGradient id="vp-core" x1="16" y1="14" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#00F5D4" />
          </linearGradient>

          <linearGradient id="vp-facet" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
          </linearGradient>

          <filter id="vp-filter-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Vault Shield Hexagon */}
        <path
          d="M24 4L42 12V25C42 34.5 34.5 42.2 24 45C13.5 42.2 6 34.5 6 25V12L24 4Z"
          fill="url(#vp-facet)"
          stroke="url(#vp-shield)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Facet Geometries for Institutional Depth */}
        <path
          d="M24 4V25M24 45V25M42 25H6"
          stroke="url(#vp-shield)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* Inner ZK Proof Eye / Iris */}
        <circle
          cx="24"
          cy="25"
          r="8"
          fill="#07090E"
          stroke="url(#vp-shield)"
          strokeWidth="2"
        />

        {/* Central Cryptographic Keyhole Core */}
        <circle
          cx="24"
          cy="23"
          r="2.5"
          fill="url(#vp-core)"
        />
        <path
          d="M22.5 24.5L21.5 30H26.5L25.5 24.5H22.5Z"
          fill="url(#vp-core)"
        />

        {/* Orbiting Verification Nodes */}
        <circle cx="24" cy="10" r="1.5" fill="#00F5D4" />
        <circle cx="36" cy="20" r="1.5" fill="#3B82F6" />
        <circle cx="12" cy="20" r="1.5" fill="#6366F1" />
      </svg>

      {variant === 'full' && (
        <div className="flex items-center tracking-tight leading-none font-bold">
          <span className="text-white text-xl font-outfit tracking-wide">
            Vault
          </span>
          <span className="text-accent text-xl font-outfit tracking-wide ml-0.5">
            Proof
          </span>
          <span className="ml-2 text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/25 uppercase font-medium">
            ZK
          </span>
        </div>
      )}
    </div>
  );
}
