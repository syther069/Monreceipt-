import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAccount, useDisconnect, useReadContract, useWriteContract, usePublicClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther, formatEther, createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { tagRegistryAbi } from './abi';
import type { Transaction, Tag, RowState } from './types';

const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS || '0xCA79519f744dC0DAaCcAA88e85E8E85FfbE838C3') as `0x${string}`;

// Pre-defined categories
const CATEGORIES = [
  { value: '', label: 'Select Category...' },
  { value: 'investment', label: '📈 Investment' },
  { value: 'income', label: '💰 Income' },
  { value: 'business_expense', label: '💼 Business Expense' },
  { value: 'personal_expense', label: '🛒 Personal Expense' },
  { value: 'donation', label: '🎁 Donation' },
  { value: 'swap', label: '🔄 Swap' },
  { value: 'other', label: '📋 Other' }
];

// Mock transactions for Demo Mode
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: '0x1111111111111111111111111111111111111111111111111111111111111111',
    timeStamp: Math.floor((Date.now() - 3600000 * 2) / 1000).toString(),
    from: '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    value: parseEther('0.5').toString(),
    input: '0x',
    blockNumber: '124950',
    detectedType: 'Transfer',
    isError: '0',
    chainId: 143
  },
  {
    hash: '0x2222222222222222222222222222222222222222222222222222222222222222',
    timeStamp: Math.floor((Date.now() - 3600000 * 5) / 1000).toString(),
    from: '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
    to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    value: '0',
    input: '0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e0000000000000000000000000000000000000000000000000000000005f5e100',
    blockNumber: '124920',
    detectedType: 'Token Transfer',
    isError: '0',
    chainId: 143
  },
  {
    hash: '0x3333333333333333333333333333333333333333333333333333333333333333',
    timeStamp: Math.floor((Date.now() - 3600000 * 24) / 1000).toString(),
    from: '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
    to: '0x7a250d5630B4cf539739dF2C5dAcb4c659F2488D',
    value: parseEther('1.2').toString(),
    input: '0xf305d7150000000000000000000000000000000000000000000000000000000000000002',
    blockNumber: '124800',
    detectedType: 'Contract Call',
    isError: '0',
    chainId: 143
  },
  {
    hash: '0x4444444444444444444444444444444444444444444444444444444444444444',
    timeStamp: Math.floor((Date.now() - 3600000 * 48) / 1000).toString(),
    from: '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
    to: '0x0000000000000000000000000000000000000000',
    value: parseEther('0.05').toString(),
    input: '0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: '124500',
    detectedType: 'Contract Call',
    isError: '1',
    chainId: 143
  },
  {
    hash: '0x5555555555555555555555555555555555555555555555555555555555555555',
    timeStamp: Math.floor((Date.now() - 3600000 * 72) / 1000).toString(),
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
    value: parseEther('10.0').toString(),
    input: '0x',
    blockNumber: '124100',
    detectedType: 'Transfer',
    chainId: 143,
    isError: '0'
  }
];

const truncateAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

const getExplorerUrl = (chainId: number, type: 'tx' | 'address', hashOrAddress: string) => {
  switch (chainId) {
    case 1: return `https://etherscan.io/${type}/${hashOrAddress}`;
    case 8453: return `https://basescan.org/${type}/${hashOrAddress}`;
    case 137: return `https://polygonscan.com/${type}/${hashOrAddress}`;
    case 143: return `https://explorer.monad.xyz/${type}/${hashOrAddress}`;
    default: return `https://explorer.monad.xyz/${type}/${hashOrAddress}`;
  }
};

const getCurrencySymbol = (chainId: number) => {
  switch (chainId) {
    case 1: return 'ETH';
    case 8453: return 'ETH';
    case 137: return 'POL';
    case 143: return 'MON';
    default: return 'MON';
  }
};

const getNetworkBadge = (chainId: number) => {
  switch (chainId) {
    case 1: return <span className="px-1.5 py-0.5 border bg-blue-50 border-blue-200 text-blue-800 text-[10px] font-bold rounded" title="Ethereum Mainnet">🟦 ETH</span>;
    case 8453: return <span className="px-1.5 py-0.5 border bg-blue-500 border-blue-600 text-white text-[10px] font-bold rounded" title="Base Mainnet">🔵 BASE</span>;
    case 137: return <span className="px-1.5 py-0.5 border bg-purple-50 border-purple-200 text-purple-800 text-[10px] font-bold rounded" title="Polygon Mainnet">🟪 POLY</span>;
    case 143: return <span className="px-1.5 py-0.5 border bg-indigo-50 border-indigo-200 text-indigo-800 text-[10px] font-bold rounded" title="Monad Mainnet">Ⓜ️ MONAD</span>;
    default: return <span>UNKNOWN</span>;
  }
};

const AddressLink = ({ addr, isConnected, chainId }: { addr: string, isConnected: boolean, chainId: number }) => {
  if (isConnected) {
    return <span className="font-bold text-blue-600">You</span>;
  }
  return (
    <div className="inline-flex items-center gap-1">
      <span 
        className="font-mono cursor-pointer hover:text-blue-600" 
        title={`${addr} (Click to copy)`}
        onClick={() => navigator.clipboard.writeText(addr)}
      >
        {truncateAddress(addr)}
      </span>
      <a
        href={getExplorerUrl(chainId, 'address', addr)}
        target="_blank"
        rel="noreferrer"
        className="text-gray-400 hover:text-blue-600"
        title="View on Explorer"
      >
        ↗
      </a>
    </div>
  );
};

