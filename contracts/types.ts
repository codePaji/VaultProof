/**
 * VaultProof Smart Contract & Governance Type Definitions
 * 
 * Formal TypeScript models for Compact contract ledger state, circuit interfaces,
 * proof witnesses, and cryptographic verification payloads.
 */

export type BallotChoice = 0 | 1 | 2; // 0: No, 1: Yes, 2: Abstain

export interface VotingLedgerState {
  readonly total_yes: bigint;
  readonly total_no: bigint;
  readonly total_abstain?: bigint;
  readonly total_votes: bigint;
  readonly is_open: boolean;
  readonly admin: string;
  readonly has_voted?: ReadonlyMap<string, boolean>;
  readonly quorum_target?: bigint;
}

export interface VoterWitnessData {
  readonly voterSecret: Uint8Array;
  readonly voterWeight?: number;
}

export interface AdminWitnessData {
  readonly adminSecret: Uint8Array;
}

export interface VoteReceipt {
  readonly receiptId: string;
  readonly contractAddress: string;
  readonly nullifierHash: string;
  readonly proposalIndex: number;
  readonly choice: boolean | BallotChoice;
  readonly timestamp: number;
  readonly status: 'submitted' | 'confirmed' | 'finalized';
  readonly signatureProof?: string;
}

export interface ProposalMetadata {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly contractAddress: string;
  readonly author: string;
  readonly createdAt: number;
  readonly endsAt: number;
  readonly quorumTarget: number;
}
