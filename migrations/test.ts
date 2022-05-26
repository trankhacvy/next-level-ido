import fs from "fs";
import path from "path";
import {
  Program,
  setProvider,
  AnchorProvider,
  Wallet,
  BN,
  workspace,
  web3,
} from "@project-serum/anchor";

const getPayer = () => {
  const rawdata = fs.readFileSync(path.resolve("migrations/keys/payer.json"));
  const keyData = JSON.parse(rawdata.toString());
  return web3.Keypair.fromSecretKey(new Uint8Array(keyData));
};

const createProvider = (payer: web3.Keypair) => {
  const url = "http://localhost:8899";
  const preflightCommitment = "recent";
  const connection = new web3.Connection(url, preflightCommitment);
  const wallet = new Wallet(payer);

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment,
    commitment: "recent",
  });
  return provider;
};

const main = () => {
  try {
    const payer = getPayer();
    const provider = createProvider(payer);
    console.log("done", payer.publicKey.toBase58());
  } catch (error) {
    console.error(error);
  }
};

main();
