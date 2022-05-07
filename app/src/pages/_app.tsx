import "../styles/global.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo } from "react";
import { AppProps } from "next/app";
import Header from "components/Header";
import Footer from "components/Footer";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default MyApp;
