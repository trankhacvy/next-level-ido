import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";
import dotenv from "dotenv";
import fetch from "isomorphic-unfetch";
import dayjs from "dayjs";
import {
  Program,
  setProvider,
  AnchorProvider,
  Wallet,
  BN,
  workspace,
  web3,
} from "@project-serum/anchor";
import { IDO_ID, IDO_NAME, getPayer, getIdoTimes } from "./utils";

dotenv.config();

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

const updateDB = async (type: string) => {
  await fetch("http://localhost:3000/api/update-ido", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: IDO_ID,
      type, // sale
    }),
  });
};

const updateOnChain = async (type: string) => {
  const payer = getPayer();
  const provider = createProvider(payer);
  setProvider(provider);

  const program =
    workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  let [idoPool] = await web3.PublicKey.findProgramAddress(
    [Buffer.from(IDO_NAME)],
    program.programId
  );

  const idoTime = getIdoTimes();

  if (type === "whitelist") {
    const end_whitelist = dayjs().subtract(4, "h");
    const start_whitelist = end_whitelist.subtract(1, "d");
    idoTime.whitelistEnd = new BN(end_whitelist.toDate().getTime() / 1000);
    idoTime.whitelistStart = new BN(start_whitelist.toDate().getTime() / 1000);
  }

  if (type === "sale") {
    const end_sale = dayjs().subtract(4, "h");
    const start_sale = end_sale.subtract(1, "d");
    const end_whitelist = start_sale.subtract(4, "h");
    const start_whitelist = end_whitelist.subtract(1, "d");

    idoTime.whitelistEnd = new BN(end_whitelist.toDate().getTime() / 1000);
    idoTime.whitelistStart = new BN(start_whitelist.toDate().getTime() / 1000);
    idoTime.saleStart = new BN(start_sale.toDate().getTime() / 1000);
    idoTime.saleEnd = new BN(end_sale.toDate().getTime() / 1000);
  }

  await program.methods
    .updateIdoPool(IDO_NAME, null, null, null, null, idoTime)
    .accounts({
      idoAuthority: payer.publicKey,
      idoPool,
    })
    .signers([payer])
    .rpc();
};

const main = async () => {
  try {
    const args = process.argv.slice(2);
    const type = args[0];
    if (type !== "whitelist" && type !== "sale" && type !== "distribution")
      return;
    console.log("type", type);
    updateDB(type);
    updateOnChain(type);
  } catch (error) {
    console.error(error);
  }
};

main();
