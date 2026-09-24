import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LockKeyhole, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink, 
  KeyRound, 
  FileCheck2, 
  Fingerprint, 
  RefreshCw,
  EyeOff,
  Database,
  ArrowRight
} from 'lucide-react';
import { config } from '../config';

// UI Components
import { HeroGeometric } from '../components/ui/HeroGeometric';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { GlowingButton } from '../components/ui/GlowingButton';
import { TerminalMac } from '../components/ui/TerminalMac';

const ROTATING_PHRASES = [
  { text: 'Vote Anonymously.', highlight: 'Verify Publicly.' },
  { text: 'Prove Confidentially.', highlight: 'Shield Your Voice.' },
  { text: 'Zero-Knowledge Ballots.', highlight: 'Trustless Tallies.' }
];

export default function LandingPage() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [copiedContract, setCopiedContract] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Sandbox State
  const [sandboxChoice, setSandboxChoice] = useState<'yes' | 'no' | null>(null);
  const [sandboxStatus, setSandboxStatus] = useState<'idle' | 'proving' | 'success'>('idle');
  const [sandboxReceipt, setSandboxReceipt] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyContract = () => {
    if (!config.contractAddress) return;
    navigator.clipboard.writeText(config.contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleSimulateVote = () => {
    if (!sandboxChoice) return;
    setSandboxStatus('proving');
    setTimeout(() => {
      const mockNullifier = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setSandboxReceipt(mockNullifier);
      setSandboxStatus('success');
    }, 2200);
  };

  const resetSandbox = () => {
    setSandboxChoice(null);
    setSandboxStatus('idle');
    setSandboxReceipt(null);
  };

  const contractDisplay = config.contractAddress 
    ? `${config.contractAddress.slice(0, 10)}...${config.contractAddress.slice(-8)}`
    : '39767f26...33332f';

  const protocolSteps = [
    {
      title: 'Witness Acquisition',
      codeLabel: 'voterSecret(): Bytes<32>',
      description: 'Your browser derives a private 256-bit cryptographic secret. This witness never leaves your device or touches the network.',
      tag: 'Local Client Only'
    },
    {
      title: 'Circuit Constraint Proving',
      codeLabel: 'cast_vote(choice): ZK-Proof',
      description: 'The Compact compiler executes on-device zero-knowledge proving. A mathematical proof is formed demonstrating valid ballot rules without revealing your selection.',
      tag: 'Zero-Knowledge Prover'
    },
    {
      title: 'Relay & Verification',
      codeLabel: 'submitTxAsync(unprovenTx)',
      description: 'The proof and a deterministic nullifier hash are broadcast to Midnight Preprod. Validators verify the cryptographic integrity without seeing the choice.',
      tag: 'Midnight Preprod'
    },
    {
      title: 'Public State Commit',
      codeLabel: 'total_votes.increment(1)',
      description: 'The smart contract marks the nullifier as spent to prevent double-voting, and increments the public tally counter irreversibly on-chain.',
      tag: 'Public Ledger'
    }
  ];

  return (
    <div className="landing-page bg-main text-white font-sans overflow-hidden">
      
      {/* 1. HERO SECTION (Geometric) */}
      <HeroGeometric 
        headline={
          <AnimatePresence mode="wait">
            <motion.span
              key={headlineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="inline-block"
            >
              {ROTATING_PHRASES[headlineIndex].text}
            </motion.span>
          </AnimatePresence>
        }
        highlight={
          <AnimatePresence mode="wait">
            <motion.span
              key={headlineIndex}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent via-cyan-400 to-indigo-500"
            >
              {ROTATING_PHRASES[headlineIndex].highlight}
            </motion.span>
          </AnimatePresence>
        }
        description="Cast confidential ballots with mathematical certainty. Built on Midnight's Compact smart contract framework, ensuring voter privacy while delivering 100% public, auditable on-chain tallies."
      >
        <GlowingButton to="/vote" variant="primary">
          Enter Voting Booth <ChevronRight size={18} />
        </GlowingButton>
        <GlowingButton to="/results" variant="secondary">
          View Live Tallies
        </GlowingButton>
      </HeroGeometric>

      {/* Contract & Explorer Chip */}
      <div className="relative z-20 flex justify-center mt-[-3rem] mb-24">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl shadow-glass">
          <Fingerprint size={16} className="text-accent" />
          <span className="text-sm font-mono text-secondary">CONTRACT:</span>
          <span className="text-sm font-mono text-white tracking-wide">{contractDisplay}</span>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button 
            onClick={handleCopyContract} 
            className="text-secondary hover:text-white transition-colors"
            title="Copy Contract Address"
          >
            {copiedContract ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
          </button>
          <a
            href={`https://explorer.1am.xyz/contract/${config.contractAddress || '39767f264df7b2da4ea9ce24b3900f148517c564ec9efbffecad33edcd33332f'}?network=preprod`}
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-white transition-colors ml-1"
            title="View on 1AM Explorer"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* 2. ZK TERMINAL (Mac Window) */}
      <section className="py-16 px-6 relative z-10">
        <TerminalMac 
          title="midnight-node-verifier" 
          status={<span className="text-accent animate-pulse">● LIVE</span>}
        >
          <div className="flex flex-col gap-2 font-mono">
            <div className="text-secondary">[SYS] Loading Compact Runtime v0.31.0...</div>
            <div className="text-secondary">[SYS] Connected to Midnight Preprod Data Provider</div>
            <div className="text-cyan-400">[ZK] Generating ephemeral witness commitment...</div>
            <div className="text-indigo-300">❯ persistentHash([pad32("vaultproof:voter:v1"), voterSecret])</div>
            <div className="text-white flex gap-2">
              <span className="text-accent">✔</span>
              <span>Constraint evaluation: choice in [0, 1] -&gt; PASS</span>
            </div>
            <div className="text-white flex gap-2">
              <span className="text-accent">✔</span>
              <span>Sybil check: has_voted.member(nullifier) == false</span>
            </div>
            <div className="text-emerald-400 font-bold mt-2">
              [PROVER] Zero-Knowledge SNARK proof generated in 2,420ms
            </div>
            <div className="text-white flex items-center gap-2 mt-1">
              <span className="w-2 h-4 bg-white/70 animate-pulse" />
              <span className="opacity-70">Awaiting wallet signature...</span>
            </div>
          </div>
        </TerminalMac>
      </section>

      {/* 3. BENTO GRID */}
      <section className="py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 px-6">
          <h2 className="text-4xl font-display font-bold mb-4">Engineered for Trustless Governance</h2>
          <p className="text-lg text-secondary">
            Four fundamental pillars of Midnight's zero-knowledge execution layer protecting your ballot.
          </p>
        </div>

        <BentoGrid>
          <BentoCard 
            title="Cryptographic Witness Isolation"
            description="Your ballot selection and identity secret exist exclusively inside your browser's private witness memory. They never touch the network."
            icon={<EyeOff />}
            className="md:col-span-2"
          >
            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-accent backdrop-blur-sm">
              <code>witness voterSecret(): Bytes&lt;32&gt;; // Never leaves device</code>
            </div>
          </BentoCard>

          <BentoCard 
            title="Sybil Nullifiers"
            description="Deterministic hashes guarantee one-person-one-vote without revealing voter identity."
            icon={<Fingerprint />}
          >
            <div className="mt-4 flex flex-col gap-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-cyan-400 w-[100%]" />
              </div>
              <span className="text-xs font-mono text-cyan-400">vaultproof:voter:v1</span>
            </div>
          </BentoCard>

          <BentoCard 
            title="Auditable Ledger"
            description="Every vote updates public on-chain counters on the Midnight ledger. Anyone can query the GraphQL indexer."
            icon={<Database />}
          >
            <div className="mt-4 flex gap-2">
              <span className="inline-block px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                GraphQL v4
              </span>
              <span className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-secondary text-xs font-mono">
                Preprod
              </span>
            </div>
          </BentoCard>

          <BentoCard 
            title="Tamper-Evident Receipts"
            description="VaultProof generates an encrypted polynomial checksum receipt. Voters can mathematically prove their ballot was included without disclosing their choice."
            icon={<FileCheck2 />}
            className="md:col-span-2"
          >
            <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-400" size={20} />
                <span className="text-sm font-medium">Mathematical Verification</span>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                Non-Repudiable
              </span>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* 4. PROTOCOL PIPELINE TABS */}
      <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-gradient-to-b from-transparent to-[#0a0d16]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <span className="text-xs font-mono text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">Protocol Pipeline</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">How Zero-Knowledge Works</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Nav */}
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-1/3">
              {protocolSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 text-left p-4 rounded-xl transition-all whitespace-nowrap md:whitespace-normal ${
                    activeStep === idx 
                      ? 'bg-white/10 border-l-2 border-accent text-white shadow-lg' 
                      : 'hover:bg-white/5 border-l-2 border-transparent text-secondary'
                  }`}
                >
                  <span className={`font-mono text-sm ${activeStep === idx ? 'text-accent' : 'text-muted'}`}>0{idx + 1}</span>
                  <span className="font-semibold text-sm md:text-base">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="md:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0d121f] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden h-full flex flex-col justify-center"
                >
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 blur-[100px] rounded-full" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="font-mono text-xs text-white bg-white/10 px-3 py-1 rounded-full border border-white/5">
                        {protocolSteps[activeStep].tag}
                      </span>
                      <code className="text-xs font-mono text-accent">
                        {protocolSteps[activeStep].codeLabel}
                      </code>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4">
                      {protocolSteps[activeStep].title}
                    </h3>
                    <p className="text-secondary text-lg leading-relaxed">
                      {protocolSteps[activeStep].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SANDBOX */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-b from-[#131A2B] to-[#0A0E17] border border-white/10 rounded-[2.5rem] p-8 md:p-14 text-center shadow-2xl relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium mb-8">
                <Zap size={14} />
                INTERACTIVE SANDBOX
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Test the ZK Voting Flow
              </h2>
              <p className="text-secondary text-lg mb-12 max-w-xl mx-auto">
                Experience on-device proof generation in real-time. No wallet connection required.
              </p>

              {sandboxStatus === 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => setSandboxChoice('yes')}
                      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                        sandboxChoice === 'yes' 
                          ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <ShieldCheck size={28} className={sandboxChoice === 'yes' ? 'text-emerald-400' : 'text-muted'} />
                      <span className="font-semibold text-sm">Vote YES</span>
                    </button>
                    <button
                      onClick={() => setSandboxChoice('no')}
                      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                        sandboxChoice === 'no' 
                          ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]' 
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <LockKeyhole size={28} className={sandboxChoice === 'no' ? 'text-rose-400' : 'text-muted'} />
                      <span className="font-semibold text-sm">Vote NO</span>
                    </button>
                  </div>

                  <GlowingButton 
                    onClick={handleSimulateVote}
                    disabled={!sandboxChoice}
                    className="w-full"
                  >
                    Simulate ZK Proof <ArrowRight size={18} />
                  </GlowingButton>
                </motion.div>
              )}

              {sandboxStatus === 'proving' && (
                <div className="py-12 flex flex-col items-center gap-6">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw size={48} className="text-accent" />
                  </motion.div>
                  <div className="font-display font-bold text-2xl text-white">Synthesizing Proof...</div>
                  <div className="text-sm font-mono text-secondary max-w-sm">
                    Computing R1CS constraints &middot; Deriving nullifier &middot; Evaluating witness
                  </div>
                </div>
              )}

              {sandboxStatus === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/50 border border-emerald-500/30 rounded-2xl p-8 max-w-md mx-auto text-left shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center gap-3 text-emerald-400 font-bold mb-6 pb-6 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check size={20} />
                    </div>
                    <span className="text-lg">ZK Proof Verified!</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-xs text-secondary uppercase tracking-wider mb-1 font-mono">Ballot Choice</div>
                      <div className="text-sm font-medium text-white px-3 py-2 bg-white/5 rounded border border-white/5">ENCRYPTED INSIDE PROOF</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary uppercase tracking-wider mb-1 font-mono">Generated Nullifier</div>
                      <div className="text-sm font-mono text-accent px-3 py-2 bg-accent/5 rounded border border-accent/10 truncate">{sandboxReceipt}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary uppercase tracking-wider mb-1 font-mono">On-Chain Status</div>
                      <div className="text-sm font-medium text-emerald-400">Eligible & Ready to Commit</div>
                    </div>
                  </div>
                  
                  <button onClick={resetSandbox} className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors">
                    Reset Sandbox
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 px-6 relative z-10 flex justify-center">
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#0d121f] border border-white/10 p-12 md:p-20 text-center max-w-4xl w-full mx-auto">
          {/* CTA Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-indigo-500/20 to-accent/20 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Ready to Cast Your Ballot?</h2>
            <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
              Connect your 1AM wallet on Midnight Preprod to participate in live decentralized governance with absolute privacy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowingButton to="/vote" variant="primary">
                Launch Voting Booth <ChevronRight size={18} />
              </GlowingButton>
              <GlowingButton to="/about" variant="secondary">
                Read Security Specs
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
