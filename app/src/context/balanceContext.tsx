import { BN } from "@project-serum/anchor";
import { ARI_MINT_TOKEN, X_ARI_MINT_TOKEN } from "common/token";
import { useTokenBalance } from "hooks/useGetBalance";
import { useCallback } from "react";
import createContext from "utils/createContext";

export interface BalanceContextValues {
  ariBalance: BN;
  xAriBalance: BN;
  refetchBalance: () => void;
}

const [Provider, useBalanceContext] = createContext<BalanceContextValues>();

export const BalanceContextProvider: React.FC<any> = ({ children }) => {
  const { balance: ariBalance, mutate: refetchAriBalance } =
    useTokenBalance(ARI_MINT_TOKEN);
  const { balance: xAriBalance, mutate: refetchXAriBalance } =
    useTokenBalance(X_ARI_MINT_TOKEN);

  const refetchBalance = useCallback(async () => {
    console.log("refetchBalance");
    await refetchAriBalance();
    await refetchXAriBalance();
  }, [refetchAriBalance, refetchXAriBalance]);

  return (
    <Provider
      value={{
        ariBalance,
        xAriBalance,
        refetchBalance,
      }}
    >
      {children}
    </Provider>
  );
};

export { useBalanceContext };
