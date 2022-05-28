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
import TimelineItem from "components/TimelineItem";

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

  const isUpcoming = dayjs(now).isBefore(sale_start);
  const isEnded = dayjs(now).isAfter(sale_end);
  const isOnGoing = dayjs(now).isBetween(sale_start, sale_end);

  const saleStatus = isUpcoming ? "TBD" : isOnGoing ? "On-Going" : "Done";

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

  const saleSection = useMemo(() => {
    if (!connected || isUpcoming) return null;

    const hasAllocation = userIdoAccount?.allocation.gt(new BN(0));
    const isCommited = !!userIdoAccount?.depositAmount;
    const hasRemainingAmount = !!userIdoAccount?.remainingAmount;
    const claimed = !!userIdoAccount?.claimed;

    if (isWhitelist) {
      if (isEnded && !isCommited) {
        return <h5 className="heading-h5 text-primary">NOT REGISTERED</h5>;
      }

      if (!hasAllocation && !claimed) {
        return (
          <div className="text-right">
            <Button loading={loading} onClick={checkAllocation}>
              Check Allocation
            </Button>
          </div>
        );
      }

      const allocation = getClaimableToken(tier as any);

      return (
        <div>
          {hasRemainingAmount && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h5 className="text-body1 text-gray-600">Remaining Fund</h5>
                <h5 className="heading-h5">
                  {numeral(
                    bnDivDecimals(userIdoAccount.remainingAmount).toNumber()
                  ).format("0,0")}{" "}
                  {project.deposit_token.ticker}
                </h5>
              </div>
              {userIdoAccount.remainingAmount.gt(new BN("0")) && (
                <div className="flex items-center justify-end mt-2">
                  <Button loading={loading} onClick={claimRemainingFund}>
                    Claim Fund
                  </Button>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-body1 text-gray-600">Allocation</div>
            <h5 className="heading-h5">
              {numeral(allocation).format("0,0")} {project.sale_token.ticker}
            </h5>
          </div>
        </div>
      );
    } else {
      return <h5 className="heading-h5">You are not whitelisted</h5>;
    }
  }, [
    isWhitelist,
    isUpcoming,
    isOnGoing,
    isEnded,
    connected,
    userIdoAccount,
    loading,
    tier,
    getClaimableToken,
    checkAllocation,
    claimRemainingFund,
    claimToken,
  ]);

  const isLoading = isLoadingStakeUser || isLoadingIDOUser || isLoadingPool;
  console.log("sale", userIdoAccount?.depositAmount.toNumber());
  return (
    <TimelineItem
      title="Sale"
      date={sale_start}
      status={saleStatus}
      disabled={isUpcoming || isLoading || !connected}
    >
      {!isLoading && saleSection}
    </TimelineItem>
  );
};

export default SaleItem;
// 2000000000
// 2597402596