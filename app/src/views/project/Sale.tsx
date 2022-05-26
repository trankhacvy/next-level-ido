import { Project } from "types/common";
import dayjs from "dayjs";
import Button from "components/Button";
import {
  useGetIDOPool,
  useGetStakeUser,
  useGetUserIDO,
} from "hooks/useGetIdoPool";
import { toast } from "components/Toast";
import numeral from "numeral";
import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "hooks/useProvider";
import AppProgram from "libs/program";
import { BN } from "bn.js";
import { wait } from "utils/wait";
import { bnDivDecimals } from "utils/number";

type SaleItemProps = {
  project: Project;
};

const SaleItem = ({ project }: SaleItemProps) => {
  const now = dayjs();

  const { name, sale_start, sale_end } = project;
  const {
    isWhitelist,
    tier,
    isLoading: isLoadingStakeUser,
  } = useGetStakeUser();
  const {
    userIdoAccount,
    isLoading: isLoadingIDOUser,
    mutate,
  } = useGetUserIDO();
  const { isLoading: isLoadingPool, getClaimableToken } = useGetIDOPool(
    project.name
  );
  const [loading, setLoading] = useState(false);
  const provider = useAnchorProvider();
  const { sendTransaction, connected } = useWallet();

  const hasAllocation = userIdoAccount?.allocation.gt(new BN(0));
  const fundCommitted = !!userIdoAccount?.depositAmount;

  const saleStatus = dayjs(sale_start).isAfter(now)
    ? "TBD"
    : now.isBetween(dayjs(sale_start), dayjs(sale_end))
    ? "On-Going"
    : "Done";

  const handleCommitFund = async () => {
    try {
      setLoading(true);
      const program = new AppProgram(provider);
      await program.commitFund(name, new BN(0), sendTransaction);
      setLoading(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setLoading(false);
    }
  };

  const checkAllocation = async () => {
    try {
      setLoading(true);
      const program = new AppProgram(provider);
      await program.checkAllocation(name);
      await wait(1000);
      await mutate();
      setLoading(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setLoading(false);
    }
  };

  const claimRemainingFund = async () => {
    try {
      setLoading(true);
      const program = new AppProgram(provider);
      await program.claimRemainingFund(name, sendTransaction);
      await wait(1000);
      await mutate();
      setLoading(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setLoading(false);
    }
  };

  const claimToken = async () => {
    try {
      setLoading(true);
      const program = new AppProgram(provider);
      await program.claimToken(name, sendTransaction);
      await wait(1000);
      await mutate();
      setLoading(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setLoading(false);
    }
  };
  console.log('userIdoAccount', userIdoAccount?.remainingAmount.toString())
  const saleSection = useMemo(() => {
    if (!connected || !isWhitelist) return null;

    if (isWhitelist) {
      if (!hasAllocation) {
        return (
          <div className="mt-10">
            <Button loading={loading} onClick={checkAllocation}>
              Check Allocation
            </Button>
          </div>
        );
      }

      const allocation = getClaimableToken(tier as any);

      return (
        <div className="mt-10">
          {!!userIdoAccount?.remainingAmount &&
            userIdoAccount.remainingAmount.gt(new BN(0)) && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-body2">Change</div>
                  <h5 className="heading-h5">
                    {numeral(
                      bnDivDecimals(userIdoAccount.remainingAmount).toNumber()
                    ).format("0,0")}{" "}
                    {project.deposit_token.ticker}
                  </h5>
                </div>
                <Button
                  className="mt-4"
                  loading={loading}
                  onClick={claimRemainingFund}
                >
                  Claim Change
                </Button>
              </>
            )}
          <div className="flex items-center justify-between mt-4">
            <div className="text-body2">Allocation</div>
            <h5 className="heading-h5">
              {numeral(allocation).format("0,0")} {project.sale_token.ticker}
            </h5>
          </div>
          <div className="flex items-center justify-end mt-6 space-x-4">
            <Button loading={loading} onClick={claimToken}>
              Claim Token
            </Button>
            <Button
              variant="secondary"
              loading={loading}
              onClick={handleCommitFund}
            >
              Refund
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-10">
        <h5 className="heading-h5">You are not whitelisted</h5>
      </div>
    );
  }, [
    isWhitelist,
    connected,
    hasAllocation,
    fundCommitted,
    userIdoAccount,
    loading,
    tier,
    getClaimableToken,
    checkAllocation,
    claimRemainingFund,
    claimToken,
  ]);

  if (isLoadingStakeUser || isLoadingIDOUser || isLoadingPool)
    return <h2>loading ...</h2>;

  return (
    <div className="relative flex items-center py-4">
      <div className="absolute w-1 border-l-[1.5px] border-l-primary/[0.8] border-dashed left-[40px] top-0 bottom-0 z-[-1]" />
      <div className="mr-4 text-center card w-20 h-20 p-4 flex flex-col items-center justify-center">
        {sale_start ? (
          <>
            <div className="text-caption font-medium">
              {dayjs(sale_start).format("MMM")}
            </div>
            <div className="text-h3 font-semibold">
              {dayjs(sale_start).format("DD")}
            </div>
          </>
        ) : (
          <div className="text-h3 font-semibold">TBD</div>
        )}
      </div>
      <div className="card rounded-2xl flex-1 p-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Sale</div>
          <div className="flex items-center space-x-2">
            <div className="text-xl font-semibold uppercase">{saleStatus}</div>
          </div>
        </div>
        {saleSection}
      </div>
    </div>
  );
};

export default SaleItem;
