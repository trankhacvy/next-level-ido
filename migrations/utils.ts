import fs from "fs";
import path from "path";
import { web3, BN } from "@project-serum/anchor";

export const IDO_NAME = "Moonfrost";
export const IDO_ID = "98cd6940-daa6-4526-b22c-790c12c9a8bb";
export const IDO_TOTAL_TOKEN = 180_000;
export const IDO_COMMIT_FUND = 3000;
export const IDO_PRICE_NUMBERATOR = 3; // 1 TOKEN = 0.3 USDC
export const IDO_PRICE_DENOMINATOR = 10; //

export const getPayer = () => {
  const rawdata = fs.readFileSync(
    // replace with your key
    path.resolve("/Users/khacvy/.config/solana/id.json")
  );
  const keyData = JSON.parse(rawdata.toString());
  return web3.Keypair.fromSecretKey(new Uint8Array(keyData));
};

export const createConnection = async () => {
  const url = "http://localhost:8899";
  // const url = "https://api.devnet.solana.com";
  const preflightCommitment = "recent";
  const connection = new web3.Connection(url, preflightCommitment);

  return connection;
};

export const getIdoTimes = () => {
  const wls = "2022-05-28T05:00:00+00:00";
  const wle = "2022-05-30T12:00:00+00:00";
  const ss = "2022-05-31T17:00:00+00:00";
  const se = "2022-06-01T14:00:00+00:00";
  const claim = "2022-06-02T15:24:58+00:00";

  return {
    whitelistStart: new BN(new Date(wls).getTime() / 1000),
    whitelistEnd: new BN(new Date(wle).getTime() / 1000),
    saleStart: new BN(new Date(ss).getTime() / 1000),
    saleEnd: new BN(new Date(se).getTime() / 1000),
    claimStart: new BN(new Date(claim).getTime() / 1000),
  };
};
