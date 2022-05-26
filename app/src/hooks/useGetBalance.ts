import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { BN } from "@project-serum/anchor";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { ARI_DECIMALS } from "common/constants";

export const useTokenBalance = (mintAddress: string) => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const {
    data,
    isValidating: isLoading,
    mutate,
  } = useSWR(connected ? ["balance", mintAddress] : null, async () => {
    try {
      const tokenMint = new PublicKey(mintAddress);
      const ataAddress = await getAssociatedTokenAddress(
        tokenMint,
        publicKey as PublicKey
      );
      const tokenAccount = await getAccount(connection, ataAddress);
      if (tokenAccount) {
        return new BN(tokenAccount.amount.toString()).div(
          new BN(10 ** ARI_DECIMALS)
        );
      }
      return new BN(0);
    } catch (error) {
      throw error;
    }
  });

  return {
    balance: BN.isBN(data) ? data : new BN(0),
    balanceNumber: BN.isBN(data) ? data.toNumber() : 0,
    isLoading,
    mutate,
  };
};

export const useGetATAToken = (mintAddress: string) => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();

  const {
    data,
    isValidating: isLoading,
    mutate,
  } = useSWR(connected ? ["token", mintAddress] : null, async () => {
    try {
      const tokenMint = new PublicKey(mintAddress);
      const ataAddress = await getAssociatedTokenAddress(
        tokenMint,
        publicKey as PublicKey
      );
      const tokenAccount = await getAccount(connection, ataAddress);
      return tokenAccount;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  });

  return {
    token: data,
    isLoading,
    mutate,
  };
};
