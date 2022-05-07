import { MdKeyboardArrowDown } from "react-icons/md";
import ProjectDetail from "components/ProjectDetail";
import SaleInfo from "components/SaleInfo";
import TokenInformation from "components/TokenInformation";

const timelines = [
  { text: "Preparation", status: "Done" },
  { text: "Whitelist", status: "Done" },
  { text: "Sale", status: "Done" },
  { text: "Distribution", status: "Done" },
  { text: "Vesting", status: "Done" },
];

const ProjectPage = () => {
  return (
    <main className="container mx-auto px-5 pt-40 pb-20">
      <div className="lg:flex lg:space-x-20">
        <div className="w-full lg:w-auto lg:flex-1 min-h-[600px] lg:self-stretch rounded-lg shadow-md bg-gray-700 p-8">
          <div className="flex items-center justify-between">
            <div className="w-[160px] h-[160px] bg-gray-500 rounded-md"></div>
            <div className="text-center">
              <div>Token Price</div>
              <div className="text-lg font-bold text-white">$0.16</div>
            </div>
          </div>
          <div className="min-h-[200px]">
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 text-white">
              Loto
            </h2>
            <div className="mt-1 text-lg font-medium text-white">
              Loto is the next-level IDO platform built on Solana with the needs
              of both projects and investors alike.
            </div>
          </div>
          <hr className="border-t border-t-slate-600 my-8" />
          <div className="flex justify-between">
            <div className="text-left">
              <div>Token Disribution</div>
              <div className="text-lg font-bold text-white">140,555 SOL</div>
            </div>
            <div className="text-right">
              <div>Hard Cap</div>
              <div className="text-lg font-bold text-white">100,000 USDC</div>
            </div>
          </div>
          <button className="mt-8 btn-primary">Participate</button>
          <hr className="border-t border-t-slate-600 my-8" />
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-400" />
            <div className="w-12 h-12 rounded-full bg-gray-400" />
            <div className="w-12 h-12 rounded-full bg-gray-400" />
            <div className="w-12 h-12 rounded-full bg-gray-400" />
            <div className="w-12 h-12 rounded-full bg-gray-400" />
          </div>
        </div>
        <div className="w-full lg:w-auto lg:flex-1">
          <div className="text-right">
            <p className="text-sm">Distribution ends in</p>
            <div className="text-gradient font-semibold text-2xl">
              20:00:21:34
            </div>
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
      </div>
      <div className="lg:flex lg:space-x-8 mt-10">
        <SaleInfo />
        <TokenInformation />
      </div>
      <ProjectDetail />
    </main>
  );
};

export default ProjectPage;
