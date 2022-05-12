import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/global.css";
import { useMemo } from "react";
import { AppProps } from "next/app";
import Header from "components/Header";
import Footer from "components/Footer";
import { Toaster } from "components/Toast";
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
      <Toaster />
    </ConnectionProvider>
  );
};
console.log("NEXT_PUBLIC_MINT_TOKEN", process.env.NEXT_PUBLIC_MINT_TOKEN);
export default MyApp;
