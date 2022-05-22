import { MdKeyboardArrowDown } from "react-icons/md";
import { Project } from "types/common";
import dayjs from "dayjs";

export type IDOTimelineProps = {
  project: Project;
};

const IDOTimeline = ({ project }: IDOTimelineProps) => {
  const { claim_start, sale_start, vote_end, whitelist_end } = project;
  return (
    <div className="w-full lg:w-auto lg:flex-1">
      <div className="text-right">
        <p className="text-body2">Distribution ends in</p>
        <div className="text-h5 font-semibold">20:00:21:34</div>
        <div className="mt-8">
          <TimelineItem text="Preparation" status="Done" />
          <TimelineItem text="Whitelist" status="TBD" date={whitelist_end} />
          <TimelineItem text="Sale" status="TBD" date={sale_start} />
          <TimelineItem text="Distribution" status="TBD" date={claim_start} />
          <TimelineItem text="Vesting" status="TBD" date={vote_end} />
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
    <div className="relative flex items-center">
      <div className="absolute w-1 border-l-[1.5px] border-l-primary/[0.24] border-dashed left-[14px] top-0 bottom-0 z-[-1]" />
      <div className="mr-8 text-center">
        {date ? (
          <>
            <div className="text-body2 font-medium">
              {dayjs(date).format("MMM")}
            </div>
            <div className="text-h2 font-semibold">
              {dayjs(date).format("DD")}
            </div>
          </>
        ) : (
          <div className="text-body2 font-medium">TBD</div>
        )}
      </div>
      <div className="flex items-center card justify-between rounded-2xl flex-1 p-8 mb-8">
        <div className="text-2xl font-semibold">{text}</div>
        <div className="flex items-center space-x-2">
          <div className="text-xl font-semibold">{status}</div>
          <button className="p-2">
            <MdKeyboardArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDOTimeline;
// border border-gray-500/[0.24]
