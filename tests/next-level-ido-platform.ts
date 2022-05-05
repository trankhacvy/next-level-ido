import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { NextLevelIdoPlatform } from "../target/types/next_level_ido_platform";

describe("next-level-ido-platform", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.NextLevelIdoPlatform as Program<NextLevelIdoPlatform>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
