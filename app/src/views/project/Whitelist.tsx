import { Project } from "types/common";
import dayjs from "dayjs";
import Button from "components/Button";
import TimelineItem from "components/TimelineItem";
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
import { bnDivDecimals } from "utils/number";
import { BN } from "@project-serum/anchor";
import { wait } from "utils/wait";

type WhitelistItemProps = {
  project: Project;
};

const WhitelistItem = ({ project }: WhitelistItemProps) => {
  const now = dayjs();

  const { name, whitelist_start, whitelist_end } = project;
  const { pool, isLoading: isLoadingIDOPool } = useGetIDOPool(project.name);
  const { isWhitelist, isLoading: isLoadingStakeUser } = useGetStakeUser();
  const {
    userIdoAccount,
    isLoading: isLoadingIDOUser,
    mutate,
  } = useGetUserIDO();
  const [loading, setLoading] = useState(false);
  const provider = useAnchorProvider();
  const { sendTransaction, connected } = useWallet();

  const isUpcoming = dayjs(now).isBefore(whitelist_start);
  const isEnded = dayjs(now).isAfter(whitelist_end);
  const isOnGoing = dayjs(now).isBetween(whitelist_start, whitelist_end);

  const fundNeeded = bnDivDecimals(pool?.commitFund)?.toNumber() ?? 0;
  const whitelistStatus = isUpcoming ? "TBD" : isOnGoing ? "On-Going" : "Done";

  const handleCommitFund = async () => {
    try {
      setLoading(true);
      const program = new AppProgram(provider);
      await program.commitFund(
        name,
        pool?.commitFund ?? new BN(0),
        sendTransaction
      );
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

  const whitelistSection = useMemo(() => {
    if (!connected || isUpcoming) return null;
    const isCommited = !!userIdoAccount?.depositAmount;

    if (isWhitelist) {
      if (isEnded && !isCommited) {
        return <h5 className="heading-h5 text-primary">NOT REGISTERED</h5>;
      }
      return (
        <>
          <div className="flex items-center justify-between">
            <h5 className="text-body1 text-gray-600">
              Fund {isCommited ? "Committed" : "Needed"}
            </h5>
            <h5 className="heading-h5">
              {numeral(
                isCommited
                  ? bnDivDecimals(userIdoAccount?.depositAmount).toNumber()
                  : fundNeeded
              ).format("0,0")}{" "}
              USDC
            </h5>
          </div>
          {!isCommited && (
            <div className="flex items-center justify-end mt-6">
              <Button loading={loading} onClick={handleCommitFund}>
                Commit Fund
              </Button>
            </div>
          )}
        </>
      );
    } else {
      return (
        <h5 className="heading-h5 text-primary">You are not whitelisted</h5>
      );
    }
  }, [
    isWhitelist,
    isUpcoming,
    isEnded,
    isOnGoing,
    connected,
    userIdoAccount,
    loading,
  ]);

  const isLoading = isLoadingStakeUser || isLoadingIDOUser || isLoadingIDOPool;

  return (
    <TimelineItem
      title="Whitelist"
      date={whitelist_start}
      status={whitelistStatus}
      disabled={isUpcoming || !connected}
    >
      {!isLoading && whitelistSection}
    </TimelineItem>
  );
};

export default WhitelistItem;
