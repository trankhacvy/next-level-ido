const anchor = require("@project-serum/anchor");

const run = async () => {
  console.log("run");
  const url = "http://localhost:8899";
  const preflightCommitment = "recent";
  const connection = new anchor.web3.Connection(url, preflightCommitment);
  const wallet = anchor.Wallet.local();

  const provider = new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment,
    commitment: "recent",
  });
  console.log("url", provider);
};

run();
