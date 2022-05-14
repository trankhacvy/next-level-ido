import { expect } from 'chai'
import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getOrCreateAssociatedTokenAccount, createAssociatedTokenAccount } from '@solana/spl-token';
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";

const DEFAULT_TOKEN_AMOUNT = 1_000_000;

describe("next-level-ido-platform", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  const payer = web3.Keypair.generate();
  // const wallet = web3.Keypair.generate();

  // existing tokens
  let mintPubkey: web3.PublicKey;

  //the ecosystems corresponding xToken
  let xMintPubkey: web3.PublicKey;
  let mintBump;

  // token accounts
  let walletTokenAccount : web3.PublicKey;
  let walletXTokenAccount: web3.PublicKey;

  //the program's vault for stored collateral against xToken minting
  let vaultPubkey: web3.PublicKey;
  let vaultBump;

  before(async() => {
    console.log('payer', payer.publicKey.toBase58());
    // console.log('wallet user', wallet.publicKey.toBase58());
    // fund signer
    const airdropSignature1 = await provider.connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL);
    // const airdropSignature2 = await provider.connection.requestAirdrop(wallet.publicKey, web3.LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(airdropSignature1);
    // await provider.connection.confirmTransaction(airdropSignature2);
    // create mint token
    mintPubkey = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      9
    );
    console.log('Mint token created ', mintPubkey.toBase58());
    // find xMintPubkey
    [xMintPubkey, mintBump] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("mint"), mintPubkey.toBuffer()],
        program.programId
      );
      console.log('xMintPubkey token founded ', xMintPubkey.toBase58());
      [vaultPubkey, vaultBump] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("vault"), mintPubkey.toBuffer()],
        program.programId
      );

      // create ATA for mint
      walletTokenAccount = await createAssociatedTokenAccount(
        provider.connection,
        payer,
        mintPubkey,
        payer.publicKey,
      );

      console.log('walletTokenAccount created ', walletTokenAccount.toBase58())
      // mint to ATA
      await mintTo(
        provider.connection,
        payer,
        mintPubkey,
        walletTokenAccount,
        payer,
        DEFAULT_TOKEN_AMOUNT,
      );  

       //setup logging event listeners
      // program.addEventListener('Log', (message) => {
      //   console.log('Log: ', message);
      // });
     
  })

  it("Is initialized!", async () => {

      await program.rpc.initialize(
        {
          accounts: {
            tokenMint: mintPubkey,
            xTokenMint: xMintPubkey,
            tokenVault: vaultPubkey,
            initializer: payer.publicKey,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          },
          signers: [payer]
        }
      );

       // create ATA for mint x
      walletXTokenAccount = await createAssociatedTokenAccount(
        provider.connection,
        payer,
        xMintPubkey,
        payer.publicKey,
      );
      console.log('walletXTokenAccount created ', walletXTokenAccount.toBase58())


  });

  it('stake', async () => {
    const stakeAmount = 5000;

    const [user] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("user"), payer.publicKey.toBuffer()],
        program.programId
      );

    await program.methods.stake(new BN(stakeAmount))
    .accounts({
      tokenMint: mintPubkey,
      xTokenMint: xMintPubkey,
      tokenFrom: walletTokenAccount,
      // tokenFromAuthority: wallet.publicKey,
      tokenVault: vaultPubkey,
      xTokenTo: walletXTokenAccount,
      user: user,
      initializer: payer.publicKey,
      systemProgram: web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .signers([payer])
    .rpc();

    // user token account amount
    const tokenAmount = parseInt((await provider.connection.getTokenAccountBalance(walletTokenAccount)).value.amount);
    expect(tokenAmount).to.eq(DEFAULT_TOKEN_AMOUNT - stakeAmount, "remaining balance");

    // user token x account amount
    const tokenXAmount = parseInt((await provider.connection.getTokenAccountBalance(walletXTokenAccount)).value.amount);
    expect(tokenXAmount).to.eq(stakeAmount, "token x balance");

    // vault balance
    const vaultAmount = parseInt((await provider.connection.getTokenAccountBalance(vaultPubkey)).value.amount);
    expect(vaultAmount).to.eq(stakeAmount, "vault balance");
    
    let createdUser = await program.account.user.fetch(user);
    console.log('createdUser', createdUser.tier);
    console.log('createdUser staked', createdUser.stakedAmount.toString());
    console.log('createdUser staked', createdUser.lastStakeTs.toString());
    expect(createdUser.stakedAmount.toNumber()).to.equal(stakeAmount);
    // expect(createdUser.tier).to.equal(0);

    // stake more
    await program.methods.stake(new BN(10000))
    .accounts({
      tokenMint: mintPubkey,
      xTokenMint: xMintPubkey,
      tokenFrom: walletTokenAccount,
      // tokenFromAuthority: wallet.publicKey,
      tokenVault: vaultPubkey,
      xTokenTo: walletXTokenAccount,
      user: user,
      initializer: payer.publicKey,
      systemProgram: web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .signers([payer])
    .rpc();

    createdUser = await program.account.user.fetch(user);
    console.log('createdUser stake more', createdUser.tier);
    console.log('createdUser stake more staked', createdUser.stakedAmount.toString());
    console.log('createdUser stake more ts', createdUser.lastStakeTs.toString());


  });

  it('unstake', async () => {
    const unstakeAmount = 14000

    const [user] =
    await web3.PublicKey.findProgramAddress(
      [Buffer.from("user"), payer.publicKey.toBuffer()],
      program.programId
    );

    await program.methods.unstake(new BN(unstakeAmount))
    .accounts({
      tokenMint: mintPubkey,
      xTokenMint: xMintPubkey,
      xTokenFrom: walletXTokenAccount,
      xTokenFromAuthority: payer.publicKey,
      tokenVault: vaultPubkey,
      tokenTo: walletTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      user: user,
    })
    .signers([payer])
    .rpc();

    // user token account amount
    const tokenAmount = parseInt((await provider.connection.getTokenAccountBalance(walletTokenAccount)).value.amount);
    expect(tokenAmount).to.eq(DEFAULT_TOKEN_AMOUNT - 1000, "remaining balance");

    // user token x account amount
    // const tokenXAmount = parseInt((await provider.connection.getTokenAccountBalance(walletXTokenAccount)).value.amount);
    // expect(tokenXAmount).to.eq(stakeAmount, "token x balance");

    // vault balance
    // const vaultAmount = parseInt((await provider.connection.getTokenAccountBalance(vaultPubkey)).value.amount);
    // expect(vaultAmount).to.eq(stakeAmount, "vault balance");

    let createdUser = await program.account.user.fetch(user);
    console.log('createdUser', createdUser.tier);
    console.log('createdUser staked', createdUser.stakedAmount.toString());
    console.log('createdUser staked', createdUser.lastStakeTs.toString());
    expect(createdUser.stakedAmount.toNumber()).to.equal(1000);

  });

});
