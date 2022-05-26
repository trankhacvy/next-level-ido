import useSWR from "swr";
import AppProgram from "libs/program";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useAnchorProvider } from "./useProvider";
import { useCallback, useMemo } from "react";
import { StakeTier } from "types/common";
import { getTierWeight } from "utils/tiers";
import { bnDivDecimals } from "utils/number";

export const useGetIDOPool = (poolName: string) => {
  const provider = useAnchorProvider();
  const { data, error, mutate } = useSWR(
    ["pool", poolName],
    async () => {
      try {
        const program = new AppProgram(provider);
        const pool = await program.getPoolInfo(poolName);
        return pool;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getClaimableToken = useCallback(
    (tier: StakeTier) => {
      if (!data) return 0;
      const currentWeight = data.currentWeight;
      const totalToken = bnDivDecimals(data.idoTokenAmount).toNumber();

      const userWeight = getTierWeight(tier);
      return (totalToken * userWeight) / currentWeight;
    },
    [data]
  );

  return {
    pool: data,
    isLoading: !error && !data,
    getClaimableToken,
    mutate,
  };
};

export const useGetUserIDO = () => {
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();

  const { data, error, mutate } = useSWR(
    publicKey ? ["ido-user", publicKey?.toBase58()] : null,
    async () => {
      try {
        const program = new AppProgram(provider);
        const userIdoAccount = await program.getUserIDOAccount(
          publicKey as PublicKey
        );

        return userIdoAccount;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    userIdoAccount: data,
    isLoading: !error && !data,
    mutate,
  };
};

export const useGetStakeUser = () => {
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();

  const { data, error, mutate } = useSWR(
    publicKey ? ["stake-user", publicKey?.toBase58()] : null,
    async () => {
      try {
        const program = new AppProgram(provider);
        const userAccount = await program.getStakeUser(publicKey as PublicKey);

        return userAccount;
      } catch (error) {
        // console.error(error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
    }
  );
  const tier = useMemo(() => Object.keys(data?.tier ?? {})[0], [data]);

  const isWhitelist = useMemo(() => tier && tier !== "noTier", [tier]);

  return {
    stakeUserAccount: data,
    isWhitelist,
    tier,
    isLoading: !error && !data,
    mutate,
  };
};
