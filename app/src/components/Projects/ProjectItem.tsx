import FlagIcon from "@heroicons/react/solid/FlagIcon";

const ProjectItem = () => {
  return (
    <article className="rounded-lg shadow-md bg-gray-700 p-4 hover:border-gradient">
      <div className="flex">
        <div className="rounded-lg w-32 h-32 bg-gray-400"></div>
        <div className="ml-8 flex-1">
          <h4 className="text-white text-3xl font-semibold">Dragon Ball</h4>
          <p className="text-sm leading-snug">
            Solana Based Leveraged Liquidity Provision dApp
          </p>
          <div className="mt-8 flex flex-wrap">
            <a className="bg-slate-400 hover:bg-slate-600 inline-block cursor-pointer p-2 rounded-full mr-2 mb-2">
              <FlagIcon className="w-5 h-5" />
            </a>
            <a className="bg-slate-400 hover:bg-slate-600 inline-block cursor-pointer p-2 rounded-full mr-2 mb-2">
              <FlagIcon className="w-5 h-5" />
            </a>
            <a className="bg-slate-400 hover:bg-slate-600 inline-block cursor-pointer p-2 rounded-full mr-2 mb-2">
              <FlagIcon className="w-5 h-5" />
            </a>
            <a className="bg-slate-400 hover:bg-slate-600 inline-block cursor-pointer p-2 rounded-full mr-2 mb-2">
              <FlagIcon className="w-5 h-5" />
            </a>
            <a className="bg-slate-400 hover:bg-slate-600 inline-block cursor-pointer p-2 rounded-full mr-2 mb-2">
              <FlagIcon className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-4 mb-6">
            <div className="text-sm">Total raise</div>
            <div className="text-white text-lg font-semibold">100,000 USDC</div>
          </div>
          <hr className="h-0 border-t border-t-state-200 opacity-50" />
          <div className="mt-6">
            <div className="text-sm">Status</div>
            <div className="text-white font-semibold">Distribution</div>
          </div>
          <div className="mt-4">
            <div className="text-sm">End in</div>
            <div className="text-white font-semibold">21:20:20:10</div>
          </div>
          <div className="mt-6">
            <button className="text-white bg-gradient px-8 py-2 rounded-md font-semibold">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
