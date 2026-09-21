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
  Terminal, 
  KeyRound, 
  FileCheck2, 
  Fingerprint, 
  Layers, 
  RefreshCw,
  EyeOff,
  Database,
  ArrowRight
} from 'lucide-react';
import { config } from '../config';

// Rotating headline phrases inspired by animated-text-rotate-hero
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

  // Rotating headline effect
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3800);
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
    }, 1800);
  };

  const resetSandbox = () => {
    setSandboxChoice(null);
    setSandboxStatus('idle');
    setSandboxReceipt(null);
  };

  const contractDisplay = config.contractAddress 
    ? `${config.contractAddress.slice(0, 10)}...${config.contractAddress.slice(-8)}`
    : '39767f26...33332f';

  // Stepper Content
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
    <div className="landing-page">
      {/* 1. HERO SECTION (Inspired by helix-vault-h55 & animated-text-rotate-hero) */}
      <section className="hero-container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Pill Badge */}
          <div className="hero-pill-badge">
            <span className="nav-status-dot" />
            <span>MIDNIGHT NETWORK · ZERO-KNOWLEDGE GOVERNANCE</span>
          </div>

          {/* Dynamic Rotating Headline */}
          <h1 className="hero-headline">
            <AnimatePresence mode="wait">
              <motion.div
                key={headlineIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <span>{ROTATING_PHRASES[headlineIndex].text}</span>
                <br />
                <span className="text-gradient">
                  {ROTATING_PHRASES[headlineIndex].highlight}
                </span>
              </motion.div>
            </AnimatePresence>
          </h1>

          <p className="hero-description">
            Cast confidential ballots with mathematical certainty. Built on Midnight's Compact smart contract framework, ensuring voter privacy while delivering 100% public, auditable on-chain tallies.
          </p>

          {/* Contract Address Chip with Copy & Explorer Links */}
          <div className="contract-chip">
            <Fingerprint size={14} className="text-accent" />
            <span>CONTRACT:</span>
            <span className="text-white font-medium">{contractDisplay}</span>
            <button 
              onClick={handleCopyContract} 
              className="text-muted hover:text-accent transition-colors"
              title="Copy Contract Address"
            >
              {copiedContract ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
            <a
              href={`https://explorer.1am.xyz/contract/${config.contractAddress || '39767f264df7b2da4ea9ce24b3900f148517c564ec9efbffecad33edcd33332f'}?network=preprod`}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-accent transition-colors"
              title="View on 1AM Explorer"
            >
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/vote" className="btn btn-primary btn-lg">
              Enter Voting Booth
              <ChevronRight size={18} />
            </Link>
            <Link to="/results" className="btn btn-secondary btn-lg">
              View Live Tallies
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. ZK TERMINAL & CONSOLE PREVIEW (Inspired by aegis-console-h39) */}
      <section className="zk-terminal-wrapper">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
          </div>
          <div className="terminal-title">
            Midnight Compact Prover Engine v0.31.0 · Circuit: cast_vote
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            PROVER ONLINE
          </div>
        </div>

        <div className="terminal-body">
          {/* Left Circuit State */}
          <div className="circuit-flow-panel">
            <div className="circuit-step-box active">
              <div className="flex items-center gap-2">
                <KeyRound size={16} className="text-accent" />
                <span className="font-semibold text-white">Private Witness Input</span>
              </div>
              <span className="text-xs font-mono text-accent">DISCLOSED: 0%</span>
            </div>

            <div className="circuit-step-box active">
              <div className="flex items-center gap-2">
                <Fingerprint size={16} className="text-cyan-400" />
                <span className="font-semibold text-white">Nullifier Derivation</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">ONE-WAY HASH</span>
            </div>

            <div className="circuit-step-box active">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="font-semibold text-white">R1CS Constraint Check</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">VERIFIED</span>
            </div>

            <div className="circuit-step-box active">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-indigo-400" />
                <span className="font-semibold text-white">On-Chain Ledger Commit</span>
              </div>
              <span className="text-xs font-mono text-indigo-400">PREPROD</span>
            </div>
          </div>

          {/* Right Live Proving Logs */}
          <div className="terminal-log-stream">
            <div className="log-line log-muted">[INIT] Loading WASM Compact Runtime...</div>
            <div className="log-line">[SYS] Connecting to Midnight Preprod Public Data Provider</div>
            <div className="log-line log-cyan">[ZK] Generating ephemeral witness commitment...</div>
            <div className="log-line">[HASH] persistentHash([pad32("vaultproof:voter:v1"), voterSecret])</div>
            <div className="log-line log-purple">[CIRCUIT] Constraint evaluation: choice in [0, 1] -&gt; PASS</div>
            <div className="log-line log-cyan">[NULLIFIER] Sybil check: has_voted.member(nullifier) == false</div>
            <div className="log-line log-cyan">[PROVER] Zero-Knowledge SNARK proof generated in 2,420ms</div>
            <div className="log-line text-emerald-400">[READY] Unproven transaction prepared for 1AM wallet submission_</div>
          </div>
        </div>
      </section>

      {/* 3. TELEMETRY HUD STRIP (Inspired by axis-quotient-h30 & finsyc) */}
      <section className="telemetry-strip">
        <div className="telemetry-cell">
          <div className="telemetry-val text-gradient">100%</div>
          <div className="telemetry-lbl">Voter Anonymity</div>
          <div className="text-xs text-muted">Witness stays on local device</div>
        </div>
        <div className="telemetry-cell">
          <div className="telemetry-val">~2.4s</div>
          <div className="telemetry-lbl">Client Proving Speed</div>
          <div className="text-xs text-muted">On-device ZK constraint synthesis</div>
        </div>
        <div className="telemetry-cell">
          <div className="telemetry-val text-emerald-400">Sybil-Proof</div>
          <div className="telemetry-lbl">Double-Vote Prevention</div>
          <div className="text-xs text-muted">Deterministic nullifiers on-chain</div>
        </div>
        <div className="telemetry-cell">
          <div className="telemetry-val text-cyan-400">Preprod</div>
          <div className="telemetry-lbl">Network Status</div>
          <div className="text-xs text-muted">1AM Wallet & Indexer v4 sync</div>
        </div>
      </section>

      {/* 4. ASYMMETRIC BENTO GRID (Inspired by lumen-design-system) */}
      <section className="mb-2xl">
        <div className="text-center max-w-xl mx-auto mb-xl">
          <h2 className="text-3xl font-bold mb-xs">Engineered for Trustless Governance</h2>
          <p className="text-secondary text-sm">
            Four fundamental pillars of Midnight's zero-knowledge execution layer protecting your ballot.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Witness Boundary (Span 2) */}
          <div className="bento-card bento-col-2">
            <div className="bento-icon-box">
              <EyeOff size={22} />
            </div>
            <h3 className="bento-title">Cryptographic Witness Isolation</h3>
            <p className="bento-desc">
              In traditional blockchain voting, every address and transaction payload is transparently visible to all observers. In VaultProof, your ballot selection and identity secret exist exclusively inside your browser's private witness memory.
            </p>
            <div className="p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-xs text-accent">
              <code>witness voterSecret(): Bytes&lt;32&gt;; // Never crosses network boundary</code>
            </div>
          </div>

          {/* Card 2: Sybil Nullifiers */}
          <div className="bento-card">
            <div className="bento-icon-box">
              <Fingerprint size={22} />
            </div>
            <h3 className="bento-title">Sybil Nullifiers</h3>
            <p className="bento-desc">
              One-way deterministic hashes guarantee one-person-one-vote without revealing which voter cast the ballot.
            </p>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block">
              Domain: vaultproof:voter:v1
            </span>
          </div>

          {/* Card 3: Verifiable Tallies */}
          <div className="bento-card">
            <div className="bento-icon-box">
              <ShieldCheck size={22} />
            </div>
            <h3 className="bento-title">Auditable Ledger Tallies</h3>
            <p className="bento-desc">
              Every vote updates public on-chain counters on the Midnight ledger. Anyone can query the GraphQL indexer to audit results in real time.
            </p>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded inline-block">
              Indexer GraphQL API v4
            </span>
          </div>

          {/* Card 4: Receipts (Span 2) */}
          <div className="bento-card bento-col-2">
            <div className="bento-icon-box">
              <FileCheck2 size={22} />
            </div>
            <h3 className="bento-title">Tamper-Evident Vote Receipts</h3>
            <p className="bento-desc">
              Upon successful ballot submission, VaultProof generates an encrypted, 32-bit polynomial checksum receipt. Voters can mathematically prove their ballot was included without ever disclosing whether they voted Yes or No.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded">
                Checksum Verification
              </span>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">
                Non-Repudiable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROTOCOL STEPPER (Inspired by industrial-skeuomorphism) */}
      <section className="protocol-stepper-box">
        <div className="mb-lg">
          <span className="text-xs font-mono text-accent uppercase tracking-wider">Protocol Pipeline</span>
          <h2 className="text-2xl font-bold mt-xs">How Zero-Knowledge Governance Works</h2>
        </div>

        {/* Stepper Navigation Tabs */}
        <div className="stepper-nav">
          {protocolSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`stepper-tab ${activeStep === idx ? 'active' : ''}`}
            >
              <span className="stepper-num">0{idx + 1}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Step View */}
        <div className="glass-card bg-black/40 border border-white/5 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-sm flex-wrap gap-2">
            <span className="font-mono text-xs text-accent bg-accent/10 px-2.5 py-1 rounded">
              {protocolSteps[activeStep].tag}
            </span>
            <code className="text-xs font-mono text-cyan-300 bg-white/5 px-2 py-0.5 rounded">
              {protocolSteps[activeStep].codeLabel}
            </code>
          </div>
          <h3 className="text-xl font-bold text-white mb-xs">
            {protocolSteps[activeStep].title}
          </h3>
          <p className="text-secondary text-sm leading-relaxed">
            {protocolSteps[activeStep].description}
          </p>
        </div>
      </section>

      {/* 6. LIVE INTERACTIVE VOTING SANDBOX (Inspired by finsyc & abstract-glassy-shader) */}
      <section className="sandbox-container">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-medium mb-sm">
            <Zap size={13} />
            INTERACTIVE PROTOCOL SANDBOX
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-xs">
            Test the Zero-Knowledge Voting Flow
          </h2>
          <p className="text-secondary text-sm mb-lg">
            Experience on-device proof generation in real-time. No wallet connection required for this sandbox preview.
          </p>

          {sandboxStatus === 'idle' && (
            <div>
              <div className="choice-grid">
                <button
                  onClick={() => setSandboxChoice('yes')}
                  className={`choice-card-btn ${sandboxChoice === 'yes' ? 'selected-yes' : ''}`}
                >
                  <ShieldCheck size={20} className={sandboxChoice === 'yes' ? 'text-emerald-400' : 'text-muted'} />
                  <span>Vote YES (Approve)</span>
                </button>
                <button
                  onClick={() => setSandboxChoice('no')}
                  className={`choice-card-btn ${sandboxChoice === 'no' ? 'selected-no' : ''}`}
                >
                  <LockKeyhole size={20} className={sandboxChoice === 'no' ? 'text-rose-400' : 'text-muted'} />
                  <span>Vote NO (Reject)</span>
                </button>
              </div>

              <button
                onClick={handleSimulateVote}
                disabled={!sandboxChoice}
                className="btn btn-primary btn-lg w-full max-w-sm mx-auto"
              >
                Simulate ZK Proof Generation
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {sandboxStatus === 'proving' && (
            <div className="p-8 text-center flex flex-col items-center gap-3">
              <RefreshCw size={36} className="text-accent animate-spin" />
              <div className="font-bold text-lg text-white">Synthesizing Zero-Knowledge Proof...</div>
              <div className="text-xs font-mono text-secondary max-w-md">
                Computing R1CS constraint matrix · Deriving deterministic nullifier · Evaluating witness boundaries
              </div>
            </div>
          )}

          {sandboxStatus === 'success' && (
            <div className="receipt-card max-w-md mx-auto text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-sm">
                <Check size={18} />
                <span>Zero-Knowledge Proof Verified!</span>
              </div>
              <div className="text-xs text-secondary mb-xs">
                Ballot Choice: <span className="text-white font-semibold">ENCRYPTED INSIDE PROOF (ZERO LEAKAGE)</span>
              </div>
              <div className="text-xs text-secondary mb-xs">
                Generated Nullifier: <code className="text-accent">{sandboxReceipt}</code>
              </div>
              <div className="text-xs text-secondary mb-md">
                On-Chain Status: <span className="text-emerald-400 font-medium">Eligible & Ready to Commit</span>
              </div>
              <button onClick={resetSandbox} className="btn btn-secondary btn-sm w-full">
                Reset Sandbox
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="glass-card text-center py-12 px-6 border-accent/30 bg-gradient-to-b from-[#0D121F] to-[#07090E] rounded-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-sm">Ready to Cast Your Ballot?</h2>
          <p className="text-secondary mb-lg">
            Connect your 1AM or Lace wallet on Midnight Preprod to participate in live decentralized governance with absolute cryptographic privacy.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/vote" className="btn btn-primary btn-lg">
              Launch Voting Booth
              <ChevronRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              Read Security Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
