import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/global.css";
import { useMemo, useEffect } from "react";
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
  // GlowWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  // SolflareWalletAdapter,
  // TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import { BalanceContextProvider } from "context/balanceContext";
import AppProgram from "libs/program";
import { useAnchorProvider } from "hooks/useProvider";
import { getEndpoint } from "utils/network";

dayjs.extend(utc);
dayjs.extend(isBetween);

const network = WalletAdapterNetwork.Devnet;

function Wrapper({ children }: any) {
  const provider = useAnchorProvider();
  useEffect(() => {
    const program = new AppProgram(provider);

    const listener = program.program.addEventListener("Log", (event) => {
      console.log("event", event);
    });

    return () => {
      program.program.removeEventListener(listener);
    };
  }, []);

  return <>{children}</>;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // @ts-ignore
      // new SolflareWalletAdapter({ network: "localhost" }),
      // new GlowWalletAdapter(),
      // new SlopeWalletAdapter(),
      // new TorusWalletAdapter(),
    ],
    [network]
  );
  
  return (
    <ConnectionProvider endpoint={getEndpoint()}>
      <WalletProvider wallets={wallets} autoConnect>
        <BalanceContextProvider>
          <WalletModalProvider>
            <Wrapper>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Wrapper>
          </WalletModalProvider>
        </BalanceContextProvider>
      </WalletProvider>
      <Toaster />
    </ConnectionProvider>
  );
};

export default MyApp;
