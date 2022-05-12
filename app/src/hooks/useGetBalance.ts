import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from '@solana/web3.js'
import useSWR from 'swr'
import { BN } from '@project-serum/anchor'
import { getAccount } from '@solana/spl-token'

export const useTokenBalance = (mintAddress: string) => {
    const { connected, publicKey } = useWallet();
    const { connection } = useConnection();
    const { data, isValidating: isLoading, mutate } = useSWR(connected ? mintAddress : null , async() => {
        try {
            const tokenMint = new PublicKey(mintAddress)
            const { value } = await connection.getParsedTokenAccountsByOwner(
                publicKey as PublicKey,
                {
                    mint: tokenMint
                }
            );
            if(value && Array.isArray(value) && value.length > 0) {
                const pubkey = value[0]?.pubkey;
                if(pubkey) {
                    const tokenAccount = await getAccount(connection, pubkey);
                    const amount = tokenAccount.amount;
                    return new BN(amount.toString()).div(new BN(10**9));
                }
            } 
            return new BN(0);
        } catch (error) {
            throw error;
        }
    })

    return {
        balance: BN.isBN(data) ? data : new BN(0),
        isLoading,
        mutate
    }
}
