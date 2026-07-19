import type { Chain } from 'viem';

export const monadMainnet: Chain = {
  id: 143, // Monad Mainnet Chain ID
  name: 'Monad Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.monad.xyz'],
    },
    public: {
      http: ['https://rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MonadScan',
      url: 'https://explorer.monad.xyz',
    },
  },
  testnet: false,
};
