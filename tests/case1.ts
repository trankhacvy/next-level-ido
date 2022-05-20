import { expect, assert } from 'chai'
import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getOrCreateAssociatedTokenAccount, createAssociatedTokenAccount } from '@solana/spl-token';
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import { handleAirdrop, getKeypairFromFile, getTokenBalance } from './utils'

// ARI mint =  H2G3mWnp982G8RjbTsnPNPqXamLQqpYGc1Lpadmgzeee
// xARI mint =  5YEHFGR4RVKvnXQAubB9rbRvS6CrbUiwtMh8YjefE9do

const DECIMALS = 6

describe("next-level-ido-platform", () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

    const payer = web3.Keypair.generate();
    let mintPubkey: web3.PublicKey;
    let xMintPubkey: web3.PublicKey;
    // stake pool
    let stakePoolAriVault: web3.PublicKey;
    // user vincenzo
    const vincenzo = web3.Keypair.generate();
    let vincenzoAriATA: web3.PublicKey;
    let vincenzoXAriATA: web3.PublicKey;

    before(async() => {
        await handleAirdrop(provider, payer.publicKey);
        await handleAirdrop(provider, vincenzo.publicKey);

        // construct mint tokens
        const mintKp = getKeypairFromFile("ari-token-mint");
        
        mintPubkey = await createMint(
            provider.connection,
            payer,
            payer.publicKey,
            null,
            DECIMALS,
            mintKp
        );
        
        const xMintKp = getKeypairFromFile("x_ari-token-mint");
        xMintPubkey = await createMint(
            provider.connection,
            payer,
            payer.publicKey,
            null,
            DECIMALS,
            xMintKp
        );

        // create ATA for mint
        vincenzoAriATA = await createAssociatedTokenAccount(
            provider.connection,
            vincenzo,
            mintPubkey,
            vincenzo.publicKey,
        );
        vincenzoXAriATA = await createAssociatedTokenAccount(
            provider.connection,
            vincenzo,
            xMintPubkey,
            vincenzo.publicKey,
        );
        // mint ARI to vincenzo
        await mintTo(
            provider.connection,
            vincenzo,
            mintPubkey,
            vincenzoAriATA,
            payer,
            1_000_000,
        );

    })

    it('initialize_stake_pool', async () => {
        [stakePoolAriVault] =
            await anchor.web3.PublicKey.findProgramAddress(
                [Buffer.from("vault"), mintPubkey.toBuffer()],
                program.programId
            );
        console.log('stakePoolAriVault', stakePoolAriVault.toBase58());        
        try {
            await program.rpc.initializeStakePool(
                {
                    accounts: {
                        tokenMint: mintPubkey,
                        tokenVault: stakePoolAriVault,
                        tokenAuthority: payer.publicKey,
                        systemProgram: web3.SystemProgram.programId,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    },
                    signers: [payer],
                }
            );
        } catch (error) {
            console.error(error)
        }
    })

    it('reclaim_mint_authority', async () => {
        [stakePoolAriVault] =
            await anchor.web3.PublicKey.findProgramAddress(
                [Buffer.from("vault"), mintPubkey.toBuffer()],
                program.programId
            );
        try {
            await program.rpc.reclaimMintAuthority(
                {
                    accounts: {
                        tokenMint: mintPubkey,
                        xTokenMint: xMintPubkey,
                        tokenVault: stakePoolAriVault,
                        tokenAuthority: payer.publicKey,
                        tokenProgram: TOKEN_PROGRAM_ID,
                    },
                    signers: [payer],
                }
            );
        } catch (error) {
            console.error(error)
        }
    })

    it('stake', async () => {
        const [user] =
            await web3.PublicKey.findProgramAddress(
                [Buffer.from("user"), vincenzo.publicKey.toBuffer()],
                program.programId
            );
            
        try {
            await program.methods.stake(new BN(1000))
            .accounts({
              tokenMint: mintPubkey,
              xTokenMint: xMintPubkey,
              tokenFrom: vincenzoAriATA,
              tokenVault: stakePoolAriVault,
              xTokenTo: vincenzoXAriATA,
              user,
              userAuthority: vincenzo.publicKey,
              systemProgram: web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([vincenzo])
            .rpc();
        } catch (error) {
            console.log(error);
        }
        
        const ariBalance = await getTokenBalance(vincenzoAriATA, provider);    
        const xAriBalance = await getTokenBalance(vincenzoXAriATA, provider);    
        const ariTokenVaultBalance = await getTokenBalance(stakePoolAriVault, provider);    
        let fetchedUser = await program.account.user.fetch(user);    

        assert.strictEqual(ariBalance, 1_000_000 - 1000);
        assert.strictEqual(xAriBalance, 1000);
        assert.strictEqual(ariTokenVaultBalance, 1000);
        assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 1000);
        assert.strictEqual(JSON.stringify(fetchedUser.tier), JSON.stringify({ noTier: {} }));

        // stake more 500
        await program.methods.stake(new BN(500))
            .accounts({
              tokenMint: mintPubkey,
              xTokenMint: xMintPubkey,
              tokenFrom: vincenzoAriATA,
              tokenVault: stakePoolAriVault,
              xTokenTo: vincenzoXAriATA,
              user,
              userAuthority: vincenzo.publicKey,
              systemProgram: web3.SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([vincenzo])
            .rpc();
        
        fetchedUser = await program.account.user.fetch(user);
        assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 1500);
        assert.strictEqual(JSON.stringify(fetchedUser.tier), JSON.stringify({"brone":{}}));    
    })

    it('unstake', async () => {
        const [user] =
            await web3.PublicKey.findProgramAddress(
                [Buffer.from("user"), vincenzo.publicKey.toBuffer()],
                program.programId
            );

        try {
            await program.methods.unstake(new BN(200))
            .accounts({
                tokenMint: mintPubkey,
                xTokenMint: xMintPubkey,
                xTokenFrom: vincenzoXAriATA,
                xTokenFromAuthority: vincenzo.publicKey,
                tokenVault: stakePoolAriVault,
                tokenTo: vincenzoAriATA,
                user,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([vincenzo])
            .rpc();
        } catch (error) {
            console.log(error);
        }
        
        const ariBalance = await getTokenBalance(vincenzoAriATA, provider);    
        const xAriBalance = await getTokenBalance(vincenzoXAriATA, provider);    
        const ariTokenVaultBalance = await getTokenBalance(stakePoolAriVault, provider);    
        let fetchedUser = await program.account.user.fetch(user);    

        assert.strictEqual(ariBalance, 1_000_000 - 1300);
        assert.strictEqual(xAriBalance, 1300);
        assert.strictEqual(ariTokenVaultBalance, 1300);
        assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 1300);
        assert.strictEqual(JSON.stringify(fetchedUser.tier), JSON.stringify({ noTier: {} }));
    })


})