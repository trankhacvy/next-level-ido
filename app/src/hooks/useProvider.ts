import { AnchorProvider } from "@project-serum/anchor";
import { useMemo } from 'react'
import { useAnchorWallet, useConnection, AnchorWallet } from '@solana/wallet-adapter-react'

export function useAnchorProvider() {
    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();

    const anchorProvider = useMemo(() => {
        return new AnchorProvider(
            connection,
            anchorWallet as AnchorWallet,
            AnchorProvider.defaultOptions()
          );
    }, [connection, anchorWallet])

    return anchorProvider;
}