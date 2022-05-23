// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import { Program, setProvider, workspace, web3 } from "@project-serum/anchor";
import { handleAirdrop } from '../tests/utils'
import { TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';

const { PublicKey } = web3

module.exports = async function (provider) {
  console.log('run migration');
  // Configure client to use the provider.
  setProvider(provider);

  const program = workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  const payer = web3.Keypair.generate();
  await handleAirdrop(provider, payer.publicKey);

  const ariTokenMintPubkey = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      null,
      6,
  );
  console.log('ariTokenMintPubkey', ariTokenMintPubkey.toBase58())  
  const walletATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    payer,
    ariTokenMintPubkey,
    new PublicKey("63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs"),
);
  console.log('walletATA', walletATA.address.toBase58())  

  await mintTo(
    provider.connection,
    payer,
    ariTokenMintPubkey,
    walletATA.address,
    payer,
    1000 * 10**6,
);

  const ariXTokenMintPubkey = await createMint(
    provider.connection,
    payer,
    payer.publicKey,
    null,
    6,
  );
  console.log('ariXTokenMintPubkey', ariXTokenMintPubkey.toBase58())  
  
  const [stakePoolAriVault] =
  await web3.PublicKey.findProgramAddress(
      [Buffer.from("vault"), ariTokenMintPubkey.toBuffer()],
      program.programId
  );    

  try {
    await program.rpc.initializeStakePool(
      {
        accounts: {
          tokenMint: ariTokenMintPubkey,
          tokenVault: stakePoolAriVault,
          tokenAuthority: payer.publicKey,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [payer],
      }
    );
    console.log('initializeStakePool success')  
    await program.rpc.reclaimMintAuthority(
      {
          accounts: {
              tokenMint: ariTokenMintPubkey,
              xTokenMint: ariXTokenMintPubkey,
              tokenVault: stakePoolAriVault,
              tokenAuthority: payer.publicKey,
              tokenProgram: TOKEN_PROGRAM_ID,
          },
          signers: [payer],
      }
  );
  console.log('reclaimMintAuthority success')  
  } catch (error) {
    console.error(error)
  }


};
