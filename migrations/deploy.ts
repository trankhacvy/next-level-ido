// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import { Program, setProvider, workspace, web3 } from "@project-serum/anchor";
import { handleAirdrop } from '../tests/utils'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const { PublicKey } = web3

const NEXT_PUBLIC_LOTO_MINT_TOKEN = "9SroHSrW2wNqorK41Fy2Pe3ztNA826TJUYosAzc23D2o"
const NEXT_PUBLIC_X_LOTO_MINT_TOKEN = "BhEtKLfDqPSwCFkaunirEdgDZWAsdk5HCYHzVZDP7hYK"

module.exports = async function (provider) {
  console.log('run migration');
  // Configure client to use the provider.
  setProvider(provider);

  // Add your deploy script here.

  const program = workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  const payer = web3.Keypair.generate();
  await handleAirdrop(provider, payer.publicKey);

  const ariTokenMintPubkey = new PublicKey(NEXT_PUBLIC_LOTO_MINT_TOKEN);

  const [xAriTokenMintPubkey] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("mint"), ariTokenMintPubkey.toBuffer()],
        program.programId
      );
  console.log('xAriTokenMintPubkey', xAriTokenMintPubkey.toBase58())      
  const [vaultPubkey] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("vault"), ariTokenMintPubkey.toBuffer()],
        program.programId
      );

  try {
    await program.rpc.initializeStakePool(
      {
        accounts: {
          tokenMint: ariTokenMintPubkey,
          xTokenMint: xAriTokenMintPubkey,
          tokenVault: vaultPubkey,
          tokenAuthority: payer.publicKey,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [payer],
      }
    );
  } catch (error) {
    console.error(error)
  }

};
