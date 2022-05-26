import { assert } from "chai";
import dayjs from "dayjs";
import * as anchor from "@project-serum/anchor";
import { Program, web3, BN } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  mintTo,
  createAssociatedTokenAccount,
} from "@solana/spl-token";
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import { handleAirdrop, getKeypairFromFile, getTokenBalance } from "./utils";

const DECIMALS = 6;

describe("next-level-ido-platform", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace
    .NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  const payer = web3.Keypair.generate();
  let mintPubkey: web3.PublicKey;
  let xMintPubkey: web3.PublicKey;
  // stake pool
  let stakePoolAriVault: web3.PublicKey;
  // user vincenzo
  const vincenzo = web3.Keypair.generate();
  let vincenzoAriATA: web3.PublicKey;
  let vincenzoXAriATA: web3.PublicKey;
  let vincenzoUscdATA: web3.PublicKey;
  let vincenzoIdoATA: web3.PublicKey;
  // ido
  const idoName = "test-ido-name";
  let idoTokenMint: web3.PublicKey;
  let idoTokenAccount: web3.PublicKey;
  let usdcTokenMint: web3.PublicKey;
  let idoTimes;

  before(async () => {
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
      vincenzo.publicKey
    );
    vincenzoXAriATA = await createAssociatedTokenAccount(
      provider.connection,
      vincenzo,
      xMintPubkey,
      vincenzo.publicKey
    );
    // mint ARI to vincenzo
    await mintTo(
      provider.connection,
      vincenzo,
      mintPubkey,
      vincenzoAriATA,
      payer,
      1_000_000
    );

    // create ido token
    idoTokenMint = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      DECIMALS
    );

    usdcTokenMint = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      DECIMALS
    );

    idoTokenAccount = await createAssociatedTokenAccount(
      provider.connection,
      payer,
      idoTokenMint,
      payer.publicKey
    );

    vincenzoIdoATA = await createAssociatedTokenAccount(
      provider.connection,
      vincenzo,
      idoTokenMint,
      vincenzo.publicKey
    );

    await mintTo(
      provider.connection,
      payer,
      idoTokenMint,
      idoTokenAccount,
      payer,
      1_000_000
    );

    vincenzoUscdATA = await createAssociatedTokenAccount(
      provider.connection,
      vincenzo,
      usdcTokenMint,
      vincenzo.publicKey
    );

    await mintTo(
      provider.connection,
      vincenzo,
      usdcTokenMint,
      vincenzoUscdATA,
      payer,
      500
    );
  });

  it("initialize_stake_pool", async () => {
    [stakePoolAriVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("vault"), mintPubkey.toBuffer()],
      program.programId
    );
    console.log("stakePoolAriVault", stakePoolAriVault.toBase58());
    try {
      await program.rpc.initializeStakePool({
        accounts: {
          tokenMint: mintPubkey,
          tokenVault: stakePoolAriVault,
          tokenAuthority: payer.publicKey,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [payer],
      });
    } catch (error) {
      console.error(error);
    }
  });

  it("reclaim_mint_authority", async () => {
    [stakePoolAriVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("vault"), mintPubkey.toBuffer()],
      program.programId
    );
    try {
      await program.rpc.reclaimMintAuthority({
        accounts: {
          tokenMint: mintPubkey,
          xTokenMint: xMintPubkey,
          tokenVault: stakePoolAriVault,
          tokenAuthority: payer.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        signers: [payer],
      });
    } catch (error) {
      console.error(error);
    }
  });

  it("stake", async () => {
    const [user] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("user"), vincenzo.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .stake(new BN(1000))
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
    const ariTokenVaultBalance = await getTokenBalance(
      stakePoolAriVault,
      provider
    );
    let fetchedUser = await program.account.user.fetch(user);

    assert.strictEqual(ariBalance, 999_000);
    assert.strictEqual(xAriBalance, 1000);
    assert.strictEqual(ariTokenVaultBalance, 1000);
    assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 1000);
    assert.strictEqual(
      JSON.stringify(fetchedUser.tier),
      JSON.stringify({ noTier: {} })
    );

    // stake more 500
    await program.methods
      .stake(new BN(3000))
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
    assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 4000);
    assert.strictEqual(
      JSON.stringify(fetchedUser.tier),
      JSON.stringify({ silver: {} })
    );
  });

  it("unstake", async () => {
    const [user] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("user"), vincenzo.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .unstake(new BN(200))
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
    const ariTokenVaultBalance = await getTokenBalance(
      stakePoolAriVault,
      provider
    );
    let fetchedUser = await program.account.user.fetch(user);

    assert.strictEqual(ariBalance, 996_200);
    assert.strictEqual(xAriBalance, 3800);
    assert.strictEqual(ariTokenVaultBalance, 3800);
    assert.strictEqual(fetchedUser.stakedAmount.toNumber(), 3800);
    assert.strictEqual(
      JSON.stringify(fetchedUser.tier),
      JSON.stringify({ silver: {} })
    );
  });

  it("initialize_ido_pool", async () => {
    const wls = "2022-05-21 12:00:00+00";
    const wle = "2022-05-22 12:00:00+00";
    const ss = "2022-05-23 17:00:00+00";
    const se = "2022-05-28 14:00:00+00";
    const claim = "2022-05-21 14:00:00+00";

    idoTimes = new IdoTimes();
    idoTimes.whitelistStart = new BN(new Date(wls).getTime() / 1000);
    idoTimes.whitelistEnd = new BN(new Date(wle).getTime() / 1000);
    idoTimes.saleStart = new BN(new Date(ss).getTime() / 1000);
    idoTimes.saleEnd = new BN(new Date(se).getTime() / 1000);
    idoTimes.claimStart = new BN(new Date(claim).getTime() / 1000);

    let [idoPool] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName)],
      program.programId
    );

    const [redeemableMint] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("redeemable_mint")],
      program.programId
    );

    const [idoTokenVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("ido_token_vault")],
      program.programId
    );

    const [usdcVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("usdc_vault")],
      program.programId
    );

    try {
      // @ts-ignore
      await program.methods
        .initializeIdoPool(
          idoName,
          new BN("5000"),
          new BN("7"),
          new BN("10"),
          idoTimes
        )
        .accounts({
          idoAuthority: payer.publicKey,
          idoAuthorityToken: idoTokenAccount,
          idoPool,
          idoTokenMint,
          idoTokenVault,
          redeemableMint,
          usdcMint: usdcTokenMint,
          usdcVault,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([payer])
        .rpc();
    } catch (error) {
      console.log(error);
    }

    let idoPoolAccount = await program.account.idoPool.fetch(idoPool);
    console.log("idoPoolAccount", idoPoolAccount.idoTokenAmount.toString());
    assert.strictEqual(idoPoolAccount.idoName, idoName);
    assert.strictEqual(idoPoolAccount.participantCount, 0);

    const tokenVaultBalance = await getTokenBalance(idoTokenVault, provider);
    assert.strictEqual(tokenVaultBalance, 5000);

    // try {
    //     // @ts-ignore
    //     await program.methods.updateIdoPool(idoName, new BN('2000'), new BN('1'), new BN('10'), null)
    //     .accounts({
    //         idoAuthority: payer.publicKey,
    //         idoPool,
    //     })
    //     .signers([payer])
    //     .rpc();
    // } catch (error) {
    //     console.log(error);
    // }

    // idoPoolAccount = await program.account.idoPool.fetch(idoPool);
    // console.log('idoPoolAccount refetch', idoPoolAccount.idoTokenAmount.toString())
    // console.log('idoPoolAccount time', idoPoolAccount.idoTimes)
  });

  it("participate_pool", async () => {
    idoTimes = new IdoTimes();
    const nowBn = new anchor.BN(Date.now() / 1000);
    idoTimes.startIdo = nowBn.add(new anchor.BN(5));
    idoTimes.endDeposits = nowBn.add(new anchor.BN(10));
    idoTimes.endIdo = nowBn.add(new anchor.BN(15));
    idoTimes.endEscrow = nowBn.add(new anchor.BN(16));

    const [user] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("user"), vincenzo.publicKey.toBuffer()],
      program.programId
    );
    const [idoUser] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("ido_user"), vincenzo.publicKey.toBuffer()],
      program.programId
    );

    let [idoPool] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName)],
      program.programId
    );

    const [redeemableMint] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("redeemable_mint")],
      program.programId
    );

    const [usdcVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("usdc_vault")],
      program.programId
    );

    const [userRedeemable] = await anchor.web3.PublicKey.findProgramAddress(
      [
        (vincenzo.publicKey as web3.PublicKey).toBuffer(),
        Buffer.from(idoName),
        Buffer.from("user_redeemable"),
      ],
      program.programId
    );

    try {
      await program.methods
        .participatePool(new BN(200))
        .accounts({
          userAuthority: vincenzo.publicKey,
          user,
          idoPool,
          idoUser,
          userUsdc: vincenzoUscdATA,
          redeemableMint,
          userRedeemable,
          usdcMint: usdcTokenMint,
          usdcVault,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([vincenzo])
        .rpc();
    } catch (error) {
      console.log(error);
    }

    const idoPoolAccount = await program.account.idoPool.fetch(idoPool);
    assert.strictEqual(idoPoolAccount.participantCount, 1);

    const usdcVaultBalance = await getTokenBalance(usdcVault, provider);
    assert.strictEqual(usdcVaultBalance, 200);
  });

  it("claim_token", async () => {
    idoTimes = new IdoTimes();
    const nowBn = new anchor.BN(Date.now() / 1000);
    idoTimes.startIdo = nowBn.add(new anchor.BN(5));
    idoTimes.endDeposits = nowBn.add(new anchor.BN(10));
    idoTimes.endIdo = nowBn.add(new anchor.BN(15));
    idoTimes.endEscrow = nowBn.add(new anchor.BN(16));

    const [idoUser] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("ido_user"), vincenzo.publicKey.toBuffer()],
      program.programId
    );

    let [idoPool] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName)],
      program.programId
    );

    const [redeemableMint] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("redeemable_mint")],
      program.programId
    );

    const [usdcVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("usdc_vault")],
      program.programId
    );

    const [userRedeemable] = await anchor.web3.PublicKey.findProgramAddress(
      [
        (vincenzo.publicKey as web3.PublicKey).toBuffer(),
        Buffer.from(idoName),
        Buffer.from("user_redeemable"),
      ],
      program.programId
    );

    const [idoTokenVault] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("ido_token_vault")],
      program.programId
    );

    try {
      await program.methods
        .claimToken()
        .accounts({
          idoUser,
          payer: vincenzo.publicKey,
          userAuthority: vincenzo.publicKey,
          userIdoToken: vincenzoIdoATA,
          userRedeemable,
          idoAccount: idoPool,
          idoTokenMint,
          idoTokenVault,
          redeemableMint,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([vincenzo])
        .rpc();
    } catch (error) {
      console.log(error);
    }

    // const idoPoolAccount = await program.account.idoPool.fetch(idoPool);
    // assert.strictEqual(idoPoolAccount.participantCount, 1);

    // const usdcVaultBalance = await getTokenBalance(usdcVault, provider);
    // assert.strictEqual(usdcVaultBalance, 200);
  });
});

function IdoTimes() {
  this.whitelistStart;
  this.whitelistEnd;
  this.saleStart;
  this.saleEnd;
  this.claimStart;
}
