# MonReceipts

Your onchain transactions, organized. A clean, utilitarian dApp that acts as a unified ledger to fetch, track, and tag transactions across multiple networks (Ethereum, Base, Polygon, and Monad), powered by the Monad Mainnet for zero-cost, lightning-fast data availability.

## The Problem & Value Proposition
> **Personal Story:** I was literally screenshotting Etherscan to match gas fees and contract interactions for my spreadsheet during tax season. Crypto is onchain, but tax compliance is stuck in the dark ages. I wanted to tag my Ethereum and Base transactions natively onchain, but gas is too expensive ($2-$5 per tag).

### ARCHITECTURE: The Cross-Chain Data Availability Layer
To solve the high cost of tagging transactions on L1 and L2s, **MonReceipts uses Monad as a high-speed, ultra-low-cost data availability layer for cross-chain activity!**

- **Unified Fetching**: Transactions are fetched concurrently from native chain APIs (Ethereum, Base, Polygon, Monad) using Etherscan V2.
- **Unified Tagging**: ALL tags (regardless of where the original transaction occurred) are stored **exclusively** on the Monad Mainnet smart contract.
- **Why?** Ethereum gas = $2-5 per tag. Monad gas = < $0.001 per tag.
- **Result**: Cross-chain expense tracking and organization at 1/1000th the cost, anchored immutably on a decentralized network. The UI explicitly maps your tag back to the correct chain via the `chainId` stored in the contract.

## Live Information
- **Live Demo (Vercel):** [https://gas-receipts.vercel.app](https://gas-receipts.vercel.app)
- **TagRegistry Contract Address (Monad Mainnet):** `0xCA79519f744dC0DAaCcAA88e85E8E85FfbE838C3`
- **60-Second Demo Video:** [Link to Demo Video](https://youtube.com/shorts/placeholder-demo-video) (includes wallet connect, manual resolution, tagging, and CSV export)

---

## Screenshot
![Gas Receipts Dashboard](c:/MonReceipts/frontend/src/assets/hero.png)

---

## How to Run Locally

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn
- An Etherscan API Key (free from [etherscan.io](https://etherscan.io) to retrieve transaction lists via Etherscan V2 Multichain API)

### 2. Clone the Repository
```bash
git clone <repository-url> gas-receipts
cd gas-receipts
```

### 3. Setup and Deploy Contracts (Optional)
If you wish to deploy your own registry contract:
```bash
cd contracts
npm install
```
Create a `.env` file in the `contracts` folder:
```env
MAINNET_PRIVATE_KEY="your_private_key_here"
```
Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network monadMainnet
```

### 4. Setup and Run Frontend
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_CONTRACT_ADDRESS="0xCA79519f744dC0DAaCcAA88e85E8E85FfbE838C3"
VITE_ETHERSCAN_API_KEY="your_etherscan_api_key_here"
```
Start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.
