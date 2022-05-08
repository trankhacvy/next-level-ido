import CheckIcon from "@heroicons/react/solid/CheckIcon";

const Tier = () => {
  return (
    <div className="card overflow-hidden">
      <div className="w-full h-[240px] bg-gray-600"></div>
      <div className="px-5 py-5 space-y-5">
        <span className="px-3 py-1 uppercase rounded-md text-body2 text-white bg-gray-800 font-semibold">
          Gold
        </span>
        <div className="space-x-1 flex items-baseline">
          <h3 className="text-h3 font-semibold">210</h3>
          <span className="text-body2 font-medium">SOL</span>
        </div>
        <p className="text-body1">
          Guaranteed allocation of the amount of 210 PSOL in dollars at the time
          of the participation.
        </p>
        <ul>
          <li className="flex">
            <div className="mr-4">
              <CheckIcon className="text-gray-800 w-6 h-6" />
            </div>
            <p className="text-body2">
              Dynamic Vesting Period:{" "}
              <span className="font-semibold">12 weeks</span>
            </p>
          </li>
          <li className="flex items-center">
            <div className="mr-4">
              <CheckIcon className="text-gray-800 w-6 h-6" />
            </div>
            <p className="text-body2">
              Dynamic Vesting Period:{" "}
              <span className="font-semibold">12 weeks</span>
            </p>
          </li>
        </ul>
      </div>
      <hr className="border-t border-t-gray-500/[0.24] border-dashed" />
      <div className="p-5">
        <button className="btn-large btn-primary w-full font-semibold">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Tier;
