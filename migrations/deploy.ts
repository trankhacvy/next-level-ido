// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import {
  Program,
  setProvider,
  AnchorProvider,
  BN,
  workspace,
  web3,
} from "@project-serum/anchor";
import { handleAirdrop } from "../tests/utils";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { Keypair, PublicKey } from "@solana/web3.js";

function IdoTimes() {
  this.startIdo;
  this.endDeposts;
  this.endIdo;
  this.endEscrow;
}

module.exports = async function (provider) {
  console.log("run migration");
  // Configure client to use the provider.
  setProvider(provider);

  const program =
    workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  const payer = web3.Keypair.generate();
  await handleAirdrop(provider, payer.publicKey);
  const walletPubkey = new PublicKey(
    "63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs"
  );
  await handleAirdrop(provider, walletPubkey);

  const ariTokenMintPubkey = await createMint(
    provider.connection,
    payer,
    payer.publicKey,
    null,
    6
  );
  console.log("ariTokenMintPubkey", ariTokenMintPubkey.toBase58());
  const walletATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    payer,
    ariTokenMintPubkey,
    walletPubkey
  );

  await mintTo(
    provider.connection,
    payer,
    ariTokenMintPubkey,
    walletATA.address,
    payer,
    50_000 * 10 ** 6
  );

  const ariXTokenMintPubkey = await createMint(
    provider.connection,
    payer,
    payer.publicKey,
    null,
    6
  );
  console.log("ariXTokenMintPubkey", ariXTokenMintPubkey.toBase58());

  const [stakePoolAriVault] = await web3.PublicKey.findProgramAddress(
    [Buffer.from("vault"), ariTokenMintPubkey.toBuffer()],
    program.programId
  );

  try {
    await program.rpc.initializeStakePool({
      accounts: {
        tokenMint: ariTokenMintPubkey,
        tokenVault: stakePoolAriVault,
        tokenAuthority: payer.publicKey,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [payer],
    });
    console.log("initializeStakePool success");
    await program.rpc.reclaimMintAuthority({
      accounts: {
        tokenMint: ariTokenMintPubkey,
        xTokenMint: ariXTokenMintPubkey,
        tokenVault: stakePoolAriVault,
        tokenAuthority: payer.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [payer],
    });
    console.log("reclaimMintAuthority success");

    // init ido
    initIDOPool(provider, program, payer, walletPubkey);
  } catch (error) {
    console.error(error);
  }
};

const initIDOPool = async (
  provider: AnchorProvider,
  program: Program<NextLevelIdoPlatform>,
  payer: Keypair,
  walletPubkey: PublicKey
) => {
  try {
    // init ido
    const idoName = "Moonfrost";

    const wls = "2022-05-24 12:00:00+00";
    const wle = "2022-05-25 12:00:00+00";
    const ss = "2022-05-25 17:00:00+00";
    const se = "2022-05-37 14:00:00+00";
    const claim = "2022-06-01 14:00:00+00";

    const idoTimes = new IdoTimes();
    idoTimes.whitelistStart = new BN(new Date(wls).getTime() / 1000);
    idoTimes.whitelistEnd = new BN(new Date(wle).getTime() / 1000);
    idoTimes.saleStart = new BN(new Date(ss).getTime() / 1000);
    idoTimes.saleEnd = new BN(new Date(se).getTime() / 1000);
    idoTimes.claimStart = new BN(new Date(claim).getTime() / 1000);

    const programId = program.programId;

    let [idoPool] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName)],
      programId
    );

    // create ido token
    const idoTokenMint = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("idoTokenMint", idoTokenMint.toBase58());
    const idoTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      payer,
      idoTokenMint,
      payer.publicKey
    );

    await mintTo(
      provider.connection,
      payer,
      idoTokenMint,
      idoTokenAccount.address,
      payer,
      1_000_000 * 10 ** 6
    );

    const usdcTokenMint = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("usdcTokenMint", usdcTokenMint.toBase58());

    const walletUSDCTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      payer,
      usdcTokenMint,
      walletPubkey
    );

    await mintTo(
      provider.connection,
      payer,
      usdcTokenMint,
      walletUSDCTokenAccount.address,
      payer,
      1_000_000 * 10 ** 6
    );

    const [redeemableMint] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("redeemable_mint")],
      programId
    );

    const [idoTokenVault] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("ido_token_vault")],
      programId
    );

    const [usdcVault] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(idoName), Buffer.from("usdc_vault")],
      programId
    );

    // @ts-ignore
    await program.methods
      .initializeIdoPool(
        // @ts-ignore
        idoName,
        new BN("180000").mul(new BN(10 ** 6)),
        new BN("2000").mul(new BN(10 ** 6)),
        new BN("3"),
        new BN("10"),
        idoTimes as any
      )
      .accounts({
        idoAuthority: payer.publicKey,
        idoAuthorityToken: idoTokenAccount.address,
        idoPool,
        idoTokenMint,
        idoTokenVault,
        redeemableMint,
        usdcMint: usdcTokenMint,
        usdcVault,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([payer])
      .rpc();
    console.log("initializeIdoPool success");

    await program.methods
      .simulatePoolPaticipants()
      .accounts({
        idoAuthority: payer.publicKey,
        idoPool,
      })
      .signers([payer])
      .rpc();
    console.log("simulatePoolPaticipants success");
  } catch (error) {
    console.error(error);
  }
};
