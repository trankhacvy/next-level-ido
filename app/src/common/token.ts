import { PublicKey } from "@solana/web3.js"

export const ARI_MINT_TOKEN = process.env.NEXT_PUBLIC_ARI_MINT_TOKEN as string

export const ARIPublicKey = new PublicKey(ARI_MINT_TOKEN);

export const X_ARI_MINT_TOKEN = process.env.NEXT_PUBLIC_X_ARI_MINT_TOKEN as string //"8ZTDdWCPCwYi8z97dnr1kVvaM1eapndZeVNY1PCZjEcb"

export const xARIPublicKey = new PublicKey(X_ARI_MINT_TOKEN);