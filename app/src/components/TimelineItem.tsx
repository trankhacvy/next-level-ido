import dayjs from "dayjs";
import Accordion from "components/Accordion";
import { ReactNode } from "react";

type TimelineItemProps = {
  date?: string;
  title?: string;
  status?: string;
  children?: ReactNode;
  disabled?: boolean;
};

const TimelineItem = ({
  date,
  title,
  status,
  children,
  disabled = false,
}: TimelineItemProps) => {
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
      <Accordion>
        {({ open }) => (
          <>
            <Accordion.Button
              open={open}
              disabled={disabled}
              title={title}
              status={status}
            />
            <Accordion.Panel open={open}>{children}</Accordion.Panel>
          </>
        )}
      </Accordion>
    </div>
  );
};

export default TimelineItem;
