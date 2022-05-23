import { BN } from '@project-serum/anchor'
import { ARI_DECIMALS } from 'common/constants';

export const bigintToBN = (num: bigint = BigInt(0), decimals = ARI_DECIMALS) => {
    return new BN(num.toString()).div(new BN(10**decimals));
}