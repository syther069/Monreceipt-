import { ConnectButton } from '@rainbow-me/rainbowkit';

interface EmptyStateProps {
  isWalletConnected: boolean;
  loadError: boolean;
  onOpenManualFallback: () => void;
  onLoadDemo: () => void;
  onRetry: () => void;
  address?: string;
}

export function EmptyState({
  isWalletConnected,
  loadError,
  onOpenManualFallback,
  onLoadDemo,
  onRetry,
  address = '',
}: EmptyStateProps) {
  const truncatedAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : '';

  // NOT CONNECTED
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 border border-neutral-200 bg-white">
        <svg className="w-12 h-12 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="0"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
        <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 mb-2">No wallet connected</h3>
        <p className="text-sm text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to view and tag your onchain transactions.
        </p>
        <div className="flex gap-3">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button 
                onClick={openConnectModal}
                className="px-6 py-2.5 bg-accent text-white text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
              >
                Connect Wallet
              </button>
            )}
          </ConnectButton.Custom>
          <button 
            onClick={onLoadDemo}
            className="px-6 py-2.5 bg-white text-neutral-900 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
          >
            Load Demo Data
          </button>
        </div>
      </div>
    );
  }

  // CONNECTED + API ERROR
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 border border-neutral-200 bg-white">
        <svg className="w-12 h-12 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
        <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 mb-2">Couldn't load transactions</h3>
        <p className="text-sm text-neutral-500 mb-2 text-center max-w-sm">
          The block explorer API may be down or rate-limited.
        </p>
        <p className="text-xs text-neutral-400 mb-6 text-center">
          Wallet: <span className="font-mono text-neutral-600">{truncatedAddress}</span>
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button 
            onClick={onOpenManualFallback}
            className="w-full px-6 py-2.5 bg-accent text-white text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none flex items-center justify-center gap-2"
          >
            <span>▼</span> Use Manual Fallback
          </button>
          <button 
            onClick={onRetry}
            className="w-full px-6 py-2.5 bg-white text-neutral-900 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
          >
            ↻ Retry Loading
          </button>
          <div className="text-center">
            <span className="text-xs text-neutral-400 font-bold uppercase">or</span>
          </div>
          <button 
            onClick={onLoadDemo}
            className="w-full px-6 py-2.5 bg-white text-neutral-600 text-sm font-bold border border-neutral-200 hover:border-neutral-400 transition-all"
          >
            Load Demo Data
          </button>
        </div>
      </div>
    );
  }

  // CONNECTED + 0 TRANSACTIONS (API success, empty result)
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 border border-neutral-200 bg-white">
      <svg className="w-12 h-12 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="0"/>
        <path d="M9 12h6"/>
      </svg>
      <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 mb-2">No transactions found</h3>
      <p className="text-sm text-neutral-500 mb-2 text-center max-w-sm">
        This wallet has no visible transaction history on the selected chain.
      </p>
      <p className="text-xs text-neutral-400 mb-6 text-center">
        Wallet: <span className="font-mono text-neutral-600">{truncatedAddress}</span>
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button 
          onClick={onOpenManualFallback}
          className="w-full px-6 py-2.5 bg-accent text-white text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none flex items-center justify-center gap-2"
        >
          <span>▼</span> Use Manual Fallback
        </button>
        <div className="text-center">
          <span className="text-xs text-neutral-400 font-bold uppercase">or</span>
        </div>
        <button 
          onClick={onLoadDemo}
          className="w-full px-6 py-2.5 bg-white text-neutral-600 text-sm font-bold border border-neutral-200 hover:border-neutral-400 transition-all"
        >
          Load Demo Data
        </button>
        <p className="text-xs text-neutral-400 text-center mt-2 font-medium">
          New wallet? Fund it or use demo.
        </p>
      </div>
    </div>
  );
}
