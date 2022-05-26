import { Project } from "types/common";
import dayjs from "dayjs";
import { useCoutdownTimer } from "hooks/useCountdown";
import { formatSeconds } from "utils/datetime";
import { useIsMounted } from "usehooks-ts";
import WhitelistItem from "./Whitelist";
import SaleItem from "./Sale";

export type IDOTimelineProps = {
  project: Project;
};

const IDOTimeline = ({ project }: IDOTimelineProps) => {
  const {
    claim_start,
    sale_start,
    sale_end,
    whitelist_start,
    whitelist_end,
    is_closed,
    created_at,
  } = project;
  const now = dayjs();
  const whitelisting =
    dayjs(whitelist_start).isAfter(now) && dayjs(now).isBefore(whitelist_end);

  const { count, start } = useCoutdownTimer(claim_start);
  const isMounted = useIsMounted();

  const saleStatus = dayjs(sale_start).isAfter(now)
    ? "TBD"
    : now.isBetween(dayjs(sale_start), dayjs(sale_end))
    ? "On-Going"
    : "Done";

  const distributionStatus = dayjs(claim_start).isAfter(now)
    ? "TBD"
    : is_closed
    ? "DISTRIBUTED"
    : "On-Going";

  return (
    <div className="w-full lg:w-auto lg:flex-1">
      <div className="text-right">
        <p className="text-body2" onClick={() => start()}>
          Distribution ends in {whitelisting ? "whitelisting" : "none"}
        </p>
        {isMounted() && (
          <div className="text-h5 font-semibold">{formatSeconds(count)}</div>
        )}
        <div className="mt-8">
          <TimelineItem text="Preparation" date={created_at} status="Done" />
          <WhitelistItem project={project} />
          <SaleItem project={project} />
          {/* <TimelineItem
            text="Whitelist"
            status={whitelistStatus}
            date={whitelist_start}
          /> */}
          {/* <TimelineItem text="Sale" status={saleStatus} date={sale_start} /> */}
          <TimelineItem
            text="Distribution"
            status={distributionStatus}
            date={claim_start}
          />
        </div>
      </div>
    </div>
  );
};

type TimelineItemProps = {
  date?: string;
  text: string;
  status?: string;
};

const TimelineItem = ({ date, text, status }: TimelineItemProps) => {
  return (
    <div className="relative flex items-center py-4">
      <div className="absolute w-1 border-l-[1.5px] border-l-primary/[0.8] border-dashed left-[40px] top-0 bottom-0 z-[-1]" />
      <div className="mr-4 text-center card w-20 h-20 p-4 flex flex-col items-center justify-center">
        {date ? (
          <>
            <div className="text-caption font-medium">
              {dayjs(date).format("MMM")}
            </div>
            <div className="text-h3 font-semibold">
              {dayjs(date).format("DD")}
            </div>
          </>
        ) : (
          <div className="text-h3 font-semibold">TBD</div>
        )}
      </div>
      <div className="flex items-center card justify-between rounded-2xl flex-1 p-8">
        <div className="text-2xl font-semibold">{text}</div>
        <div className="flex items-center space-x-2">
          <div className="text-xl font-semibold uppercase">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default IDOTimeline;
