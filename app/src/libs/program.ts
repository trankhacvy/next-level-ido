import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './token'
import idl from '../config/idl.json'
import { NextLevelIdoPlatform } from 'types/program'
import { ARIPublicKey, usdcPublicKey, xARIPublicKey } from 'common/token';
import { ARI_DECIMALS } from 'common/constants';
import { getAriTokenVault, getIDOUserPDA, getPoolPDA, getRedeemableMintPDA, getUSDCVaultPDA, getUserPDA, getUserRedeemablePDA } from 'utils/solana';

const PROGRAM_KEY = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID as string)

class AppProgram {
    program: Program<NextLevelIdoPlatform>;
    provider: AnchorProvider;

    constructor(provider: AnchorProvider) {
        this.provider = provider;
        this.program = new Program<NextLevelIdoPlatform>(idl as any, PROGRAM_KEY, provider);
    }

    async stake(amount: number, sendTx: WalletContextState['sendTransaction']) {
      const wallet = this.provider.wallet;

      const [vaultPubkey] = await getAriTokenVault(this.program.programId);

      const [user] = await getUserPDA(wallet.publicKey, this.program.programId);

      const ARITokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        ARIPublicKey,
        wallet.publicKey,
        sendTx,
      );
      
      const xARITokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        xARIPublicKey,
        wallet.publicKey,
        sendTx
      );
      
      await this.program.methods.stake(new BN(amount).mul(new BN(10**ARI_DECIMALS)))
      .accounts({
        tokenMint: ARIPublicKey,
        xTokenMint: xARIPublicKey,
        tokenFrom: ARITokenAccount.address,
        tokenVault: vaultPubkey,
        xTokenTo: xARITokenAccount.address,
        user,
        userAuthority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
    }

    async unstake(amount: number, sendTx: WalletContextState['sendTransaction']) {
      const wallet = this.provider.wallet;
      const [vaultPubkey] = await getAriTokenVault(this.program.programId);
      const [user] = await getUserPDA(wallet.publicKey, this.program.programId);

      const lotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        ARIPublicKey,
        wallet.publicKey,
        sendTx,
      );
      
      const xLotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        xARIPublicKey,
        wallet.publicKey,
        sendTx
      );
      
      await this.program.methods.unstake(new BN(amount).mul(new BN(10**ARI_DECIMALS)))
      .accounts({
        tokenMint: ARIPublicKey,
        xTokenMint: xARIPublicKey,
        xTokenFrom: xLotoTokenAccount.address,
        xTokenFromAuthority: wallet.publicKey,
        tokenVault: vaultPubkey,
        tokenTo: lotoTokenAccount.address,
        user,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
    }

    async getPoolInfo(poolName: String) {
      const [poolPDA] = await getPoolPDA(poolName, this.program.programId);
      const poolAccount = await this.program.account.idoPool.fetch(poolPDA);
      return poolAccount;
    }

    async getUserIDOAccount(walletPubkey: PublicKey) {
      const [userIdoPDA] = await getIDOUserPDA(walletPubkey, this.program.programId);
      const userIdoAccount = await this.program.account.idoUser.fetch(userIdoPDA);
      return userIdoAccount;
    }

    async commitFund(idoName: string, amount: number, sendTx: WalletContextState['sendTransaction']) {
      const wallet = this.provider.wallet;
      const [idoPool] = await getPoolPDA(idoName, this.program.programId);
      const [user] = await getUserPDA(wallet.publicKey, this.program.programId);
      const [idoUser] = await getIDOUserPDA(wallet.publicKey, this.program.programId);
      const [redeemableMint] = await getRedeemableMintPDA(idoName, this.program.programId);
      const [userRedeemable] = await getUserRedeemablePDA(wallet.publicKey, idoName, this.program.programId);
      const [usdcVault] = await getUSDCVaultPDA(idoName, this.program.programId);

      const usdcTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        usdcPublicKey,
        wallet.publicKey,
        sendTx
      );
      
      await this.program.methods.participatePool(new BN(amount))
            .accounts({
                userAuthority: wallet.publicKey,
                user,
                idoPool,
                idoUser,
                userUsdc: usdcTokenAccount.address,
                redeemableMint,
                userRedeemable,
                usdcMint: usdcPublicKey,
                usdcVault,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
            })
            // .signers([vincenzo])
            .rpc();
    }

}

export default AppProgram;