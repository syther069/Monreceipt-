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


  const btnClass = "w-full max-w-[280px] px-6 py-2.5 bg-white text-primary text-xs font-black uppercase tracking-wider border-2 border-primary shadow-[3px_3px_0px_0px_rgba(18,18,18,1)] hover:bg-neutral-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(18,18,18,1)] transition-all text-center";

  // NOT CONNECTED
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 border-2 border-primary bg-white shadow-[4px_4px_0_0_rgba(18,18,18,1)] max-w-lg mx-auto">
        <svg className="w-12 h-12 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="0"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
        <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-2">No wallet connected</h3>
        <p className="text-xs text-neutral-500 mb-6 text-center max-w-sm">
          Connect your wallet to view and tag your onchain transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button 
                onClick={openConnectModal}
                className={btnClass}
              >
                Connect Wallet
              </button>
            )}
          </ConnectButton.Custom>
          <button 
            onClick={onLoadDemo}
            className={btnClass}
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
      <div className="flex flex-col items-center justify-center py-16 px-8 border-2 border-primary bg-white shadow-[4px_4px_0_0_rgba(18,18,18,1)] max-w-lg mx-auto">
        <svg className="w-10 h-10 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
        <h3 className="text-base font-black uppercase tracking-widest text-primary mb-2">Couldn't load transactions</h3>
        <p className="text-xs text-neutral-500 mb-2 text-center max-w-sm leading-relaxed">
          The block explorer API may be down or rate-limited.
        </p>
        <p className="text-[10px] text-neutral-400 mb-6 text-center uppercase tracking-wider font-bold">
          Wallet: <span className="font-mono text-neutral-600 select-all">{address}</span>
        </p>
        <div className="flex flex-col gap-3 w-full items-center">
          <button 
            onClick={onOpenManualFallback}
            className={btnClass}
          >
            ▼ Use Manual Fallback
          </button>
          <button 
            onClick={onRetry}
            className={btnClass}
          >
            ↻ Retry Loading
          </button>
          <div className="text-center py-1">
            <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">or</span>
          </div>
          <button 
            onClick={onLoadDemo}
            className={btnClass}
          >
            Load Demo Data
          </button>
        </div>
      </div>
    );
  }

  // CONNECTED + 0 TRANSACTIONS (API success, empty result)
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 border-2 border-primary bg-white shadow-[4px_4px_0_0_rgba(18,18,18,1)] max-w-lg mx-auto">
      <svg className="w-12 h-12 text-neutral-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="0"/>
        <path d="M9 12h6"/>
      </svg>
      <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-2">No transactions found</h3>
      <p className="text-xs text-neutral-500 mb-2 text-center max-w-sm">
        This wallet has no visible transaction history on the selected chain.
      </p>
      <p className="text-[10px] text-neutral-400 mb-6 text-center uppercase tracking-wider font-bold">
        Wallet: <span className="font-mono text-neutral-600 select-all">{address}</span>
      </p>
      <div className="flex flex-col gap-3 w-full items-center">
        <button 
          onClick={onOpenManualFallback}
          className={btnClass}
        >
          ▼ Use Manual Fallback
        </button>
        <div className="text-center py-1">
          <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">or</span>
        </div>
        <button 
          onClick={onLoadDemo}
          className={btnClass}
        >
          Load Demo Data
        </button>
        <p className="text-[10px] text-neutral-400 text-center mt-2 font-black uppercase tracking-wider">
          New wallet? Fund it or use demo.
        </p>
      </div>
    </div>
  );
}
