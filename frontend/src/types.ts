export interface Transaction {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  input: string;
  blockNumber: string;
  detectedType: 'Transfer' | 'Token Transfer' | 'Contract Call' | 'Contract Creation';
  isError: string;
  chainId: number; // ADDED
  isManual?: boolean;
}

export interface Tag {
  txHash: string;
  chainId: number; // ADDED
  category: string;
  note: string;
  timestamp: number;
  exists: boolean;
}

export type RowStatus = 'idle' | 'signing' | 'pending' | 'confirmed' | 'failed';

export interface RowState {
  category: string;
  note: string;
  status: RowStatus;
  error?: string;
  startTime?: number; // Time when transaction went pending (for stuck alerts)
}
