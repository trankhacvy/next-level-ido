import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getAccount, createAssociatedTokenAccount } from '@solana/spl-token';


export const handleAirdrop = async (provider: Provider, account: web3.PublicKey, amount: number = web3.LAMPORTS_PER_SOL) => {
    const airdropSignature = await provider.connection.requestAirdrop(account, amount);
    await provider.connection.confirmTransaction(airdropSignature);    
}

export const createUserAndTokenAccount = async (
    provider: Provider,
    mint: web3.PublicKey,
    mintAuth: web3.Keypair,
    mintX: web3.PublicKey
) => {
    const user = web3.Keypair.generate();
    let userTokenPubkey;
    let userTokenXPubkey;
    await handleAirdrop(provider, user.publicKey);

    try {
         userTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user,
            mint,
            user.publicKey,
          );
    
         userTokenXPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user,
            mintX,
            user.publicKey,
          );
    
        await mintTo(
            provider.connection,
            user,
            mint,
            userTokenPubkey,
            mintAuth,
            1000000,
          );   
    } catch (error) {
        console.error(error)
    }

    return {user, userTokenPubkey, userTokenXPubkey }  
}

// export const createUserTokenAccount = (
//     provider: Provider,
//     mint: web3.PublicKey
// ) => {
//     const user = web3.Keypair.generate();
//     let user1WalletTokenPubkey : web3.PublicKey;
// }