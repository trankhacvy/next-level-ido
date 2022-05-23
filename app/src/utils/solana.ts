import { PublicKey } from '@solana/web3.js'
import { ARIPublicKey } from 'common/token';

export const getAriTokenVault = (programId: PublicKey) => {
    return  PublicKey.findProgramAddress(
        [Buffer.from("vault"), ARIPublicKey.toBuffer()],
        programId
      );
}

export const getUserPDA = (publicKey: PublicKey, programId: PublicKey) => {
    return  PublicKey.findProgramAddress(
        [Buffer.from("user"), publicKey.toBuffer() ],
        programId
      );
}