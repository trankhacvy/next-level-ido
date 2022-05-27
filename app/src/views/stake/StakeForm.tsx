import NumberFormat from "react-number-format";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "components/Toast";
import Button from "components/Button";
import AppProgram from "libs/program";
import { useState } from "react";
import { useBalanceContext } from "context/balanceContext";
import { useAnchorProvider } from "hooks/useProvider";
import { wait } from "utils/wait";

export type StakeFormProps = {
  type?: "stake" | "unstake";
};

const StakeForm = ({ type = "stake" }: StakeFormProps) => {
  const { sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const provider = useAnchorProvider();
  const { ariBalance, xAriBalance, refetchBalance } = useBalanceContext();

  const insufficientStake = amount > ariBalance.toNumber();
  const insufficientUnstake = amount > xAriBalance.toNumber();
  const insufficientFund =
    (type === "stake" && insufficientStake) ||
    (type === "unstake" && insufficientUnstake);

  const handleStake = async () => {
    try {
      if (amount === 0) return;
      setLoading(true);
      const program = new AppProgram(provider);
      // if (type === "stake") {
      //   await program.stake(amount, sendTransaction);
      // } else {
      //   await program.unstake(amount, sendTransaction);
      // }
      await program.stake(amount, sendTransaction);
      await wait(1000);
      await refetchBalance();
      setAmount(0);
      setLoading(false);
      toast.success({
        title: "Stake successfully",
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Stake error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    try {
      if (amount === 0) return;
      setLoading(true);
      const program = new AppProgram(provider);
      await program.unstake(amount, sendTransaction);
      await wait(1000);
      await refetchBalance();
      setAmount(0);
      setLoading(false);
      toast.success({
        title: "Unstake successfully",
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: "Unstake error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  const handleSetMax = () => {
    setAmount(
      type === "stake" ? ariBalance.toNumber() : xAriBalance.toNumber()
    );
  };

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 border flex items-center p-4 space-x-4">
        <div className="w-10 h-10">
          <img src="/assets/images/ari.png" width={38} height={40} />
        </div>
        <span className="heading-h6 hidden md:inline-block font-bold">
          {type === "stake" ? "$ARI" : "$xARI"}
        </span>
        <div className="flex-1">
          <NumberFormat
            thousandSeparator=","
            decimalSeparator="."
            allowNegative={false}
            value={amount}
            onValueChange={({ floatValue }) => {
              setAmount(floatValue as any);
            }}
            inputMode="numeric"
            className="w-full px-3 py-2 text-2xl bg-transparent font-semibold text-right focus:outline-none"
          />
        </div>
        <Button onClick={handleSetMax} variant="secondary">
          Max
        </Button>
      </div>
      <div className="text-right mt-8 block space-y-4 space-x-4">
        <Button
          loading={loading}
          disabled={loading || insufficientFund}
          size="large"
          onClick={() => {
            if (type === "stake") {
              handleStake();
            } else {
              handleUnstake();
            }
          }}
        >
          {insufficientFund
            ? "Insufficient Fund"
            : type === "stake"
            ? "Stake"
            : "Unstake"}
        </Button>
      </div>
    </div>
  );
};

export default StakeForm;
