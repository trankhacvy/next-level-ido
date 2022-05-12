import fs from 'fs'
import * as bip39 from "bip39";
import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, createMint, mintTo, Account, getOrCreateAssociatedTokenAccount, createAssociatedTokenAccount } from '@solana/spl-token';
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";

const walletAddresss = 'CDXLgstdVZJ7qUh3DC1mAGuCmTM3UiS1M24m44t3UViS'
const DEFAULT_TOKEN_AMOUNT = 1_000_000;

let payer: web3.Keypair;
let wallet: web3.Keypair;

const provider = anchor.Provider.env();
anchor.setProvider(provider);
const connection = provider.connection;

const generatePayer = async () => {
  payer = web3.Keypair.generate();

  const phantomKey = fs.readFileSync('./phantom_wallet.json');
  const seed =  Uint8Array.from(phantomKey).slice(0, 32)
  wallet =  web3.Keypair.fromSeed(seed);

  const signature1 = await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL);
  const signature2 = await connection.requestAirdrop(wallet.publicKey, web3.LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature1);
  await connection.confirmTransaction(signature2);

}

const generateMintToken = async () => {
    await generatePayer();

    const mintPubkey = await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        9
      );
    console.log('Mint token created ', mintPubkey.toBase58());

    const walletTokenAccount = await createAssociatedTokenAccount(
        connection,
        payer,
        mintPubkey,
        new web3.PublicKey(wallet.publicKey),
      );
    console.log('walletTokenAccount created ', walletTokenAccount.toBase58())    
    
    try {
      // mint to ATA
    await mintTo(
      connection,
      payer,
      mintPubkey,
      walletTokenAccount,
      payer,
      DEFAULT_TOKEN_AMOUNT,
  );  
    } catch (error) {
      console.error(error);
    }

}

generateMintToken();