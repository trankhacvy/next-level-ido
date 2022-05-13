import { AnchorProvider } from "@project-serum/anchor";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { toast } from "components/Toast";
import { LOTO_MINT_TOKEN, X_LOTO_MINT_TOKEN } from "common/token";
import Button from "components/Button";
import { useTokenBalance } from "hooks/useGetBalance";
import AppProgram from "libs/program";
import { useState } from "react";

export type StakeFormProps = {
  type?: "stake" | "unstake";
};

const StakeForm = ({ type = "stake" }: StakeFormProps) => {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const { mutate: refreshLotoBalance } = useTokenBalance(LOTO_MINT_TOKEN);
  const { mutate: refreshXLotoBalance } = useTokenBalance(X_LOTO_MINT_TOKEN);

  const handleStake = async () => {
    try {
      setLoading(true);
      const provider = new AnchorProvider(
        connection,
        anchorWallet as AnchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new AppProgram(provider);
      if (type === "stake") {
        await program.stake(amount, sendTransaction);
      } else {
        await program.unstake(amount, sendTransaction);
      }
      await refreshLotoBalance();
      await refreshXLotoBalance();
      setAmount(0);
      setLoading(false);
      toast.success({
        title: "Stake successfully",
      });
    } catch (error: any) {
      console.error(error);
      toast.success({
        title: "Stake error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 border flex items-center p-4 space-x-4">
        <div className="w-10 h-10">
          <img
            src="/assets/images/pancake-swap-token.png"
            width={40}
            height={40}
          />
        </div>
        <span className="heading-h6 hidden md:inline-block font-bold">
          {type === "stake" ? "$LOTO" : "$xLOTO"}
        </span>
        <div className="flex-1">
          <input
            value={amount}
            onChange={(event) => {
              try {
                const val = parseInt(event.target.value);
                setAmount(val);
              } catch (error) {
                setAmount(0);
              }
            }}
            type="number"
            className="w-full px-3 py-2 text-2xl bg-transparent font-semibold text-right focus:outline-none"
          />
        </div>
        <Button variant="secondary">Max</Button>
      </div>
      <div className="text-right mt-8 block space-y-4 space-x-4">
        <Button
          loading={loading}
          disabled={loading}
          size="large"
          onClick={handleStake}
        >
          {type === "stake" ? "Stake" : "Unstake"}
        </Button>
      </div>
    </div>
  );
};

export default StakeForm;
