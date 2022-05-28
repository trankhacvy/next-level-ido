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
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "hooks/useProvider";
import AppProgram from "libs/program";
import { BN } from "bn.js";
import { wait } from "utils/wait";
import TimelineItem from "components/TimelineItem";
import { useBoolean } from "usehooks-ts";

type DistributionItemProps = {
  project: Project;
};

const DistributionItem = ({ project }: DistributionItemProps) => {
  const now = dayjs();

  const { name, claim_start, is_closed } = project;
  const { value: checkingAllocation, setValue: setCheckingAllocation } =
    useBoolean();
  const { value: claimingToken, setValue: setClaimingToken } = useBoolean();
  const { value: refunding, setValue: setRefunding } = useBoolean();
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
  const provider = useAnchorProvider();
  const { sendTransaction, connected } = useWallet();

  const isUpcoming = dayjs(now).isBefore(claim_start);
  const isEnded = is_closed;
  const isOnGoing = dayjs(now).isAfter(claim_start);

  const claimStatus = isUpcoming ? "TBD" : !is_closed ? "On-Going" : "Done";

  const checkAllocation = async () => {
    try {
      setCheckingAllocation(true);
      const program = new AppProgram(provider);
      await program.checkAllocation(name);
      await wait(1000);
      await mutate();
      setCheckingAllocation(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setCheckingAllocation(false);
    }
  };

  const claimToken = async () => {
    try {
      setClaimingToken(true);
      const program = new AppProgram(provider);
      await program.claimToken(name, sendTransaction);
      await wait(1000);
      await mutate();
      setClaimingToken(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setClaimingToken(false);
    }
  };

  const refund = async () => {
    try {
      setRefunding(true);
      const program = new AppProgram(provider);
      await program.refund(name, sendTransaction);
      await wait(1000);
      await mutate();
      setRefunding(false);
      toast.success({
        title: `Success`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Refund error`,
        message: error?.message,
      });
      setRefunding(false);
    }
  };

  const saleSection = useMemo(() => {
    if (!connected || isUpcoming) return null;

    const hasAllocation = userIdoAccount?.allocation.gt(new BN(0));
    const hasRemainingAllocation = userIdoAccount?.remainingAllocation.gt(
      new BN(0)
    );
    const isCommited = !!userIdoAccount?.depositAmount;
    const claimed = !!userIdoAccount?.claimed;

    if (isWhitelist) {
      if (isEnded && !isCommited) {
        return <h5 className="heading-h5 text-primary">NOT REGISTERED</h5>;
      }

      if (!hasAllocation && !claimed) {
        return (
          <div className="text-right">
            <Button loading={checkingAllocation} onClick={checkAllocation}>
              Check Allocation
            </Button>
          </div>
        );
      }

      const allocation = getClaimableToken(tier as any);

      return (
        <div>
          <div className="flex items-center justify-between">
            <div className="text-body1 text-gray-600">Allocation</div>
            <h5 className="heading-h5">
              {numeral(allocation).format("0,0")} {project.sale_token.ticker}
            </h5>
          </div>
          {hasRemainingAllocation && !claimed ? (
            <div className="text-right space-x-4 mt-2">
              <Button loading={claimingToken} onClick={claimToken}>
                Claim
              </Button>
              <Button variant="secondary" loading={refunding} onClick={refund}>
                Refund
              </Button>
            </div>
          ) : (
            <p className="text-body1 text-right text-primary font-semibold mt-2">
              Claimed
            </p>
          )}
        </div>
      );
    } else {
      return (
        <h5 className="heading-h5 text-primary">You are not whitelisted</h5>
      );
    }
  }, [
    isWhitelist,
    isUpcoming,
    isOnGoing,
    isEnded,
    connected,
    userIdoAccount,
    tier,
    checkingAllocation,
    claimingToken,
    refunding,
    getClaimableToken,
    checkAllocation,
    claimToken,
    refund,
  ]);

  const isLoading = isLoadingStakeUser || isLoadingIDOUser || isLoadingPool;

  return (
    <TimelineItem
      title="Distribution"
      date={claim_start}
      status={claimStatus}
      disabled={isUpcoming || isLoading || !connected}
    >
      {!isLoading && saleSection}
    </TimelineItem>
  );
};

export default DistributionItem;
