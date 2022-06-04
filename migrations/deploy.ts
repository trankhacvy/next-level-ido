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
  IDO_NAME,
  IDO_TOTAL_TOKEN,
  IDO_COMMIT_FUND,
  IDO_PRICE_NUMBERATOR,
  IDO_PRICE_DENOMINATOR,
  getIdoTimes,
  getPayer,
} from "./utils";
import {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const ariTokenMint = new web3.PublicKey(
  "623Vgz64SPimZ7B32B7kp8R93YvJ9o6hMJgjx8fS96AF"
);
const ariXTokenMint = new web3.PublicKey(
  "8737ZzSsXVWNaNMwYvpqEuctkEhhXM5d5WbsKPYWPime"
);
const idoTokenMint = new web3.PublicKey(
  "Ehyo3QckgcGJ21DW27gq9HcCb7zRXKLyGhD5VGo9wYdB"
);
const usdcTokenMint = new web3.PublicKey(
  "3Yqpn9ji8XySsu3BeweE9817pRyLRkQioHnmP8b8Z1Ke"
);

const userWallet = new PublicKey(
  "63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs"
);

module.exports = async function (provider) {
  console.log("run migration");
  // Configure client to use the provider.
  setProvider(provider);

  const program =
    workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  await handleAirdrop(provider, userWallet);

  const [stakePoolAriVault] = await web3.PublicKey.findProgramAddress(
    [Buffer.from("vault"), ariTokenMint.toBuffer()],
    program.programId
  );

  try {
    await program.rpc.initializeStakePool({
      accounts: {
        tokenMint: ariTokenMint,
        tokenVault: stakePoolAriVault,
        tokenAuthority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [],
    });
    console.log("initializeStakePool success");

    await program.rpc.reclaimMintAuthority({
      accounts: {
        tokenMint: ariTokenMint,
        xTokenMint: ariXTokenMint,
        tokenVault: stakePoolAriVault,
        tokenAuthority: provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [],
    });
    console.log("reclaimMintAuthority success");

    // init ido
    initIDOPool(provider, program, userWallet);
  } catch (error) {
    console.error(error);
  }
};

const initIDOPool = async (
  provider: AnchorProvider,
  program: Program<NextLevelIdoPlatform>,
  walletPubkey: PublicKey
) => {
  try {
    const payer = getPayer();
    // init ido
    const idoTimes = getIdoTimes();

    const programId = program.programId;

    let [idoPool] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(IDO_NAME)],
      programId
    );

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
      [Buffer.from(IDO_NAME), Buffer.from("redeemable_mint")],
      programId
    );

    const [idoTokenVault] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(IDO_NAME), Buffer.from("ido_token_vault")],
      programId
    );

    const [usdcVault] = await web3.PublicKey.findProgramAddress(
      [Buffer.from(IDO_NAME), Buffer.from("usdc_vault")],
      programId
    );

    await program.methods
      .initializeIdoPool(
        // @ts-ignore
        IDO_NAME,
        new BN(IDO_TOTAL_TOKEN).mul(new BN(10 ** 6)),
        new BN(IDO_COMMIT_FUND).mul(new BN(10 ** 6)),
        new BN(IDO_PRICE_NUMBERATOR),
        new BN(IDO_PRICE_DENOMINATOR),
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
