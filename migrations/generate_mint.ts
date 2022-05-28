import {
  web3,
} from "@project-serum/anchor";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import {
  getPayer,
  createConnection,
} from "./utils";

const userPubkey = new web3.PublicKey(
  "63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs"
);

const main = async () => {
  try {
    const payer = getPayer();
    console.log("payer", payer.publicKey.toBase58());
    const connection = await createConnection();

    const ariTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("ariTokenMintPubkey", ariTokenMint.toBase58());

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
    console.log("ariXTokenMintPubkey", ariXTokenMint.toBase58());

    const idoTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );

    console.log("idoTokenMint", idoTokenMint.toBase58());

    const usdcTokenMint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );
    console.log("usdcTokenMint", usdcTokenMint.toBase58());
  } catch (error) {
    console.error(error);
  }
};

main();
