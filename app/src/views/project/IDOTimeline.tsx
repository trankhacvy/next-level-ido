import { MdKeyboardArrowDown } from "react-icons/md";

const timelines = [
  { text: "Preparation", status: "Done" },
  { text: "Whitelist", status: "Done" },
  { text: "Sale", status: "Done" },
  { text: "Distribution", status: "Done" },
  { text: "Vesting", status: "Done" },
];

const IDOTimeline = () => {
  return (
    <div className="w-full lg:w-auto lg:flex-1">
      <div className="text-right">
        <p className="text-body2">Distribution ends in</p>
        <div className="text-h5 font-semibold">20:00:21:34</div>
        <div className="mt-8">
          {timelines.map((item) => (
            <div key={item.text} className="relative flex items-center">
              <div className="absolute w-1 border-l-[1.5px] border-l-primary/[0.24] border-dashed left-[14px] top-0 bottom-0 z-[-1]" />
              <div className="mr-8 text-center">
                <div className="text-body2">Apr</div>
                <div className="text-h4 font-semibold">16</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-gray-500/[0.24] flex-1 p-8 mb-8">
                <div className="text-2xl font-semibold">{item.text}</div>
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-semibold">{item.status}</div>
                  <button className="p-2">
                    <MdKeyboardArrowDown className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IDOTimeline;
