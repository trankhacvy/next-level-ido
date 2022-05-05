import CheckIcon from "@heroicons/react/solid/CheckIcon";

const Tier = () => {
  return (
    <div className="rounded-lg shadow-md bg-gray-700 ooverflow-hidden hover:border-gradient">
      <div className="w-full h-[240px] bg-gray-600"></div>
      <div className="px-4 py-5 space-y-4">
        <span className="px-6 py-2 uppercase font-semibold rounded-full bg-white text-blue-900">
          Gold
        </span>
        <div className="space-x-1">
          <span className="text-3xl font-semibold text-white">210</span>
          <span className="text-xl font-medium">SOL</span>
        </div>
        <p>
          Guaranteed allocation of the amount of 210 PSOL in dollars at the time
          of the participation.
        </p>
        <ul>
          <li className="flex items-center">
            <div className="mr-4">
              <CheckIcon className="text-white w-6 h-6" />
            </div>
            <p>
              Dynamic Vesting Period:{" "}
              <span className="text-white font-semibold">12 weeks</span>
            </p>
          </li>
          <li className="flex items-center">
            <div className="mr-4">
              <CheckIcon className="text-white w-6 h-6" />
            </div>
            <p>
              Dynamic Vesting Period:{" "}
              <span className="text-white font-semibold">12 weeks</span>
            </p>
          </li>
        </ul>
        <button className="w-full text-white font-semibold px-8 py-3 bg-gradient rounded-md">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Tier;
