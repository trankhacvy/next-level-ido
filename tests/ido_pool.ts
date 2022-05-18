import { expect } from 'chai'
import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getAccount, createAssociatedTokenAccount } from '@solana/spl-token';
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import { handleAirdrop } from './utils'

const DECIMALS = 10**9

function IdoTimes() {
    this.startIdo;
    this.endDeposts;
    this.endIdo;
    this.endEscrow;
}

describe("next-level-ido-platform", () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

    const initialIdoToken = new BN(1000);
    const payer = web3.Keypair.generate();
    const user1 = web3.Keypair.generate();
    const user2 = web3.Keypair.generate();

    let usdcTokenMint: web3.PublicKey;
    let idoTokenMint: web3.PublicKey;
    let creatorIdoTokenAccount: web3.PublicKey;

    // stake related accounts
    let mintPubkey: web3.PublicKey; // LOTO token mint
    let xMintPubkey: web3.PublicKey; // xLOTO token mint
    // token accounts
    let walletTokenPubkey : web3.PublicKey;
    let user1WalletTokenPubkey : web3.PublicKey;
    let user2WalletTokenPubkey : web3.PublicKey;
    let walletXTokenPubkey: web3.PublicKey;
    let user1WalletXTokenPubkey: web3.PublicKey;
    let user2WalletXTokenPubkey: web3.PublicKey;
    let stakeVaultPubkey: web3.PublicKey;

    before(async() => {
        // init payer
        await handleAirdrop(provider, payer.publicKey, web3.LAMPORTS_PER_SOL * 2);
        await handleAirdrop(provider, user1.publicKey, web3.LAMPORTS_PER_SOL * 2);
        await handleAirdrop(provider, user2.publicKey, web3.LAMPORTS_PER_SOL * 2);
        
        usdcTokenMint = await createMint(
            provider.connection,
            payer,
            payer.publicKey,
            null,
            9
          );
        console.log('usdcTokenMint ', usdcTokenMint.toBase58())    
        idoTokenMint = await createMint(
            provider.connection,
            payer,
            payer.publicKey,
            null,
            9
        );
        console.log('idoTokenMint ', idoTokenMint.toBase58())

        creatorIdoTokenAccount = await createAssociatedTokenAccount(
            provider.connection,
            payer,
            idoTokenMint,
            payer.publicKey,
          );
        console.log('creatorIdoTokenAccount ', creatorIdoTokenAccount.toBase58())  
        await mintTo(
            provider.connection,
            payer,
            idoTokenMint,
            creatorIdoTokenAccount,
            payer,
            initialIdoToken,
          );  
    
          // init stake related accounts
          mintPubkey = await createMint(
            provider.connection,
            payer,
            payer.publicKey,
            null,
            9
          );
          console.log('mintPubkey ', mintPubkey.toBase58());  
          [xMintPubkey] =
          await web3.PublicKey.findProgramAddress(
            [Buffer.from("mint"), mintPubkey.toBuffer()],
            program.programId
          );

          [stakeVaultPubkey] =
          await web3.PublicKey.findProgramAddress(
            [Buffer.from("vault"), mintPubkey.toBuffer()],
            program.programId
          );

          // init stake pool

          try {
            await program.rpc.initializeStakePool(
              {
                accounts: {
                  tokenMint: mintPubkey,
                  xTokenMint: xMintPubkey,
                  tokenVault: stakeVaultPubkey,
                  tokenAuthority: payer.publicKey,
                  systemProgram: web3.SystemProgram.programId,
                  tokenProgram: TOKEN_PROGRAM_ID,
                  rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                },
                signers: [payer]
              }
            );
          } catch (error) {
            console.error(error);
          }
          
          walletTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            payer,
            mintPubkey,
            payer.publicKey,
          );
          user1WalletTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user1,
            mintPubkey,
            user1.publicKey,
          );
          user2WalletTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user2,
            mintPubkey,
            user2.publicKey,
          );
          // mint 100k LOTO for walletTokenPubkey 
          await mintTo(
            provider.connection,
            payer,
            mintPubkey,
            walletTokenPubkey,
            payer,
            100000,
          ); 
          
          await mintTo(
            provider.connection,
            user1,
            mintPubkey,
            user1WalletTokenPubkey,
            payer,
            100000,
          ); 
          
          await mintTo(
            provider.connection,
            user2,
            mintPubkey,
            user2WalletTokenPubkey,
            payer,
            100000,
          ); 
          walletXTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            payer,
            xMintPubkey,
            payer.publicKey,
          );

          user1WalletXTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user1,
            xMintPubkey,
            user1.publicKey,
          );

          user2WalletXTokenPubkey = await createAssociatedTokenAccount(
            provider.connection,
            user2,
            xMintPubkey,
            user2.publicKey,
          );

      //setup logging event listeners
      // program.addEventListener('Log', (message) => {
      //   console.log('Log: ', message);
      // });

    })

    let idoTimes;
    let idoName = "test_ido";
    
    it("Initializes the IDO pool", async () => {
        const [idoPool] =
        await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(idoName)],
            program.programId
        );

        const [redeemableMint] =
        await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(idoName), Buffer.from("redeemable_mint")],
            program.programId
        );

        const [idoTokenVault] =
            await anchor.web3.PublicKey.findProgramAddress(
                [Buffer.from(idoName), Buffer.from("ido_token_vault")],
                program.programId
            );
        
        const [usdcVault] =
            await anchor.web3.PublicKey.findProgramAddress(
              [Buffer.from(idoName), Buffer.from("usdc_vault")],
              program.programId
            );
        
        idoTimes = new IdoTimes();
        const nowBn = new anchor.BN(Date.now() / 1000);
        idoTimes.startIdo = nowBn.add(new anchor.BN(5));
        idoTimes.endDeposits = nowBn.add(new anchor.BN(10));
        idoTimes.endIdo = nowBn.add(new anchor.BN(15));
        idoTimes.endEscrow = nowBn.add(new anchor.BN(16));
        
        try {
            await program.methods.initializeIdoPool(idoName, initialIdoToken, idoTimes)
        .accounts({
            idoAuthority: payer.publicKey,
            idoAuthorityToken: creatorIdoTokenAccount,
            idoPool,
            idoTokenMint,
            idoTokenVault,
            redeemableMint: redeemableMint,
            usdcMint: usdcTokenMint,
            usdcVault: usdcVault,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([payer])
        .rpc();
        } catch (error) {
            console.error(error)
        }
        
        const creatorTokenAccount = await getAccount(provider.connection, creatorIdoTokenAccount);
        expect(creatorTokenAccount.amount.toString()).to.eq('0', "check balance of creator");

    })

    it("Participate pool", async () => {
        // init user
        const [user1Pda] =
        await web3.PublicKey.findProgramAddress(
            [Buffer.from("user"), user1.publicKey.toBuffer()],
            program.programId
        );
        const stakeAmount = 1500;    
       try {
         
        await program.methods.stake(new BN(stakeAmount))
        .accounts({
            tokenMint: mintPubkey,
            xTokenMint: xMintPubkey,
            tokenFrom: user1WalletTokenPubkey,
            tokenVault: stakeVaultPubkey,
            xTokenTo: user1WalletXTokenPubkey,
            user: user1Pda,
            userAuthority: user1.publicKey,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([user1])
        .rpc();
       } catch (error) {
         console.error(error)
       }
        console.log('user 1 stake successfully ', user1.publicKey.toBase58());

        const [user2Pda] =
        await web3.PublicKey.findProgramAddress(
            [Buffer.from("user"), user2.publicKey.toBuffer()],
            program.programId
        );
        
        try {
          await program.methods.stake(new BN(stakeAmount))
            .accounts({
                tokenMint: mintPubkey,
                xTokenMint: xMintPubkey,
                tokenFrom: user2WalletTokenPubkey,
                tokenVault: stakeVaultPubkey,
                xTokenTo: user2WalletXTokenPubkey,
                user: user2Pda,
                userAuthority: user2.publicKey,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([user2])
            .rpc();
        } catch (error) {
          console.error(error)
        }
            
        console.log('user 2 stake successfully ', user2.publicKey.toBase58());

        const [idoPool] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(idoName)],
            program.programId
        );

        try {
            await program.methods.participatePool()
                .accounts({
                    user: user1Pda,
                    userAuthority: user1.publicKey,
                    idoAccount: idoPool
                })
                .signers([user1])
                .rpc();

                await program.methods.participatePool()
                .accounts({
                    user: user2Pda,
                    userAuthority: user2.publicKey,
                    idoAccount: idoPool
                })
                .signers([user2])
                .rpc();
        } catch (error) {
            console.error(error);
        }

        let idoPoolAcc = await program.account.idoPool.fetch(idoPool);
        expect(idoPoolAcc.participantCount.toString()).to.eq('2', "check participant count");

    })

})