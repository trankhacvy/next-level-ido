import fs from "fs";
import path from "path";
import { web3, Wallet, AnchorProvider, BN } from "@project-serum/anchor";

export const IDO_NAME = "Moonfrost";
export const IDO_ID = "98cd6940-daa6-4526-b22c-790c12c9a8bb";
export const IDO_TOTAL_TOKEN = 180_000;
export const IDO_COMMIT_FUND = 3000;
export const IDO_PRICE_NUMBERATOR = 3; // 1 TOKEN = 0.3 USDC
export const IDO_PRICE_DENOMINATOR = 10; //

export const getPayer = () => {
  const rawdata = fs.readFileSync(
    path.resolve("/Users/khacvy/.config/solana/id.json")
  );
  const keyData = JSON.parse(rawdata.toString());
  return web3.Keypair.fromSecretKey(new Uint8Array(keyData));
};

export const createProvider = (payer: web3.Keypair) => {
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

export const createConnection = async () => {
  const url = "http://localhost:8899";
  const preflightCommitment = "recent";
  const connection = new web3.Connection(url, preflightCommitment);

  return connection;
};

export const getIdoTimes = () => {
  const wls = "2022-05-26T05:00:00+00:00"; // Thu May 26 2022 12:00:00 GMT+0700 (Indochina Time) {}
  const wle = "2022-05-29T12:00:00+00:00"; // Sun May 29 2022 19:00:00 GMT+0700 (Indochina Time) {}
  const ss = "2022-05-29T17:00:00+00:00"; // Mon May 30 2022 00:00:00 GMT+0700 (Indochina Time)
  const se = "2022-05-31T14:00:00+00:00"; // Tue May 31 2022 21:00:00 GMT+0700 (Indochina Time) {}
  const claim = "2022-07-02T15:24:58+00:00"; // Sat Jul 02 2022 22:24:58 GMT+0700 (Indochina Time)

  return {
    whitelistStart: new BN(new Date(wls).getTime() / 1000),
    whitelistEnd: new BN(new Date(wle).getTime() / 1000),
    saleStart: new BN(new Date(ss).getTime() / 1000),
    saleEnd: new BN(new Date(se).getTime() / 1000),
    claimStart: new BN(new Date(claim).getTime() / 1000),
  };
};
