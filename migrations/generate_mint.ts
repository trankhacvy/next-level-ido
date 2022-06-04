import { web3 } from "@project-serum/anchor";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { getPayer, createConnection } from "./utils";

const userPubkey = new web3.PublicKey(
  "63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs" // push you wallet public key here
);

const main = async () => {
  try {
    const payer = getPayer();
    const connection = await createConnection();

    const ariTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("ARI_MINT_TOKEN", ariTokenMint.toBase58());

    const userAriTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      ariTokenMint,
      userPubkey
    );

    await mintTo(
      connection,
      payer,
      ariTokenMint,
      userAriTokenAccount.address,
      payer,
      50_000 * 10 ** 6
    );

    const ariXTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("X_ARI_MINT_TOKEN", ariXTokenMint.toBase58());

    const idoTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );

    console.log("IDO_TOKEN_MINT", idoTokenMint.toBase58());

    const usdcTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("USDC_TOKEN_MINT", usdcTokenMint.toBase58());
  } catch (error) {
    console.error(error);
  }
};

main();
