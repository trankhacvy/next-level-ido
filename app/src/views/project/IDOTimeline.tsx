import { Project } from "types/common";
import dayjs from "dayjs";
import { useCoutdownTimer } from "hooks/useCountdown";
import { formatSeconds } from "utils/datetime";
import { useIsMounted } from "usehooks-ts";
import WhitelistItem from "./Whitelist";
import SaleItem from "./Sale";
import DistributionItem from "./Distribution";
import TimelineItem from "components/TimelineItem";

export type IDOTimelineProps = {
  project: Project;
};

const IDOTimeline = ({ project }: IDOTimelineProps) => {
  const { sale_start, sale_end, whitelist_start, whitelist_end, created_at } =
    project;
  const now = dayjs();

  const isWhitelisting = now.isBetween(
    dayjs(whitelist_start),
    dayjs(whitelist_end)
  );

  const isSaling = now.isBetween(dayjs(sale_start), dayjs(sale_end));

  const { count } = useCoutdownTimer(
    isWhitelisting ? whitelist_end : isSaling ? sale_end : now.toISOString()
  );
  const isMounted = useIsMounted();

  return (
    <div className="w-full lg:w-auto lg:flex-1">
      <div>
        {(isWhitelisting || isSaling) && (
          <div className="text-right">
            <p className="text-body1">
              {isWhitelisting && "Whitelist "}
              {isSaling && "Sale "}
              ends in
            </p>
            {isMounted() && (
              <div className="heading-h3 text-primary">
                {formatSeconds(count)}
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
          <TimelineItem title="Preparation" date={created_at} status="Done">
            <p className="text-body1">
              This project is in preparation phase. Stay tuned.
            </p>
          </TimelineItem>
          <WhitelistItem project={project} />
          <SaleItem project={project} />
          <DistributionItem project={project} />
        </div>
      </div>
    </div>
  );
};

export default IDOTimeline;