const FromTo = ({ tx, connectedWallet }: { tx: Transaction, connectedWallet: string | undefined }) => {
  const fromMe = connectedWallet ? tx.from.toLowerCase() === connectedWallet.toLowerCase() : false;
  const toMe = connectedWallet && tx.to ? tx.to.toLowerCase() === connectedWallet.toLowerCase() : false;
  
  if (tx.detectedType === 'Contract Creation' || !tx.to) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <AddressLink addr={tx.from} isConnected={fromMe} chainId={tx.chainId} />
        <span className="text-gray-500 font-bold">→</span>
        <span className="font-mono bg-yellow-100 text-yellow-800 px-1 py-0.5 text-xs rounded whitespace-nowrap">Contract Creation</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <AddressLink addr={tx.from} isConnected={fromMe} chainId={tx.chainId} />
      <span className="text-gray-500 font-bold">{toMe && !fromMe ? '←' : '→'}</span>
      <AddressLink addr={tx.to} isConnected={toMe} chainId={tx.chainId} />
    </div>
  );
};

const ValueDisplay = ({ tx, connectedWallet }: { tx: Transaction, connectedWallet: string | undefined }) => {
  const fromMe = connectedWallet ? tx.from.toLowerCase() === connectedWallet.toLowerCase() : false;
  const toMe = connectedWallet && tx.to ? tx.to.toLowerCase() === connectedWallet.toLowerCase() : false;
  
  const valEth = Number(formatEther(BigInt(tx.value)));
  const currency = getCurrencySymbol(tx.chainId);
  let displayValue = '';
  
  if (valEth === 0) displayValue = `0 ${currency}`;
  else if (valEth < 0.001) displayValue = `< 0.001 ${currency}`;
  else if (valEth >= 1000000) displayValue = `${(valEth / 1000000).toFixed(1)}M ${currency}`;
  else displayValue = `${valEth.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${currency}`;

  let colorClass = 'text-gray-800';
  if (toMe && !fromMe && valEth > 0) colorClass = 'text-emerald-600 font-medium';
  if (toMe && fromMe) colorClass = 'text-gray-500';
  
  if (tx.isError === '1') colorClass += ' line-through opacity-50';

  return (
    <span className={colorClass} title={`${tx.value} wei`}>
      {displayValue}
    </span>
  );
};

