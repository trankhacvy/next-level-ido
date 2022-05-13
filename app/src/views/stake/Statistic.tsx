import CountUp from "react-countup";
import { useTokenBalance } from "hooks/useGetBalance";
import { LOTO_MINT_TOKEN, X_LOTO_MINT_TOKEN } from "common/token";
import { BN } from "@project-serum/anchor";

const Statistic = () => {
  const { balance: lotoBalance } = useTokenBalance(LOTO_MINT_TOKEN);
  const { balance: xLotoBalance } = useTokenBalance(X_LOTO_MINT_TOKEN);

  return (
    <div className="w-full card p-8 space-y-10">
      <Item
        balance={lotoBalance}
        token="$LOTO"
        bottomText="Available to lock"
      />
      <Item balance={xLotoBalance} token="$xLOTO" bottomText="Amount locked" />
    </div>
  );
};

type ItemProps = {
  balance: BN;
  token?: string;
  bottomText?: string;
};

const Item = ({ balance, token, bottomText }: ItemProps) => {
  return (
    <div className="text-center">
      <img
        src="/assets/images/pancake-swap-token.png"
        className="inline-flex"
        width={64}
        height={64}
      />
      <div className="heading-h3 mt-6 mb-2 space-x-2">
        <CountUp end={balance.toNumber()} separator="," duration={3} />
        <span>{token}</span>
      </div>
      <div className="text-body1">{bottomText}</div>
    </div>
  );
};

export default Statistic;
