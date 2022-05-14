import { expect } from 'chai'
import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getAccount, createAssociatedTokenAccount } from '@solana/spl-token';
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";

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

    let usdcTokenMint: web3.PublicKey;
    let idoTokenMint: web3.PublicKey;
    let creatorIdoTokenAccount: web3.PublicKey;

    before(async() => {
        // init payer
        const airdropSignature = await provider.connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 2);    
        await provider.connection.confirmTransaction(airdropSignature);
        
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
    })

    let idoTimes;
    let idoName = "test_ido";
    
    it('test 1', () => {
        expect(1-1).to.eq(0, "check balance of creator");
    })

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

})