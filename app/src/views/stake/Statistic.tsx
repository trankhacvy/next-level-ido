import CountUp from "react-countup";
import { BN } from "@project-serum/anchor";
import { useBalanceContext } from "context/balanceContext";

const Statistic = () => {
  const { ariBalance, xAriBalance } = useBalanceContext();
  return (
    <div className="w-full card p-8 space-y-10">
      <Item balance={ariBalance} token="$LOTO" bottomText="Available to lock" />
      <Item balance={xAriBalance} token="$xLOTO" bottomText="Amount locked" />
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
