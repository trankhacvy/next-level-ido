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
// import { clusterApiUrl } from "@solana/web3.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import { BalanceContextProvider } from "context/balanceContext";

dayjs.extend(utc);
dayjs.extend(isBetween);

const network = WalletAdapterNetwork.Devnet;
const endpoint = "http://localhost:8899"; //clusterApiUrl(network);

// function GlobalHooks() {
//   useTokenBalance(ARI_MINT_TOKEN);
//   useTokenBalance(X_ARI_MINT_TOKEN);
//   return null;
// }

const MyApp = ({ Component, pageProps }: AppProps) => {
  const wallets = useMemo(
    () => [
      // @ts-ignore
      new SolflareWalletAdapter({ network: "localhost" }),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BalanceContextProvider>
          <WalletModalProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </WalletModalProvider>
        </BalanceContextProvider>
      </WalletProvider>
      <Toaster />
    </ConnectionProvider>
  );
};

export default MyApp;
