import Statistic from "views/stake/Statistic";
import StakeTab from "views/stake/StakeTab";

const Stake = () => {
  return (
    <main className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
      <h2 className="text-h2 font-semibold">Stake $LOTO</h2>
      <div className="mt-6 body-1 text-gray-600">
        Receive Allocations from Loto Projects
      </div>
      <div className="body1 text-gray-600 mb-12">
        The amount of allocation will depend on the amount locked.
      </div>
      <div className="lg:flex lg:items-center space-x-8">
        <Statistic />
        <StakeTab />
      </div>
    </main>
  );
};

export default Stake;
