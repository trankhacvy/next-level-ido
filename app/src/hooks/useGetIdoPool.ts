import useSWR from 'swr'
import { AnchorProvider } from '@project-serum/anchor'
import AppProgram from "libs/program"
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useAnchorProvider } from './useProvider'

export const useGetIDOPool = (poolName: string, provider: AnchorProvider) => {
    const { data, isValidating: isLoading, mutate } = useSWR(['pool', poolName] , async() => {
        try {
            const program = new AppProgram(provider);
            const pool = await program.getPoolInfo(poolName);
            return pool
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, {
        revalidateOnFocus: false
    })
    console.log('[useGetIDOPool]', data)
    return {
        pool: data,
        isLoading,
        mutate
    }
}

export const useGetUserIDO = () => {
    const { publicKey } = useWallet()
    const provider = useAnchorProvider();

    const { data, isValidating: isLoading, mutate } = useSWR(publicKey ? ['ido-user', publicKey?.toBase58()] : null , async() => {
        try {
            const program = new AppProgram(provider);
            const userIdoAccount = await program.getUserIDOAccount(publicKey as PublicKey);

            return userIdoAccount
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, {
        revalidateOnFocus: false
    })
    console.log('[useGetUserIDO]', data)
    return {
        userIdoAccount: data,
        isLoading,
        mutate
    }
}