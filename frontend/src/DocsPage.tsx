

interface DocsPageProps {
  onNavigate: (path: string) => void;
}

export function DocsPage({ onNavigate }: DocsPageProps) {
  return (
    <div className="min-h-screen bg-white text-[#0D0D0D] font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span 
            onClick={() => onNavigate('/')}
            className="font-bold tracking-tighter text-sm uppercase border-2 border-[#0D0D0D] px-2 py-0.5 bg-white cursor-pointer"
          >
            GAS RECEIPTS
          </span>
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">
            DOCUMENTATION
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <button 
            onClick={() => onNavigate('/')}
            className="text-[#6B7280] hover:text-[#0D0D0D] transition-colors"
          >
            ← Back to Home
          </button>
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col gap-10">
        <div className="border-b-2 border-[#0D0D0D] pb-6 flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">[DOCUMENTATION]</span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-[#0D0D0D]">MonReceipt Technical Docs</h1>
          <p className="text-lg text-[#6B7280]">How transaction tracking, metadata registry, and low-cost onchain ledger works.</p>
        </div>

        {/* 1. WHY BUILT */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold uppercase text-[#0D0D0D] border-b border-[#E5E7EB] pb-2">1. Why MonReceipt?</h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            Tax compliance for onchain activities is broken. Explorer platforms show raw balances, but fail to capture the intent. Storing descriptions and classifications directly on Ethereum or Base can cost $1.00 to $5.00 per registry write due to gas volatility.
          </p>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            MonReceipt treats **Monad** as a high-speed, cheap metadata registry. You retrieve transaction history lists from any chain (Base, Monad) and tag them for less than <span className="font-bold text-[#0D0D0D]">$0.001</span> per transaction write, storing your accountant spreadsheets permanently onchain.
          </p>
        </section>

        {/* 2. SYSTEM ARCHITECTURE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold uppercase text-[#0D0D0D] border-b border-[#E5E7EB] pb-2">2. Architecture</h2>
          <div className="border-2 border-[#0D0D0D] bg-[#FAFAFA] p-6 font-mono text-xs text-[#6B7280] overflow-x-auto">
            <pre>{`               +-------------------+
               |   React Frontend  |
               +---------+---------+
                         |
          +--------------+--------------+
          |                             |
          v                             v
+------------------+          +------------------+
|  Etherscan/Base  |          |  Monad contract  |
|  API History     |          |  (TagRegistry)   |
|                  |          |                  |
| Fetch tx lists   |          | Store/Read tags  |
| (L1 / L2 history)|          | (Metadata tags)  |
+------------------+          +------------------+`}</pre>
          </div>
          <ul className="list-disc list-inside text-sm text-[#6B7280] flex flex-col gap-2">
            <li><span className="font-bold text-[#0D0D0D]">Frontend:</span> Connects via Wagmi/RainbowKit. Polls transaction histories from block explorer APIs.</li>
            <li><span className="font-bold text-[#0D0D0D]">Explorer Fallbacks:</span> If explorers prune or lag, queries JSON-RPC directly to resolve hashes.</li>
            <li><span className="font-bold text-[#0D0D0D]">TagRegistry contract:</span> Stored on Monad. Maps your addresses to transaction hashes with labels and notes.</li>
          </ul>
        </section>

        {/* 3. SOLIDITY REGISTRY CONTRACT */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold uppercase text-[#0D0D0D] border-b border-[#E5E7EB] pb-2">3. TagRegistry Contract</h2>
          <p className="text-sm text-[#6B7280]">
            The Solidity smart contract deployed on Monad records metadata index structures mapping user addresses to hashes.
          </p>
          <div className="border border-[#E5E7EB] bg-[#FAFAFA] p-4 font-mono text-xs overflow-x-auto text-[#6B7280] max-h-96">
            <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TagRegistry {
    struct Tag {
        string txHash;
        uint256 chainId;
        string category;
        string note;
        uint256 timestamp;
        bool exists;
    }

    mapping(address => mapping(string => Tag)) private userTags;
    mapping(address => string[]) private userTxHashes;

    function addTag(string calldata _txHash, uint256 _chainId, string calldata _category, string calldata _note) external {
        require(!userTags[msg.sender][_txHash].exists, "Tag exists");
        userTags[msg.sender][_txHash] = Tag({
            txHash: _txHash,
            chainId: _chainId,
            category: _category,
            note: _note,
            timestamp: block.timestamp,
            exists: true
        });
        userTxHashes[msg.sender].push(_txHash);
    }

    function updateTag(string calldata _txHash, uint256 _chainId, string calldata _category, string calldata _note) external {
        require(userTags[msg.sender][_txHash].exists, "Tag does not exist");
        Tag storage tag = userTags[msg.sender][_txHash];
        tag.category = _category;
        tag.note = _note;
        tag.timestamp = block.timestamp;
        tag.chainId = _chainId;
    }

    function getTag(address _user, string calldata _txHash) external view returns (Tag memory) {
        return userTags[_user][_txHash];
    }
}`}</pre>
          </div>
        </section>

        {/* 4. SETUP DIRECTIONS */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold uppercase text-[#0D0D0D] border-b border-[#E5E7EB] pb-2">4. Build & Local Run</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-sm text-[#0D0D0D] uppercase mb-1">Contract Deployment</h3>
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-3 font-mono text-xs text-[#6B7280]">
                <p>cd contracts</p>
                <p>npm install</p>
                <p>npx hardhat run scripts/deploy.ts --network monadMainnet</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D0D0D] uppercase mb-1">Vite Frontend Setup</h3>
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-3 font-mono text-xs text-[#6B7280]">
                <p>cd frontend</p>
                <p>npm install</p>
                <p># Edit .env file and set VITE_CONTRACT_ADDRESS</p>
                <p>npm run dev</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#E5E7EB] mt-12">
        <div className="max-w-[600px] mx-auto py-12 flex items-center justify-center gap-12">
          <button
            onClick={() => onNavigate('/docs')}
            className="flex flex-col items-center gap-2 text-[#0D0D0D] font-bold"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              Docs
            </span>
          </button>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] group-hover:text-[#6B7280] transition-colors duration-150">
              X
            </span>
          </a>
          <a
            href="https://github.com/syther069/Monreceipt-"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] group-hover:text-[#6B7280] transition-colors duration-150">
              GitHub
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
