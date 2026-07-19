# MonTally

MonTally is a utilitarian, cross-chain expense tagger. It fetches your onchain transactions from Ethereum, Base, and Monad, allows you to categorize and add notes to them, and saves those metadata tags **directly onchain** using Monad as a high-speed, ultra-cheap data availability layer.

You can organize your accounting ledger and export clean, tax-ready CSV files in seconds.

- **Vercel Frontend:** [https://gas-receipts.vercel.app](https://gas-receipts.vercel.app)
- **TagRegistry Contract (Monad Testnet):** `0xCA79519f744dC0DAaCcAA88e85E8E85FfbE838C3`

---

## Why Built? (The Problem & Value Prop)

* **The Problem:** During tax season, accounting is a nightmare. Wallet histories (Etherscan, BaseScan) show addresses and values, but they have zero context. If you want to categorize transactions for your accountant, you are forced to copy hashes into private spreadsheets, take screenshots, or write manual notes that eventually get lost.
* **The Gas Dilemma:** Storing expense tags on Ethereum or Base costs too much ($1 to $5 in gas fees per transaction tag). No one is going to pay L1/L2 gas just to write a note like *"Tax writeoff - SaaS subscription"*.
* **The Solution:** MonTally uses **Monad** as a unified metadata storage registry. Because Monad fees are sub-penny (less than `$0.001` per write), you can store permanent, censorship-resistant notes onchain for your entire multichain activity at virtually zero cost. 

---

## System Architecture

```
                 +-------------------+
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
  +------------------+          +------------------+
```

1. **Transaction Retrieval:** The frontend queries public Block Explorer APIs (BaseScan, MonadScan) to pull your raw transaction histories into a single ledger.
2. **RPC Fallback:** If the Explorer APIs prune old transactions, MonReceipt falls back to querying the JSON-RPC nodes directly.
3. **Onchain Tag Storage:** When you save a tag, it calls the `TagRegistry` contract on Monad. The contract stores the original transaction hash, the chain ID, the category (e.g. *swap*, *business_expense*), and a custom note.
4. **CSV Export:** The frontend merges the raw transaction history with your onchain tags and compiles a clean, standardized CSV ledger.

---

## Contract Implementation (`TagRegistry.sol`)

The smart contract is written in Solidity and deployed on Monad. It maps transaction hashes to custom tags:

```solidity
// SPDX-License-Identifier: MIT
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

    // Owner address mapping to their tagged transaction hashes
    mapping(address => mapping(string => Tag)) private userTags;
    // Track tagged transaction hashes list per user
    mapping(address => string[]) private userTxHashes;

    event TagAdded(address indexed user, string txHash, uint256 chainId, string category, string note);
    event TagUpdated(address indexed user, string txHash, uint256 chainId, string category, string note);

    function addTag(string calldata _txHash, uint256 _chainId, string calldata _category, string calldata _note) external {
        require(!userTags[msg.sender][_txHash].exists, "Tag already exists");
        
        userTags[msg.sender][_txHash] = Tag({
            txHash: _txHash,
            chainId: _chainId,
            category: _category,
            note: _note,
            timestamp: block.timestamp,
            exists: true
        });
        
        userTxHashes[msg.sender].push(_txHash);
        emit TagAdded(msg.sender, _txHash, _chainId, _category, _note);
    }

    function updateTag(string calldata _txHash, uint256 _chainId, string calldata _category, string calldata _note) external {
        require(userTags[msg.sender][_txHash].exists, "Tag does not exist");
        
        Tag storage tag = userTags[msg.sender][_txHash];
        tag.category = _category;
        tag.note = _note;
        tag.timestamp = block.timestamp;
        tag.chainId = _chainId;
        
        emit TagUpdated(msg.sender, _txHash, _chainId, _category, _note);
    }

    function getTag(address _user, string calldata _txHash) external view returns (Tag memory) {
        return userTags[_user][_txHash];
    }

    function getUserTags(address _user) external view returns (Tag[] memory) {
        string[] memory hashes = userTxHashes[_user];
        Tag[] memory tags = new Tag[](hashes.length);
        for (uint256 i = 0; i < hashes.length; i++) {
            tags[i] = userTags[_user][hashes[i]];
        }
        return tags;
    }
}
```

---

## Local Setup

### 1. Smart Contract Development (`/contracts`)

Requires Hardhat and Node.js.

```bash
cd contracts
npm install
```

* **Configure Environment:** Create a `.env` file inside `/contracts` and specify your private key:
  ```env
  MAINNET_PRIVATE_KEY="0x_your_private_key_here"
  ```
* **Compile Contracts:**
  ```bash
  npx hardhat compile
  ```
* **Deploy to Monad:**
  ```bash
  npx hardhat run scripts/deploy.ts --network monadMainnet
  ```

---

### 2. Frontend Application (`/frontend`)

Requires Node.js (v18+) and npm.

```bash
cd frontend
npm install
```

* **Configure Environment:** Create a `.env` file inside `/frontend`:
  ```env
  VITE_CONTRACT_ADDRESS="0xCA79519f744dC0DAaCcAA88e85E8E85FfbE838C3"
  ```
* **Run in Development:**
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.
* **Build Production Bundle:**
  ```bash
  npm run build
  ```

---

## User Interface & Features

* **Manual Fallback Accordion:** If block explorer APIs fail to record a brand-new transaction hash, you can paste the hash directly into the collapsible `[▶ Manual Tx Fallback]` input to fetch it straight from the JSON-RPC node.
* **Smart Row Indicators:** Green arrows (`←`) show incoming funds, black arrows (`→`) show outgoing, and gray double-arrows (`↔`) represent self-sends or contract creation.
* **Staggered Animations:** Row entries animate dynamically on load within 150ms.
* **Interactive Dropdowns:** Category selection staggers item entries with 15ms delay cascades.
* **Accurate Wallet Identification:** The address column replaces your active address with a bold **"You"** indicator, and reveals copy/explorer options on hover.
