import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './token'
import idl from '../config/idl.json'
import { NextLevelIdoPlatform } from 'types/program'
import { ARIPublicKey, xARIPublicKey } from 'common/token';
import { ARI_DECIMALS } from 'common/constants';
import { getAriTokenVault, getUserPDA } from 'utils/solana';

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
}

export default AppProgram;