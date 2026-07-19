

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-[#0D0D0D] font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tighter text-sm uppercase border-2 border-[#0D0D0D] px-2 py-0.5 bg-white">
            GAS RECEIPTS
          </span>
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold hidden md:inline">
            MONRECEIPT · CROSS-CHAIN EXPENSE TRACKER
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <a href="#how-it-works" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">How It Works</a>
          <a href="#features" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Features</a>
          <button 
            onClick={() => onNavigate('/app')}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none border border-[#0D0D0D] font-bold"
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
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
            [ONCHAIN EXPENSE TRACKING]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-[#0D0D0D]">
            Stop screenshotting Etherscan for your accountant.
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] max-w-xl font-normal leading-relaxed">
            Tag transactions across Ethereum, Base, and Monad. Store metadata onchain cheaply. Export clean, formatted tax-ready CSVs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-8 py-3 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none border-2 border-[#0D0D0D] text-center"
            >
              Open App →
            </button>
            <a 
              href="#demo"
              className="bg-white hover:bg-neutral-50 text-[#0D0D0D] font-bold px-8 py-3 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none border-2 border-[#0D0D0D] text-center"
            >
              View Demo
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#6B7280] font-medium mt-4">
            <span className="text-blue-600">●</span> Free 
            <span className="text-neutral-300">|</span> No signup 
            <span className="text-neutral-300">|</span> Onchain forever
          </div>
        </div>

        {/* Hero Interactive App Mockup Component */}
        <div className="flex-1 w-full max-w-lg border-2 border-[#0D0D0D] bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-4 flex flex-col gap-4 font-mono text-[11px]">
          <div className="bg-[#0D0D0D] text-white p-2 flex justify-between items-center">
            <span className="font-bold">TRANSACTION LEDGER</span>
            <span className="bg-green-600 text-white px-1.5 text-[9px] font-bold">LIVE METADATA</span>
          </div>
          
          <div className="border border-[#E5E7EB] p-2 bg-[#FAFAFA] flex flex-col gap-2">
            <div className="flex justify-between font-bold text-neutral-500 border-b border-[#E5E7EB] pb-1">
              <span>TX HASH</span>
              <span>VALUE</span>
              <span>CATEGORY</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-blue-600">0x3f5c...7a1d</span>
              <span className="font-bold">→ 1.50 MON</span>
              <span className="bg-yellow-100 text-yellow-800 px-1 border border-yellow-300">📈 Investment</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-blue-600">0x8a9b...4e2f</span>
              <span className="font-bold">← 0.35 BASE</span>
              <span className="bg-green-100 text-green-800 px-1 border border-green-300">💰 Income</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-blue-600">0x9c4d...8b9c</span>
              <span className="font-bold">→ 0.08 MON</span>
              <span className="bg-red-100 text-red-800 px-1 border border-red-300">💼 Business</span>
            </div>
          </div>

          <div className="border border-dashed border-blue-400 p-3 bg-blue-50/50 flex flex-col gap-1.5">
            <span className="font-bold text-blue-800">✍️ METADATA RESOLVED ONCHAIN</span>
            <div className="flex justify-between text-neutral-600">
              <span>Category: Swap</span>
              <span>Note: Tax year '26 tag</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section id="problem" className="bg-[#FAFAFA] border-y border-[#E5E7EB] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-left flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">[THE PROBLEM]</span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0D0D0D]">
              Tax season shouldn't require a blockchain explorer.
            </h2>
          </div>
          <p className="text-lg text-[#6B7280] max-w-3xl leading-relaxed">
            Every swap, stake, and transfer is a taxable event. But your wallet doesn't remember why you made them. So you spend hours tracing transactions, guessing categories, and hoping your accountant understands DeFi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-2xl">📊</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Scattered Data</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Transactions spread across multiple chains, gas-receipt protocols, wallets, and smart contracts.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-2xl">🔍</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">No Context</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Explorers show you the what, who, and when, but they never capture the "why" of the transaction.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-2xl">⚙️</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Manual Work</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">[HOW IT WORKS]</span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0D0D0D]">
              Three steps to organized onchain finances.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 relative">
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-black text-[#2563EB]">01</div>
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6 flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Connect Wallet</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Securely link your address to automatically load transaction histories from Base and Monad.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-3xl font-black text-[#2563EB]">02</div>
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6 flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Tag Transaction</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Choose category, add optional notes, and store expense tags onchain permanently.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-3xl font-black text-[#2563EB]">03</div>
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6 flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Export Clean CSV</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Download structured spreadsheets with all tags and context to hand off to your accountant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section id="features" className="bg-[#FAFAFA] border-y border-[#E5E7EB] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-left flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">[FEATURES]</span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0D0D0D]">
              Everything you need. Nothing you don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-xl">⛓️</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Onchain Metadata</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Your categorizations and notes are saved directly to the Monad smart contract ledger. Permanent, secure, and censorship-resistant.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-xl">🤖</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Auto-Detect Types</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Swaps, standard transfers, and contract calls are identified automatically to save you time categorizing them manually.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-xl">📋</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">CSV Export</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Generate accountant-ready financial ledger tables with a single click. No manual formatting or re-arranging rows.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col gap-3">
              <div className="text-xl">✏️</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Edit Anytime</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Made a mistake? Easily update tags and re-submit. The contract automatically resolves and displays your latest tags.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 md:col-span-2 flex flex-col gap-3">
              <div className="text-xl">🌐</div>
              <h3 className="font-bold text-base uppercase text-[#0D0D0D]">Cross-Chain Ledger</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">[SEE IT IN ACTION]</span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0D0D0D]">
              Tag a real transaction in seconds.
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-6 py-2 transition-all border border-[#0D0D0D] shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              Launch Demo Mode
            </button>
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-white hover:bg-neutral-50 text-[#0D0D0D] border border-[#E5E7EB] font-bold px-6 py-2 transition-all"
            >
              Open App →
            </button>
          </div>

          <div className="w-full border-2 border-[#0D0D0D] bg-neutral-100 p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-3 font-mono text-[11px] text-left">
            <div className="flex justify-between items-center text-[#6B7280] border-b border-[#E5E7EB] pb-2">
              <span>STEPS TO FOLLOW</span>
              <span>DEMO MODE SIMULATION</span>
            </div>
            <ol className="list-decimal list-inside flex flex-col gap-2 text-neutral-700 font-medium">
              <li>Open the app and launch <span className="bg-amber-100 text-amber-800 px-1 font-semibold">Demo Mode</span> if your wallet is new.</li>
              <li>Select a transaction from the list (e.g. 0.5 MON transfer).</li>
              <li>Pick a category (Investment, Income, Business, etc.) and write a brief note.</li>
              <li>Click <span className="font-bold">Save</span> to confirm onchain.</li>
              <li>Click the <span className="font-bold">Export CSV</span> button to download your tax-ready Excel sheet.</li>
            </ol>
          </div>
          <span className="text-xs text-[#6B7280]">
            Consolidated Expense Ledger natively built for Ethereum, Base, and Monad.
          </span>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="bg-[#0D0D0D] text-white py-20 lg:py-28 text-center flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
            Get your onchain finances organized.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Tag transactions. Export for taxes. One app, all chains.
          </p>
          <div className="mt-4">
            <button 
              onClick={() => onNavigate('/app')}
              className="bg-white hover:bg-neutral-100 text-[#0D0D0D] font-bold px-8 py-3 transition-all border border-white hover:border-neutral-100 text-sm shadow-[4px_4px_0_0_rgba(255,255,255,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
            >
              Open Gas Receipts →
            </button>
          </div>
          <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase mt-4">
            Free. No email required.
          </span>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#E5E7EB] py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="flex flex-col gap-3">
            <span className="font-bold tracking-tighter text-sm uppercase border border-[#0D0D0D] px-2 py-0.5 bg-white w-max">
              GAS RECEIPTS
            </span>
            <p className="text-xs text-[#6B7280]">Onchain expense tagging built for developers and accountant exports.</p>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#0D0D0D] uppercase tracking-wider mb-1">Product</span>
            <a href="#features" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Features</a>
            <a href="#demo" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Pricing (Free)</a>
            <a href="/app" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Launch App</a>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#0D0D0D] uppercase tracking-wider mb-1">Resources</span>
            <a href="#how-it-works" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Docs</a>
            <a href="https://github.com/syther069/Monreceipt-" target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">GitHub</a>
            <a href="/app" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Contract</a>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#0D0D0D] uppercase tracking-wider mb-1">Social</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Twitter</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Discord</a>
            <a href="https://monad.xyz" target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors">Monad</a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto border-t border-[#E5E7EB] mt-8 pt-6 text-left">
          <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">
            Built for the BuildAnything Hackathon. Powered by Monad.
          </span>
        </div>
      </footer>
    </div>
  );
}
