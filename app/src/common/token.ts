import { PublicKey } from "@solana/web3.js"

export const LOTO_MINT_TOKEN = process.env.NEXT_PUBLIC_LOTO_MINT_TOKEN as string

export const lotoPublicKey = new PublicKey(LOTO_MINT_TOKEN);

export const X_LOTO_MINT_TOKEN = "8ZTDdWCPCwYi8z97dnr1kVvaM1eapndZeVNY1PCZjEcb"

export const xLotoPublicKey = new PublicKey(X_LOTO_MINT_TOKEN);