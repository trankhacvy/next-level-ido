import { PublicKey } from "@solana/web3.js"

export const ARI_MINT_TOKEN = process.env.NEXT_PUBLIC_ARI_MINT_TOKEN as string
export const X_ARI_MINT_TOKEN = process.env.NEXT_PUBLIC_X_ARI_MINT_TOKEN as string //"8ZTDdWCPCwYi8z97dnr1kVvaM1eapndZeVNY1PCZjEcb"
export const USDC_MINT_TOKEN = process.env.NEXT_PUBLIC_USDC_TOKEN_MINT as string //"8ZTDdWCPCwYi8z97dnr1kVvaM1eapndZeVNY1PCZjEcb"
export const IDO_MINT_TOKEN = process.env.NEXT_PUBLIC_IDO_TOKEN_MINT as string //"8ZTDdWCPCwYi8z97dnr1kVvaM1eapndZeVNY1PCZjEcb"

export const ARIPublicKey = new PublicKey(ARI_MINT_TOKEN);

export const xARIPublicKey = new PublicKey(X_ARI_MINT_TOKEN);

export const usdcPublicKey = new PublicKey(USDC_MINT_TOKEN);

export const idoMintPublicKey = new PublicKey(IDO_MINT_TOKEN);