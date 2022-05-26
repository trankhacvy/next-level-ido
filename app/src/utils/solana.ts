import { PublicKey } from "@solana/web3.js";
import { ARIPublicKey } from "common/token";

export const getAriTokenVault = (programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from("vault"), ARIPublicKey.toBuffer()],
    programId
  );
};

export const getUserPDA = (publicKey: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from("user"), publicKey.toBuffer()],
    programId
  );
};

export const getIDOUserPDA = (publicKey: PublicKey, programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from("ido_user"), publicKey.toBuffer()],
    programId
  );
};

export const getPoolPDA = (idoName: String, programId: PublicKey) => {
  return PublicKey.findProgramAddress([Buffer.from(idoName)], programId);
};

export const getRedeemableMintPDA = (idoName: String, programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(idoName), Buffer.from("redeemable_mint")],
    programId
  );
};

export const getUserRedeemablePDA = (
  pubkey: PublicKey,
  idoName: String,
  programId: PublicKey
) => {
  return PublicKey.findProgramAddress(
    [pubkey.toBuffer(), Buffer.from(idoName), Buffer.from("user_redeemable")],
    programId
  );
};

export const getUSDCVaultPDA = (idoName: String, programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(idoName), Buffer.from("usdc_vault")],
    programId
  );
};

export const getIdoTokenVaultPDA = (idoName: String, programId: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(idoName), Buffer.from("ido_token_vault")],
    programId
  );
};
