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
        <p className="text-sm">Distribution ends in</p>
        <div className="text-gradient font-semibold text-2xl">20:00:21:34</div>
        <div className="mt-8 space-y-8">
          {timelines.map((item) => (
            <div
              key={item.text}
              className="flex items-center border-gradient justify-between rounded-lg shadow-md bg-gray-700 text-left p-6"
            >
              <div className="text-2xl text-white font-semibold">
                {item.text}
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xl text-white font-semibold">
                  {item.status}
                </div>
                <button className="p-2">
                  <MdKeyboardArrowDown className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IDOTimeline;