export function App() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();

  // State
  const [demoMode, setDemoMode] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTxs, setLoadingTxs] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [additionalWallets, setAdditionalWallets] = useState<string[]>([]);
  
  // Row State for editing/signing/pending tags
  const [rowStates, setRowStates] = useState<Record<string, RowState>>({});
  
  // Onchain tags
  const [onchainTags, setOnchainTags] = useState<Record<string, Tag>>({});
  const [lastSynced, setLastSynced] = useState<number | null>(null);

  // Manual Hash Fallback
  const [manualHash, setManualHash] = useState('');
  const [manualNetwork, setManualNetwork] = useState<number>(143);
  const [resolvingHash, setResolvingHash] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  // Multi-wallet input
  const [newWalletInput, setNewWalletInput] = useState('');

  // Time ticker to check stuck states
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load additional wallets from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gas_receipts_additional_wallets');
    if (saved) {
      try {
        setAdditionalWallets(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleAddWallet = () => {
    if (/^0x[a-fA-F0-9]{40}$/.test(newWalletInput)) {
      if (!additionalWallets.includes(newWalletInput) && newWalletInput.toLowerCase() !== address?.toLowerCase()) {
        const updated = [...additionalWallets, newWalletInput];
        setAdditionalWallets(updated);
        localStorage.setItem('gas_receipts_additional_wallets', JSON.stringify(updated));
      }
      setNewWalletInput('');
    } else {
      alert("Invalid EVM address");
    }
  };

  const handleRemoveWallet = (addr: string) => {
    const updated = additionalWallets.filter(a => a !== addr);
    setAdditionalWallets(updated);
    localStorage.setItem('gas_receipts_additional_wallets', JSON.stringify(updated));
  };

  // Contract write configuration
  const { writeContractAsync } = useWriteContract();

  // 1. Fetch tags from contract using readContract
  const { data: rawOnchainTags, refetch: refetchOnchainTags } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: tagRegistryAbi,
    functionName: 'getAllTags',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !demoMode,
    }
  });

  // Convert raw onchain tags to lookup map
  useEffect(() => {
    if (demoMode) return;
    if (rawOnchainTags) {
      const tagsMap: Record<string, Tag> = {};
      (rawOnchainTags as unknown as any[]).forEach((tag: any) => {
        if (tag.exists) {
          const hashLower = tag.txHash.toLowerCase();
          tagsMap[hashLower] = {
            txHash: tag.txHash,
            chainId: Number(tag.chainId),
            category: tag.category,
            note: tag.note,
            timestamp: Number(tag.timestamp),
            exists: tag.exists
          };
        }
      });
      setOnchainTags(tagsMap);
      setLastSynced(Date.now());

      // Merge onchain tags into localStorage cache
      if (address) {
        const cacheKey = `gas_receipts_tags_${address.toLowerCase()}`;
        const cached = localStorage.getItem(cacheKey);
        const localTags: Record<string, Tag> = cached ? JSON.parse(cached) : {};
        
        Object.keys(tagsMap).forEach((hash) => {
          localTags[hash] = tagsMap[hash];
        });

        localStorage.setItem(cacheKey, JSON.stringify(localTags));
      }
    }
  }, [rawOnchainTags, address, demoMode]);

  // Load from local storage cache initially
  useEffect(() => {
    if (!address) return;
    const cacheKey = `gas_receipts_tags_${address.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const tagsMap = JSON.parse(cached);
      if (demoMode) {
        // In demo mode, keep them but we also populate row states below
      } else {
        setOnchainTags((prev) => ({ ...tagsMap, ...prev }));
      }
    }
  }, [address, demoMode]);

  // 2. Fetch transaction history from specific explorer APIs
  const fetchTxHistory = useCallback(async (userAddresses: string[]) => {
    setLoadingTxs(true);
    setTxError(null);
    try {
      const supportedChains = [8453, 143]; // Base, Monad
      
      const getApiUrl = (chainId: number, addr: string) => {
        switch (chainId) {
          case 8453: return `https://api.basescan.org/api?module=account&action=txlist&address=${addr}&startblock=0&endblock=99999999&sort=desc`;
          case 143: return `https://explorer.monad.xyz/api?module=account&action=txlist&address=${addr}&startblock=0&endblock=99999999&sort=desc`;
          default: return '';
        }
      };

      const fetchPromises = userAddresses.flatMap((addr) => 
        supportedChains.map(async (chainId) => {
          try {
            const url = getApiUrl(chainId, addr);
            if (!url) return [];
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.status === '1' && Array.isArray(data.result)) {
              return data.result.slice(0, 50).map((tx: any) => {
                let detectedType: 'Transfer' | 'Token Transfer' | 'Contract Call' | 'Contract Creation' = 'Contract Call';
                
                if (!tx.to || tx.to === '') {
                  detectedType = 'Contract Creation';
                } else if (tx.value !== '0' && (!tx.input || tx.input === '0x')) {
                  detectedType = 'Transfer';
                } else if (tx.value !== '0' && tx.input && tx.input !== '0x') {
                  detectedType = 'Contract Call';
                } else if (tx.value === '0' && tx.input && tx.input !== '0x') {
                  detectedType = 'Token Transfer';
                }

                return {
                  hash: tx.hash.toLowerCase(),
                  timeStamp: tx.timeStamp,
                  from: tx.from,
                  to: tx.to || null,
                  value: tx.value,
                  input: tx.input,
                  blockNumber: tx.blockNumber,
                  detectedType,
                  isError: tx.isError || '0',
                  chainId
                };
              });
            }
            return [];
          } catch (e) {
            console.error(`Failed to fetch for chain ${chainId}:`, e);
            return [];
          }
        })
      );

      const results = await Promise.all(fetchPromises);
      const allTxs = results.flat();
      
      allTxs.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));
      setTransactions(allTxs.slice(0, 100));
    } catch (err: any) {
      console.error(err);
      setTxError(err.message || 'API query failed. Please use manual Tx entry fallback.');
      setTransactions([]);
    } finally {
      setLoadingTxs(false);
    }
  }, []);

  // Fetch transactions on address or additionalWallets change
  useEffect(() => {
    if (address && !demoMode) {
      fetchTxHistory([address, ...additionalWallets]);
    } else if (demoMode) {
      setTransactions(MOCK_TRANSACTIONS);
      setTxError(null);
    } else {
      setTransactions([]);
    }
  }, [address, additionalWallets, demoMode, fetchTxHistory]);

  // Sync rows' category and note when transactions or onchain/cached tags change
  useEffect(() => {
    const initialRowStates: Record<string, RowState> = {};
    
    // Load from localStorage or onchain tags
    const activeAddress = address ? address.toLowerCase() : 'demo';
    const cacheKey = `gas_receipts_tags_${activeAddress}`;
    const cached = localStorage.getItem(cacheKey);
    const cachedTags = cached ? JSON.parse(cached) : {};
    const sourceTags = { ...cachedTags, ...onchainTags };

    transactions.forEach((tx) => {
      const hashLower = tx.hash.toLowerCase();
      const existingTag = sourceTags[hashLower];
      
      // If we already have a pending or signing state in the current rowStates, keep it to avoid jarring overrides
      if (rowStates[hashLower] && (rowStates[hashLower].status === 'signing' || rowStates[hashLower].status === 'pending')) {
        initialRowStates[hashLower] = rowStates[hashLower];
      } else if (existingTag) {
        initialRowStates[hashLower] = {
          category: existingTag.category,
          note: existingTag.note,
          status: 'confirmed'
        };
      } else {
        initialRowStates[hashLower] = {
          category: '',
          note: '',
          status: 'idle'
        };
      }
    });

    setRowStates(initialRowStates);
  }, [transactions, onchainTags, address, demoMode]);

  // Handle dropdown/input changes
  const handleInputChange = (hash: string, field: 'category' | 'note', value: string) => {
    setRowStates((prev) => {
      const current = prev[hash] || { category: '', note: '', status: 'idle' };
      return {
        ...prev,
        [hash]: {
          ...current,
          [field]: value,
          // Reset status to idle if user edits after failure/confirmation to show "Save" button
          status: current.status === 'failed' || current.status === 'confirmed' ? 'idle' : current.status
        }
      };
    });
  };

  // Manual transaction hash resolver
  const handleResolveHash = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    
    const cleanHash = manualHash.trim().toLowerCase();
    if (!cleanHash.startsWith('0x') || cleanHash.length !== 66) {
      setManualError('Invalid Transaction Hash format. Must be 66-character hex starting with 0x.');
      return;
    }

    // Check if already in list
    if (transactions.some((tx) => tx.hash.toLowerCase() === cleanHash)) {
      setManualError('Transaction already exists in the dashboard table.');
      return;
    }

    setResolvingHash(true);

    try {
      if (demoMode) {
        // Simulate resolving manual transaction in demo mode
        const mockTx: Transaction = {
          hash: cleanHash,
          timeStamp: Math.floor(Date.now() / 1000).toString(),
          from: address || '0x93c55fDC841835fB61b944C6970f334AD4A2A5d6',
          to: '0x0000000000000000000000000000000000000000',
          value: parseEther('0').toString(),
          input: '0x',
          blockNumber: '999999',
          detectedType: 'Transfer',
          isManual: true,
          chainId: manualNetwork,
          isError: '0'
        };
        setTransactions((prev) => [mockTx, ...prev]);
        setManualHash('');
      } else {
        const getChain = (chainId: number) => {
          switch (chainId) {
            case 8453: return base;
            case 143: return {
              id: 143,
              name: 'Monad Mainnet',
              nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
              rpcUrls: { default: { http: ['https://rpc.monad.xyz'] } }
            };
            default: return base;
          }
        };

        let resolvedTx: Transaction;
        const client = createPublicClient({ chain: getChain(manualNetwork), transport: http() });

        try {
          const tx = await client.getTransaction({ hash: cleanHash as `0x${string}` });
          
          let detectedType: 'Transfer' | 'Token Transfer' | 'Contract Call' = 'Contract Call';
          if (!tx.input || tx.input === '0x') {
            detectedType = 'Transfer';
          } else if (tx.input.startsWith('0xa9059cbb')) {
            detectedType = 'Token Transfer';
          }

          resolvedTx = {
            hash: tx.hash.toLowerCase(),
            timeStamp: Math.floor(Date.now() / 1000).toString(),
            from: tx.from,
            to: tx.to || '0x0000000000000000000000000000000000000000',
            value: tx.value.toString(),
            input: tx.input,
            blockNumber: tx.blockNumber?.toString() || 'Pending',
            detectedType,
            isManual: true,
            chainId: manualNetwork,
            isError: '0'
          };
        } catch (rpcErr) {
          console.warn('RPC node failed or pruned tx. Falling back to Block Explorer API...', rpcErr);
          
          const getExplorerApi = (chainId: number) => {
            switch (chainId) {
              case 8453: return `https://api.basescan.org/api?`;
              case 143: return `https://explorer.monad.xyz/api?`;
              default: return '';
            }
          };

          const baseUrl = getExplorerApi(manualNetwork);
          if (!baseUrl) throw new Error('No fallback API available for this network');

          const res = await fetch(`${baseUrl}&module=proxy&action=eth_getTransactionByHash&txhash=${cleanHash}`);
          const data = await res.json();

          if (!data.result || data.result === 'null' || typeof data.result !== 'object') {
             throw new Error('Transaction not found on Block Explorer API either');
          }

          const tx = data.result;
          let detectedType: 'Transfer' | 'Token Transfer' | 'Contract Call' = 'Contract Call';
          if (!tx.input || tx.input === '0x') {
            detectedType = 'Transfer';
          } else if (tx.input.startsWith('0xa9059cbb')) {
            detectedType = 'Token Transfer';
          }

          resolvedTx = {
            hash: tx.hash.toLowerCase(),
            timeStamp: Math.floor(Date.now() / 1000).toString(),
            from: tx.from,
            to: tx.to || '0x0000000000000000000000000000000000000000',
            value: BigInt(tx.value).toString(),
            input: tx.input,
            blockNumber: BigInt(tx.blockNumber || 0).toString(),
            detectedType,
            isManual: true,
            chainId: manualNetwork,
            isError: '0'
          };
        }

        setTransactions((prev) => [resolvedTx, ...prev]);
        setManualHash('');
      }
    } catch (err: any) {
      console.error(err);
      setManualError(`Transaction not found. Please verify the hash actually belongs to the selected network.`);
    } finally {
      setResolvingHash(false);
    }
  };

  // Submit tag to contract
  const handleSaveTag = async (hash: string) => {
    const row = rowStates[hash];
    if (!row || !row.category) {
      setRowStates((prev) => ({
        ...prev,
        [hash]: { ...prev[hash], error: 'Category required to tag transaction.' }
      }));
      return;
    }

    // Set state to signing
    setRowStates((prev) => ({
      ...prev,
      [hash]: { ...prev[hash], status: 'signing', error: undefined }
    }));

    try {
      if (demoMode) {
        // Demo Mode simulated tx flow
        await new Promise((resolve) => setTimeout(resolve, 800)); // Sign wait
        
        setRowStates((prev) => ({
          ...prev,
          [hash]: { ...prev[hash], status: 'pending', startTime: Date.now() }
        }));
        
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Confirmation wait
        
        // Save to mock local storage
        const activeAddress = 'demo';
        const cacheKey = `gas_receipts_tags_${activeAddress}`;
        const cached = localStorage.getItem(cacheKey);
        const localTags = cached ? JSON.parse(cached) : {};
        
        localTags[hash] = {
          txHash: hash,
          chainId: 143,
          category: row.category,
          note: row.note,
          timestamp: Math.floor(Date.now() / 1000),
          exists: true
        };
        
        localStorage.setItem(cacheKey, JSON.stringify(localTags));
        
        setRowStates((prev) => ({
          ...prev,
          [hash]: { ...prev[hash], status: 'confirmed' }
        }));
      } else {
        // Real contract write call
        const isUpdate = !!onchainTags[hash];
        const functionName = isUpdate ? 'updateTag' : 'addTag';
        
        const txObj = transactions.find(t => t.hash.toLowerCase() === hash);
        const txChainId = txObj ? txObj.chainId : 143; 

        const txHash = await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: tagRegistryAbi,
          functionName: functionName as any,
          args: [hash as `0x${string}`, BigInt(txChainId), row.category, row.note],
        });

        // Set state to pending
        setRowStates((prev) => ({
          ...prev,
          [hash]: { ...prev[hash], status: 'pending', startTime: Date.now() }
        }));

        // Wait for confirmation
        if (!publicClient) throw new Error('Network client unavailable. Connect wallet.');
        
        let receipt = null;
        for (let i = 0; i < 30; i++) { 
          try {
            receipt = await publicClient.getTransactionReceipt({ hash: txHash });
            if (receipt) break;
          } catch (e) {
            // normal
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        if (!receipt) {
          throw new Error('Transaction confirmation timeout. Check block explorer.');
        }
        
        if (receipt.status === 'success') {
          const newTag: Tag = {
            txHash: hash,
            chainId: transactions.find(t => t.hash.toLowerCase() === hash)?.chainId || 143,
            category: row.category,
            note: row.note,
            timestamp: Math.floor(Date.now() / 1000),
            exists: true
          };

          setOnchainTags((prev) => ({ ...prev, [hash]: newTag }));

          const cacheKey = `gas_receipts_tags_${address?.toLowerCase()}`;
          const cached = localStorage.getItem(cacheKey);
          const localTags = cached ? JSON.parse(cached) : {};
          localTags[hash] = newTag;
          localStorage.setItem(cacheKey, JSON.stringify(localTags));

          setRowStates((prev) => ({
            ...prev,
            [hash]: { ...prev[hash], status: 'confirmed' }
          }));

          refetchOnchainTags();
        } else {
          throw new Error('Onchain transaction reverted.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setRowStates((prev) => ({
        ...prev,
        [hash]: {
          ...prev[hash],
          status: 'failed',
          error: err.shortMessage || err.message || 'Signature rejected or reverted.'
        }
      }));
    }
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = ['Date', 'Tx Hash', 'From', 'To', 'Value (MON)', 'Type', 'Category', 'Note'];
    
    const activeAddress = address ? address.toLowerCase() : 'demo';
    const cacheKey = `gas_receipts_tags_${activeAddress}`;
    const cached = localStorage.getItem(cacheKey);
    const cachedTags = cached ? JSON.parse(cached) : {};
    const tagsSource = { ...cachedTags, ...onchainTags };

    const csvRows = [headers.join(',')];

    transactions.forEach((tx) => {
      const hashLower = tx.hash.toLowerCase();
      const tag = tagsSource[hashLower] || { category: '', note: '' };
      
      const dateStr = new Date(Number(tx.timeStamp) * 1000).toISOString().replace('T', ' ').substring(0, 19);
      const valueMon = formatEther(BigInt(tx.value));
      
      const categoryEscaped = `"${tag.category || ''}"`;
      const noteEscaped = `"${(tag.note || '').replace(/"/g, '""')}"`;
      
      const row = [
        dateStr,
        tx.hash,
        tx.from,
        tx.to,
        valueMon,
        tx.detectedType,
        categoryEscaped,
        noteEscaped
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    const dateFormatted = new Date().toISOString().substring(0, 10);
    const displayAddress = address ? address.substring(0, 8) : 'demo';
    link.setAttribute("download", `gas-receipts-${displayAddress}-${dateFormatted}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalTaggedCount = useMemo(() => {
    const activeAddress = address ? address.toLowerCase() : 'demo';
    const cacheKey = `gas_receipts_tags_${activeAddress}`;
    const cached = localStorage.getItem(cacheKey);
    const cachedTags = cached ? JSON.parse(cached) : {};
    const mergedTags = { ...cachedTags, ...onchainTags };
    
    return Object.keys(mergedTags).length;
  }, [onchainTags, address, transactions]);

  // Main UI render
  return (
    <div className="min-h-screen bg-secondary text-primary selection:bg-accent selection:text-white flex flex-col">
      <header className="border-b-2 border-primary bg-white px-6 py-4 flex justify-between items-center shadow-[0_2px_0_0_rgba(0,0,0,1)] z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tighter text-header uppercase border-2 border-primary px-2 py-0.5 bg-secondary shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
            Gas Receipts
          </span>
          <span className="text-label text-neutral-500 uppercase tracking-widest hidden md:inline">
            CROSS-CHAIN EXPENSE TRACKER
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="flex items-center gap-2">
              {lastSynced && now - lastSynced > 300000 ? (
                <button 
                  onClick={() => refetchOnchainTags()}
                  className="text-label bg-red-100 text-red-800 border border-red-300 font-semibold px-2 py-0.5 hover:bg-red-200 transition-colors shadow-[1px_1px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                >
                  SYNC STALE · Click to refresh
                </button>
              ) : (
                <span className="text-label bg-green-100 text-green-800 border border-green-300 font-semibold px-2 py-0.5 shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
                  ONCHAIN SYNC ACTIVE {lastSynced && `· Last synced ${now - lastSynced < 60000 ? '<1' : Math.floor((now - lastSynced) / 60000)} min ago`}
                </span>
              )}
            </div>
          )}
          <ConnectButton 
            chainStatus="none"
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'address',
            }}
          />
        </div>
      </header>

      {!isConnected && !demoMode ? (
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-xl mx-auto text-center gap-8">
          <div className="border-2 border-primary bg-white p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left flex flex-col gap-6">
            <h1 className="text-header font-bold uppercase tracking-tight border-b-2 border-primary pb-3">
              Tag your onchain transactions. Export for taxes.
            </h1>
            <p className="text-body text-neutral-600">
              A clean, utilitarian tool built to help you tag your Monad Mainnet gas fees, token transfers, and smart contract transactions. Stores tags onchain via the <code className="font-mono text-label bg-neutral-100 border border-neutral-300 px-1 py-0.5">TagRegistry</code> smart contract and exports instant formatted CSV expense spreadsheets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                onClick={() => setDemoMode(true)}
                className="bg-neutral-100 hover:bg-neutral-200 text-primary border-2 border-primary font-bold px-6 py-2 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none text-center"
              >
                Launch Demo Mode
              </button>
              <div className="flex-1 flex justify-center sm:justify-start">
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button 
                      onClick={openConnectModal}
                      className="w-full bg-accent hover:bg-accent-dark text-white border-2 border-primary font-bold px-6 py-2 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                    >
                      Connect Wallet
                    </button>
                  )}
                </ConnectButton.Custom>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row">
          <aside className="w-full md:w-[20%] border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-primary bg-white p-6 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="border-2 border-primary bg-secondary p-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <span className="text-label text-neutral-500 uppercase font-semibold block mb-1">
                  Active Wallet
                </span>
                <span className="font-mono font-bold text-body break-all block">
                  {demoMode 
                    ? 'Demo Mode Active' 
                    : address 
                      ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` 
                      : 'Not Connected'}
                </span>
                {!demoMode && address && (
                  <a 
                    href={`https://explorer.monad.xyz/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label text-accent font-semibold underline block mt-2 hover:text-accent-dark"
                  >
                    View on MonadScan
                  </a>
                )}
              </div>

              {!demoMode && (
                <div className="border-2 border-primary bg-white p-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col gap-3">
                  <span className="text-label text-neutral-500 uppercase font-semibold block">
                    Track More Wallets
                  </span>
                  
                  {additionalWallets.length > 0 && (
                    <div className="flex flex-col gap-2 mb-2">
                      {additionalWallets.map(addr => (
                        <div key={addr} className="flex justify-between items-center bg-neutral-100 p-2 border border-neutral-300">
                          <span className="font-mono text-xs truncate mr-2" title={addr}>
                            {addr.substring(0, 6)}...{addr.substring(addr.length - 4)}
                          </span>
                          <button 
                            onClick={() => handleRemoveWallet(addr)}
                            className="text-red-600 hover:text-red-800 font-bold px-2 py-0.5"
                            title="Remove Wallet"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="0x..." 
                      value={newWalletInput}
                      onChange={(e) => setNewWalletInput(e.target.value)}
                      className="w-full border-2 border-primary p-1 font-mono text-xs focus:outline-none focus:border-accent"
                    />
                    <button 
                      onClick={handleAddWallet}
                      className="bg-primary text-white px-2 py-1 font-bold text-xs hover:bg-neutral-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="border-2 border-primary bg-white p-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <span className="text-label text-neutral-500 uppercase font-semibold block mb-1">
                  Tagged Transactions
                </span>
                <span className="text-header font-bold block">
                  {totalTaggedCount} total
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleExportCSV}
                  disabled={transactions.length === 0}
                  className={`w-full text-center border-2 border-primary font-bold py-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none ${
                    transactions.length === 0 
                      ? 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none' 
                      : 'bg-accent text-white hover:bg-accent-dark'
                  }`}
                >
                  Export CSV
                </button>

                {demoMode && (
                  <button
                    onClick={() => {
                      setDemoMode(false);
                      setTransactions([]);
                    }}
                    className="w-full bg-white hover:bg-neutral-100 text-primary border-2 border-primary font-bold py-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                  >
                    Exit Demo Mode
                  </button>
                )}

                {!demoMode && isConnected && (
                  <button
                    onClick={() => disconnect()}
                    className="w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 font-bold py-2 shadow-[2px_2px_0_0_rgba(220,38,38,0.2)] hover:border-red-600 transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4 flex flex-col gap-2">
              <span className="text-label text-neutral-400 block font-mono">
                Registry Contract:
              </span>
              <a 
                href={`https://testnet.monadscan.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-label text-neutral-600 hover:text-accent truncate block underline"
              >
                {CONTRACT_ADDRESS}
              </a>
            </div>
          </aside>

          <main className="flex-1 p-6 overflow-x-auto flex flex-col gap-6">
            <div className="bg-white border-2 border-primary p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <h2 className="text-header font-black uppercase mb-2">Resolve Manual Transaction Fallback</h2>
              <p className="text-body text-neutral-600 mb-4">
                If the block explorer API is down or has not updated, enter a specific transaction hash and select its network below to fetch it directly from the RPC node and add it to your tagging ledger.
              </p>
              
              <form onSubmit={handleResolveHash} className="flex gap-2 w-full flex-col md:flex-row">
                <select 
                  value={manualNetwork}
                  onChange={(e) => setManualNetwork(Number(e.target.value))}
                  className="px-4 py-2 border-2 border-primary font-bold text-label bg-white shadow-[1px_1px_0_0_rgba(0,0,0,1)] md:w-32 focus:outline-none"
                >
                  <option value={143}>Monad</option>
                  <option value={8453}>Base</option>
                </select>
                <input
                  type="text"
                  placeholder="0x..."
                  value={manualHash}
                  onChange={(e) => setManualHash(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-primary font-mono text-label bg-secondary focus:outline-none focus:bg-white transition-colors placeholder-neutral-400"
                  disabled={resolvingHash}
                />
                <button
                  type="submit"
                  disabled={resolvingHash || manualHash.trim().length === 0}
                  className={`border-2 border-primary font-bold px-6 py-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none ${
                    resolvingHash || manualHash.trim().length === 0
                      ? 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none'
                      : 'bg-accent text-white hover:bg-accent-dark'
                  }`}
                >
                  {resolvingHash ? 'Resolving...' : 'Resolve Tx Hash'}
                </button>
              </form>
              {manualError && (
                <div className="mt-3 text-label text-red-600 border border-red-200 bg-red-50 p-2 font-medium">
                  {manualError}
                </div>
              )}
            </div>

            {/* Dashboard Warnings */}
            {txError && (
              <div className="bg-amber-50 border-2 border-amber-500 text-amber-900 p-4 font-semibold text-body">
                ⚠️ API Fallback Active: {txError}
              </div>
            )}

            {/* Transaction Ledger Table */}
            <div className="bg-white border-2 border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex-1 flex flex-col overflow-hidden">
              <div className="bg-primary text-white px-4 py-3 flex justify-between items-center border-b-2 border-primary">
                <span className="font-bold text-header uppercase tracking-wider">Transaction Expense Ledger</span>
                {demoMode && (
                  <span className="bg-amber-400 text-primary text-label font-bold px-2 py-0.5 border border-primary">
                    DEMO SIMULATOR ACTIVE
                  </span>
                )}
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b-2 border-primary bg-secondary text-label uppercase text-neutral-500 font-bold hidden md:table-row">
                      <th className="px-4 py-3 border-r border-neutral-200 w-[140px]">Date</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[120px]">Tx Hash</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[100px]">Network</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[280px]">From → To</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[100px] text-right">Value</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[120px]">Type</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[140px]">Category</th>
                      <th className="px-4 py-3 border-r border-neutral-200 w-[180px]">Note (max 100 chars)</th>
                      <th className="px-4 py-3 w-[160px]">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingTxs ? (
                      // Skeleton Loading rows
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b border-neutral-200 animate-pulse block md:table-row">
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-24"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-20"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-12"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-48"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-16"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-4 bg-neutral-200 w-16"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-8 bg-neutral-200 w-full"></div></td>
                          <td className="px-4 py-4 border-r border-neutral-200 block md:table-cell"><div className="h-8 bg-neutral-200 w-full"></div></td>
                          <td className="px-4 py-4 block md:table-cell"><div className="h-8 bg-neutral-200 w-16"></div></td>
                        </tr>
                      ))
                    ) : transactions.length === 0 ? (
                      // Empty state
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-neutral-400">
                          <div className="max-w-xs mx-auto flex flex-col items-center gap-3">
                            <div className="w-12 h-12 border-2 border-dashed border-neutral-300 flex items-center justify-center font-bold text-header">
                              ?
                            </div>
                            <span className="font-semibold text-body">No transactions found</span>
                            <span className="text-label mb-2">Use the manual input tool above, or load demo data.</span>
                            <button
                              onClick={() => setDemoMode(true)}
                              className="bg-accent text-white border-2 border-primary px-4 py-2 font-bold text-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-accent-dark transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                            >
                              Load Demo Data
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => {
                        const hashLower = tx.hash.toLowerCase();
                        const rowState = rowStates[hashLower] || { category: '', note: '', status: 'idle' };
                        const originalTag = onchainTags[hashLower];
                        
                        // Check if fields were modified since being confirmed onchain
                        const isModified = !originalTag || 
                          originalTag.category !== rowState.category || 
                          originalTag.note !== rowState.note;
                        
                        // Show "Save" button if modified, or "Edit" if confirmed & unmodified
                        const showSave = isModified || rowState.status === 'failed';

                        // Render row-level status states
                        let statusContent = null;
                        
                        // Check for stuck pending state (>60s)
                        const isStuck = rowState.status === 'pending' && rowState.startTime && (now - rowState.startTime > 60000);

                        if (rowState.status === 'signing') {
                          statusContent = (
                            <span className="text-label text-amber-600 font-bold animate-pulse">
                              ✍️ Signing...
                            </span>
                          );
                        } else if (rowState.status === 'pending') {
                          statusContent = (
                            <div className="flex flex-col gap-1">
                              <span className="text-label text-blue-600 font-bold animate-pulse">
                                ⏳ Pending...
                              </span>
                              {isStuck && (
                                <a 
                                  href={`https://testnet.monadscan.com/tx/${tx.hash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-accent underline hover:text-accent-dark font-mono break-all"
                                >
                                  Stuck? Check Explorer
                                </a>
                              )}
                            </div>
                          );
                        } else if (rowState.status === 'confirmed') {
                          statusContent = (
                            <span className="text-label text-green-700 font-bold flex items-center gap-1">
                              ✅ Onchain
                            </span>
                          );
                        } else if (rowState.status === 'failed') {
                          statusContent = (
                            <div className="flex flex-col gap-1">
                              <span className="text-label text-red-600 font-bold block">
                                ❌ Failed
                              </span>
                            </div>
                          );
                        }

                        const date = new Date(Number(tx.timeStamp) * 1000);
                        const dateFormatted = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        const isIncoming = tx.to && address && tx.to.toLowerCase() === address.toLowerCase();
                        const isOutgoing = tx.from && address && tx.from.toLowerCase() === address.toLowerCase();
                        let rowBg = 'bg-white';
                        if (tx.isError === '1') rowBg = 'bg-red-50 hover:bg-red-100';
                        else if (isIncoming && !isOutgoing) rowBg = 'bg-[#F0FDF4] hover:bg-green-100/50';
                        else if (tx.isManual) rowBg = 'bg-blue-50/40 hover:bg-blue-50/80';
                        else rowBg = 'bg-white hover:bg-neutral-50';

                        return (
                          <tr 
                            key={tx.hash} 
                            className={`border-b border-neutral-200 transition-colors block md:table-row flex-col p-4 md:p-0 gap-2 md:gap-0 ${rowBg}`}
                            style={{ display: 'flex' }}
                          >
                            <style>{`
                              @media (min-width: 768px) {
                                tr.block { display: table-row !important; }
                                td.block { display: table-cell !important; }
                              }
                            `}</style>
                            <div className="flex justify-between items-center w-full md:hidden mb-2">
                              {/* Date */}
                              <span className="text-label font-medium text-neutral-600">
                                {dateFormatted}
                              </span>
                              {/* Mobile Status */}
                              <div className="text-right">
                                {statusContent}
                              </div>
                            </div>

                            <div className="flex justify-between items-center w-full md:hidden mb-2">
                              {/* Mobile Hash & Type */}
                              <div className="flex gap-2 items-center flex-wrap">
                                {getNetworkBadge(tx.chainId)}
                                <a 
                                  href={getExplorerUrl(tx.chainId, 'tx', tx.hash)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-label text-accent hover:text-accent-dark hover:underline truncate w-[120px]"
                                  title={tx.hash}
                                >
                                  {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
                                </a>
                                <span className="text-gray-500">→</span>
                                <span className={`px-1.5 py-0.5 border text-xs font-bold uppercase ${
                                  tx.detectedType === 'Contract Creation' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                                  tx.detectedType === 'Transfer' ? 'bg-neutral-100 border-neutral-300 text-neutral-700' : 
                                  tx.detectedType === 'Token Transfer' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 
                                  'bg-blue-100 border-blue-300 text-blue-800'
                                }`}>
                                  {tx.detectedType}
                                </span>
                              </div>
                            </div>

                            {/* Mobile From To & Value */}
                            <div className="flex justify-between items-center w-full md:hidden mb-3">
                              <FromTo tx={tx} connectedWallet={address} />
                              <ValueDisplay tx={tx} connectedWallet={address} />
                            </div>

                            {/* Desktop Columns */}
                            <td className="px-4 py-3 border-r border-neutral-200 text-label font-medium text-neutral-600 whitespace-nowrap hidden md:table-cell align-middle">
                              {dateFormatted}
                            </td>

                            <td className="px-4 py-3 border-r border-neutral-200 font-mono text-label font-semibold hidden md:table-cell align-middle">
                              <a 
                                href={getExplorerUrl(tx.chainId, 'tx', tx.hash)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent hover:text-accent-dark hover:underline block truncate w-[120px]"
                                title={tx.hash}
                              >
                                {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
                              </a>
                            </td>

                            <td className="px-4 py-3 border-r border-neutral-200 text-sm hidden md:table-cell align-middle">
                              {getNetworkBadge(tx.chainId)}
                            </td>

                            <td className="px-4 py-3 border-r border-neutral-200 text-sm hidden md:table-cell align-middle">
                              <FromTo tx={tx} connectedWallet={address} />
                            </td>

                            <td className="px-4 py-3 border-r border-neutral-200 font-mono text-sm text-right hidden md:table-cell align-middle">
                              <ValueDisplay tx={tx} connectedWallet={address} />
                            </td>

                            <td className="px-4 py-3 border-r border-neutral-200 text-label font-bold uppercase text-neutral-700 hidden md:table-cell align-middle">
                              <div className="flex flex-col gap-1 items-start">
                                <span className={`px-1.5 py-0.5 border ${
                                  tx.detectedType === 'Contract Creation' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                                  tx.detectedType === 'Transfer' ? 'bg-neutral-100 border-neutral-300' : 
                                  tx.detectedType === 'Token Transfer' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 
                                  'bg-blue-100 border-blue-300 text-blue-800'
                                }`}>
                                  {tx.detectedType}
                                </span>
                                {isOutgoing && !isIncoming && <span className="text-[10px] text-gray-500 font-medium">↑ Outgoing</span>}
                                {isIncoming && !isOutgoing && <span className="text-[10px] text-emerald-600 font-medium">↓ Incoming</span>}
                              </div>
                            </td>

                            <td className="px-4 py-2 border-r border-neutral-200 block md:table-cell w-full md:w-auto mt-2 md:mt-0 align-middle">
                              <select
                                value={rowState.category}
                                onChange={(e) => handleInputChange(hashLower, 'category', e.target.value)}
                                disabled={rowState.status === 'signing' || rowState.status === 'pending'}
                                className="w-full bg-secondary border-2 border-primary py-1 px-2 font-medium focus:border-accent outline-none mb-2 md:mb-0"
                              >
                                {CATEGORIES.map((c) => (
                                  <option key={c.value} value={c.value}>
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="px-4 py-2 border-r border-neutral-200 block md:table-cell w-full md:w-auto align-middle">
                              <input
                                type="text"
                                maxLength={100}
                                placeholder="Add note (optional)"
                                value={rowState.note}
                                onChange={(e) => handleInputChange(hashLower, 'note', e.target.value)}
                                disabled={rowState.status === 'signing' || rowState.status === 'pending'}
                                className="w-full bg-secondary border-2 border-primary py-1 px-2 focus:border-accent outline-none font-medium mb-2 md:mb-0"
                              />
                            </td>

                            <td className="px-4 py-2 flex flex-col gap-2 justify-center min-h-[60px] md:table-cell w-full md:w-auto hidden md:block align-middle">
                              <div className="flex items-center justify-between gap-3">
                                {showSave ? (
                                  <button
                                    onClick={() => handleSaveTag(hashLower)}
                                    disabled={!rowState.category || rowState.status === 'signing' || rowState.status === 'pending'}
                                    className={`border-2 border-primary px-3 py-1 font-bold text-label shadow-[1px_1px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${
                                      !rowState.category || rowState.status === 'signing' || rowState.status === 'pending'
                                        ? 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none'
                                        : 'bg-accent text-white hover:bg-accent-dark'
                                    }`}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <span className="text-label text-neutral-400 font-bold border border-transparent px-3 py-1">
                                    Saved
                                  </span>
                                )}
                                <div className="flex-1 text-right flex flex-col items-end">
                                  {statusContent}
                                  {rowState.status === 'confirmed' && (
                                    <span className="text-[10px] text-neutral-400 font-medium">Ⓜ️ Tagged on Monad</span>
                                  )}
                                </div>
                              </div>
                              {rowState.error && (
                                <span className="text-[10px] text-red-600 font-semibold block leading-tight border-t border-red-100 pt-1 mt-1">
                                  {rowState.error}
                                </span>
                              )}
                            </td>
                            
                            {/* Mobile Save Button Area */}
                            <div className="w-full md:hidden flex justify-between items-center mt-2 border-t border-neutral-200 pt-3">
                              {showSave ? (
                                  <button
                                    onClick={() => handleSaveTag(hashLower)}
                                    disabled={!rowState.category || rowState.status === 'signing' || rowState.status === 'pending'}
                                    className={`border-2 border-primary px-6 py-2 font-bold text-label shadow-[1px_1px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all w-full ${
                                      !rowState.category || rowState.status === 'signing' || rowState.status === 'pending'
                                        ? 'bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none'
                                        : 'bg-accent text-white hover:bg-accent-dark'
                                    }`}
                                  >
                                    Save Transaction Tag
                                  </button>
                                ) : (
                                  <div className="w-full text-center bg-neutral-100 border border-neutral-300 py-2 flex flex-col items-center">
                                    <span className="text-label text-neutral-500 font-bold">
                                      ✓ Saved
                                    </span>
                                    <span className="text-[10px] text-neutral-400 mt-1">Ⓜ️ Tagged on Monad</span>
                                  </div>
                                )}
                            </div>
                            {rowState.error && (
                              <div className="w-full md:hidden mt-2 text-xs text-red-600 font-medium bg-red-50 p-2 border border-red-200">
                                {rowState.error}
                              </div>
                            )}

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
