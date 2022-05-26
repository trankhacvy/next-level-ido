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

  const fundNeeded = bnDivDecimals(pool?.commitFund)?.toNumber() ?? 0;
  const fundCommitted = !!userIdoAccount?.depositAmount;

  const whitelistStatus = dayjs(whitelist_start).isAfter(now)
    ? "TBD"
    : now.isBetween(dayjs(whitelist_start), dayjs(whitelist_end))
    ? "On-Going"
    : "Done";

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
    if (!connected) return null;

    if (isWhitelist) {
      return (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h5 className="heading-h5">
              Fund {fundCommitted ? "Committed" : "Needed"}
            </h5>
            <h5 className="heading-h5">
              {numeral(
                fundCommitted
                  ? bnDivDecimals(userIdoAccount?.depositAmount).toNumber()
                  : fundNeeded
              ).format("0,0")}{" "}
              USDC
            </h5>
          </div>
          {!fundCommitted && (
            <div className="flex items-center justify-end mt-6">
              <Button loading={loading} onClick={handleCommitFund}>
                Commit Fund
              </Button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="mt-10">
        <h5 className="heading-h5">You are not whitelisted</h5>
      </div>
    );
  }, [isWhitelist, connected, fundCommitted, userIdoAccount, loading]);

  if (isLoadingStakeUser || isLoadingIDOUser || isLoadingIDOPool)
    return <h2>loading ...</h2>;

  return (
    <div className="relative flex items-center py-4">
      <div className="absolute w-1 border-l-[1.5px] border-l-primary/[0.8] border-dashed left-[40px] top-0 bottom-0 z-[-1]" />
      <div className="mr-4 text-center card w-20 h-20 p-4 flex flex-col items-center justify-center">
        {whitelist_start ? (
          <>
            <div className="text-caption font-medium">
              {dayjs(whitelist_start).format("MMM")}
            </div>
            <div className="text-h3 font-semibold">
              {dayjs(whitelist_start).format("DD")}
            </div>
          </>
        ) : (
          <div className="text-h3 font-semibold">TBD</div>
        )}
      </div>
      <div className="card rounded-2xl flex-1 p-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Whitelist</div>
          <div className="flex items-center space-x-2">
            <div className="text-xl font-semibold uppercase">
              {whitelistStatus}
            </div>
          </div>
        </div>
        {whitelistSection}
      </div>
    </div>
  );
};

export default WhitelistItem;
