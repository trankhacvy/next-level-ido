import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const getEndpoint = () => {
  const network = process.env.NEXT_PUBLIC_NETWORK as string;
  switch (network) {
    case "mainnet":
      return clusterApiUrl(WalletAdapterNetwork.Mainnet);
    case "testnet":
      return clusterApiUrl(WalletAdapterNetwork.Testnet);
    case "devnet":
      return clusterApiUrl(WalletAdapterNetwork.Devnet);
    default:
      return "http://localhost:8899";
  }
};

export const getNetwork = () => {
    const network = process.env.NEXT_PUBLIC_NETWORK as string;
    switch (network) {
      case "mainnet":
        return WalletAdapterNetwork.Mainnet;
      case "testnet":
        return WalletAdapterNetwork.Testnet;
      case "devnet":
        return WalletAdapterNetwork.Devnet;
      default:
        return "http://localhost:8899";
    }
  };