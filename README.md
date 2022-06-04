# ARI - The IDO Platform on Solana Blockchain
## Overview
- This is source code of ARI project which participate Vietnam Web3 Coding Camp 2022

Suggestions and PRs welcome!

**Note: This is experimental software for a young ecosystem. Use at your own risk. The author is not responsible for misuse of the software or for the user failing to test specific commands on devnet before using on production.**

## Running in development
- Make sure you have all toolings for solana development.

#### 1. Prepare
- Change `app/.env.example` to `app/.env` 
- Replace "63EEC9FfGyksm7PkVC6z8uAmqozbQcTzbkWJNsgqjkFs" (my wallet public key) on `migrations/generate_mint.ts` and `migrations/deploy.ts` with your wallet public key.
- In `migrations/utils.ts`, replace `path.resolve("/Users/khacvy/.config/solana/id.json")` with you keypair
- Run solana test validator on separate command line tab `solana-test-validator --reset`
- Switch to localhost cluster if you're not. `solana config set --url=localhost`

#### 2. Generate token mint accounts
```
yarn mint
```
These are 4 mint token account addresses (ARI token mint, xARI token mint, IDO Token mint, USDC token mint) display on console. Copy and replace them on `migrations/deploy.ts` and `app/.env`

#### 3. Build program
```
anchor build
```
To display the generated program ID, run
```
solana-keygen pubkey target/deploy/next_level_ido_platform-keypair.json
```
Copy generated ID and update on `programs/next-level-ido-platform/src/lib.rs` and `app/.env` the run `anchor build` to rebuild program.

#### 3. Deploy program
```
anchor deploy
```

#### 4. Run migration
```
anchor migrate
```

#### 4. Run Frontend App
```
cd app && yarn dev
```

**This instruction work for me, hope it work for you too**