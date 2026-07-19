import { Logo } from './Logo';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen text-primary font-sans selection:bg-accent selection:text-white flex flex-col bg-transparent">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b-2 border-primary z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo className="cursor-pointer" onClick={() => onNavigate('/')} />
        </div>
        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider">
          <a href="#how-it-works" className="hidden sm:inline-block px-3 py-1.5 bg-white border-2 border-primary shadow-[2px_2px_0_0_rgba(18,18,18,1)] hover:bg-neutral-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(18,18,18,1)] transition-all">How It Works</a>
          <a href="#features" className="hidden sm:inline-block px-3 py-1.5 bg-white border-2 border-primary shadow-[2px_2px_0_0_rgba(18,18,18,1)] hover:bg-neutral-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(18,18,18,1)] transition-all">Features</a>
          <button 
            onClick={() => onNavigate('/docs')}
            className="px-3 py-1.5 bg-white border-2 border-primary shadow-[2px_2px_0_0_rgba(18,18,18,1)] hover:bg-neutral-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(18,18,18,1)] transition-all font-black"
          >
            Docs
          </button>
          <button 
            onClick={() => onNavigate('/app')}
            className="bg-accent text-white px-4 py-1.5 shadow-[2px_2px_0_0_rgba(18,18,18,1)] hover:bg-accent-dark active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(18,18,18,1)] transition-all font-black flex items-center gap-1.5"
          >
            Open App →
          </button>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* 2. HERO */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-12 lg:py-24 gap-12">
        <div className="flex-1 flex flex-col gap-6 text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
            [Onchain Expense Tracking]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tighter leading-[1.05] text-primary">
            Stop screenshotting Etherscan for your accountant.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-medium leading-relaxed">
            Tag transactions across Ethereum, Base, and Monad. Store metadata onchain cheaply. Export clean, formatted tax-ready CSVs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-accent text-white font-black uppercase tracking-wider text-xs px-8 py-3.5 transition-all shadow-[4px_4px_0_0_rgba(18,18,18,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0_0_rgba(18,18,18,1)] border-2 border-primary text-center flex items-center justify-center gap-2"
            >
              Open App →
            </button>
            <a 
              href="#demo"
              className="bg-white hover:bg-neutral-50 text-primary font-black uppercase tracking-wider text-xs px-8 py-3.5 transition-all shadow-[4px_4px_0_0_rgba(18,18,18,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0_0_rgba(18,18,18,1)] border-2 border-primary text-center"
            >
              View Demo
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-primary font-black uppercase tracking-wider mt-4">
            <span>• Free</span> 
            <span className="text-neutral-300">|</span> 
            <span>No signup</span> 
            <span className="text-neutral-300">|</span> 
            <span>Onchain forever</span>
          </div>
        </div>

        {/* Hero Interactive App Mockup Component */}
        <div className="flex-1 w-full max-w-lg border-2 border-primary bg-white shadow-[4px_4px_0_0_rgba(18,18,18,1)] p-4 flex flex-col gap-4 font-mono text-[11px]">
          <div className="text-primary pb-2 flex justify-between items-center border-b-2 border-primary">
            <span className="font-black text-xs uppercase tracking-wider">Transaction Ledger</span>
            <span className="bg-accent text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">Live Metadata</span>
          </div>
          
          <div className="border-2 border-primary p-3 bg-white flex flex-col gap-2">
            <div className="flex justify-between font-black text-neutral-500 border-b border-primary pb-1.5 uppercase text-[10px]">
              <span>Tx Hash</span>
              <span>Value</span>
              <span>Category</span>
            </div>
            <div className="flex justify-between items-center py-1 font-bold">
              <span className="text-accent flex items-center gap-1">
                <span className="text-[10px]">✦</span>
                0x3f5c...7a1d
              </span>
              <span>→ 1.50 MON</span>
              <span className="flex items-center gap-1.5 bg-neutral-50 px-2 py-0.5 border border-primary text-[10px] uppercase font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                Investment
              </span>
            </div>
            <div className="flex justify-between items-center py-1 font-bold">
              <span className="text-accent flex items-center gap-1">
                <span className="text-[10px]">✦</span>
                0x8a9b...4e2f
              </span>
              <span>← 0.35 BASE</span>
              <span className="flex items-center gap-1.5 bg-neutral-50 px-2 py-0.5 border border-primary text-[10px] uppercase font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Income
              </span>
            </div>
            <div className="flex justify-between items-center py-1 font-bold">
              <span className="text-accent flex items-center gap-1">
                <span className="text-[10px]">✦</span>
                0x9c4d...8b9c
              </span>
              <span>→ 0.08 MON</span>
              <span className="flex items-center gap-1.5 bg-neutral-50 px-2 py-0.5 border border-primary text-[10px] uppercase font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Business
              </span>
            </div>
          </div>

          <div className="border border-dashed border-accent p-3 bg-accent/5 flex flex-col gap-1.5">
            <span className="font-black text-accent uppercase tracking-wider text-[10px]">Metadata Resolved Onchain</span>
            <div className="flex justify-between text-neutral-600 font-bold">
              <span>Category: Swap</span>
              <span>Note: Tax year '26 tag</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section id="problem" className="bg-white border-y-2 border-primary py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-left flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">[The Problem]</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              Tax season shouldn't require a blockchain explorer.
            </h2>
          </div>
          <p className="text-base text-neutral-600 max-w-3xl leading-relaxed font-medium">
            Every swap, stake, and transfer is a taxable event. But your wallet doesn't remember why you made them. So you spend hours tracing transactions, guessing categories, and hoping your accountant understands DeFi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Scattered Data</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Transactions spread across multiple chains, gas-receipt protocols, wallets, and smart contracts.
              </p>
            </div>
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">No Context</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Explorers show you the what, who, and when, but they never capture the "why" of the transaction.
              </p>
            </div>
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Manual Work</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Manually filling spreadsheets, tracking down old hashes, taking screenshots, and feeling tax stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-left flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">[How It Works]</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              Three steps to organized onchain finances.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 relative">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-accent font-mono">01</div>
              <div className="bg-white border-2 border-primary p-6 flex-1 flex flex-col gap-2 shadow-[3px_3px_0_0_rgba(18,18,18,1)]">
                <h3 className="font-black text-sm uppercase tracking-wider text-primary">Connect Wallet</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Securely link your address to automatically load transaction histories from Base and Monad.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-accent font-mono">02</div>
              <div className="bg-white border-2 border-primary p-6 flex-1 flex flex-col gap-2 shadow-[3px_3px_0_0_rgba(18,18,18,1)]">
                <h3 className="font-black text-sm uppercase tracking-wider text-primary">Tag Transaction</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Choose category, add optional notes, and store expense tags onchain permanently.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-accent font-mono">03</div>
              <div className="bg-white border-2 border-primary p-6 flex-1 flex flex-col gap-2 shadow-[3px_3px_0_0_rgba(18,18,18,1)]">
                <h3 className="font-black text-sm uppercase tracking-wider text-primary">Export Clean CSV</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Download structured spreadsheets with all tags and context to hand off to your accountant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section id="features" className="bg-white border-y-2 border-primary py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-left flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">[Features]</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              Everything you need. Nothing you don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Onchain Metadata</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Your categorizations and notes are saved directly to the Monad smart contract ledger. Permanent, secure, and censorship-resistant.
              </p>
            </div>
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">CSV Export</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Generate accountant-ready financial ledger tables with a single click. No manual formatting or re-arranging rows.
              </p>
            </div>
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Edit Anytime</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Made a mistake? Easily update tags and re-submit. The contract automatically resolves and displays your latest tags.
              </p>
            </div>
            <div className="bg-white border-2 border-primary p-6 flex flex-col gap-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <h3 className="font-black text-sm uppercase tracking-wider text-primary">Cross-Chain Ledger</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Tag transactions across Base and Monad, and store them cheaply in one unified repository. Keep your accounting consolidated in one single interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVE PREVIEW */}
      <section id="demo" className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">[See It In Action]</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary leading-tight">
              Tag a real transaction in seconds.
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-white hover:bg-neutral-50 text-primary border-2 border-primary font-black uppercase tracking-wider text-xs px-6 py-2.5 transition-all shadow-[2px_2px_0_0_rgba(18,18,18,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              Launch Demo Mode
            </button>
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-accent hover:bg-accent-dark text-white font-black uppercase tracking-wider text-xs px-6 py-2.5 transition-all shadow-[2px_2px_0_0_rgba(18,18,18,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              Open App →
            </button>
          </div>

          <div className="w-full border-2 border-primary bg-white p-4 shadow-[4px_4px_0_0_rgba(18,18,18,1)] flex flex-col gap-3 font-mono text-[11px] text-left">
            <div className="flex justify-between items-center text-neutral-400 border-b border-primary pb-2 font-bold uppercase">
              <span>Steps To Follow</span>
              <span>Demo Mode Simulation</span>
            </div>
            <ol className="list-decimal list-inside flex flex-col gap-2 text-neutral-700 font-bold uppercase tracking-wide">
              <li>Open the app and launch <span className="bg-neutral-100 px-1.5 py-0.5 border border-primary font-black">Demo Mode</span> if your wallet is new.</li>
              <li>Select a transaction from the list (e.g. 0.5 MON transfer).</li>
              <li>Pick a category (Investment, Income, Business, etc.) and write a brief note.</li>
              <li>Click Save to confirm onchain.</li>
              <li>Click the Export CSV button to download your tax-ready Excel sheet.</li>
            </ol>
          </div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">
            Consolidated Expense Ledger natively built for Ethereum, Base, and Monad.
          </span>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="bg-accent text-white py-20 lg:py-28 text-center flex flex-col items-center justify-center px-6 border-b-2 border-primary">
        <div className="max-w-2xl flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tighter leading-[1.1]">
            Get your onchain finances organized.
          </h2>
          <p className="text-sm text-purple-200 font-medium uppercase tracking-wider">
            Tag transactions. Export for taxes. One app, all chains.
          </p>
          <div className="mt-4">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-white hover:bg-purple-50 text-accent font-black uppercase tracking-wider text-xs px-8 py-3.5 transition-all shadow-[4px_4px_0_0_rgba(18,18,18,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0_0_rgba(18,18,18,1)] border-2 border-primary"
            >
              Open Gas Receipts →
            </button>
          </div>
          <span className="text-[10px] text-purple-300 font-black tracking-widest uppercase mt-4">
            Free. No email required.
          </span>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t-2 border-primary">
        <div className="max-w-[600px] mx-auto py-12 flex items-center justify-center gap-12">
          <button
            onClick={() => onNavigate('/docs')}
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-primary transition-colors duration-150"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-primary transition-colors duration-150">
              Docs
            </span>
          </button>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-primary transition-colors duration-150"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-primary transition-colors duration-150">
              X
            </span>
          </a>
          <a
            href="https://github.com/syther069/Monreceipt-"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-primary transition-colors duration-150"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-primary transition-colors duration-150">
              GitHub
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
