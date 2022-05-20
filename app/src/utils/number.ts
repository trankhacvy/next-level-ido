import { BN } from '@project-serum/anchor'

export const bigintToBN = (num: bigint = BigInt(0), decimals = 9) => {
    return new BN(num.toString()).div(new BN(10**decimals));
}