import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getAccount, createAssociatedTokenAccount } from '@solana/spl-token';


export const handleAirdrop = async (provider: Provider, account: web3.PublicKey, amount: number = web3.LAMPORTS_PER_SOL) => {
    const airdropSignature = await provider.connection.requestAirdrop(account, amount);
    await provider.connection.confirmTransaction(airdropSignature);    
}