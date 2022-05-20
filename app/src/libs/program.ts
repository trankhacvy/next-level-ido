import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './token'
import idl from '../config/idl.json'
import { NextLevelIdoPlatform } from 'types/program'
import { lotoPublicKey } from 'common/token';

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

      const [xLotoTokenMint] =
      await PublicKey.findProgramAddress(
        [Buffer.from("mint"), lotoPublicKey.toBuffer()],
        this.program.programId
      );
      const [vaultPubkey] =
      await PublicKey.findProgramAddress(
        [Buffer.from("vault"), lotoPublicKey.toBuffer()],
        this.program.programId
      );
      const [user] = await PublicKey.findProgramAddress(
        [Buffer.from("user"),wallet.publicKey.toBuffer() ],
        this.program.programId
      );

      const lotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        lotoPublicKey,
        wallet.publicKey,
        sendTx,
      );
      
      const xLotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        xLotoTokenMint,
        wallet.publicKey,
        sendTx
      );
      
      await this.program.methods.stake(new BN(amount).mul(new BN(10**9)))
      .accounts({
        tokenMint: lotoPublicKey,
        xTokenMint: xLotoTokenMint,
        tokenFrom: lotoTokenAccount.address,
        tokenVault: vaultPubkey,
        xTokenTo: xLotoTokenAccount.address,
        user,
        userAuthority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
    }

    async unstake(amount: number, sendTx: WalletContextState['sendTransaction']) {
      const wallet = this.provider.wallet;

      const [xLotoTokenMint] =
      await PublicKey.findProgramAddress(
        [Buffer.from("mint"), lotoPublicKey.toBuffer()],
        this.program.programId
      );
      const [vaultPubkey] =
      await PublicKey.findProgramAddress(
        [Buffer.from("vault"), lotoPublicKey.toBuffer()],
        this.program.programId
      );
      
      const [user] = await PublicKey.findProgramAddress(
        [Buffer.from("user"),wallet.publicKey.toBuffer() ],
        this.program.programId
      );

      const lotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        lotoPublicKey,
        wallet.publicKey,
        sendTx,
      );
      
      const xLotoTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.provider.connection,
        wallet.publicKey,
        xLotoTokenMint,
        wallet.publicKey,
        sendTx
      );
      
      await this.program.methods.unstake(new BN(amount).mul(new BN(10**9)))
      .accounts({
        tokenMint: lotoPublicKey,
        xTokenMint: xLotoTokenMint,
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