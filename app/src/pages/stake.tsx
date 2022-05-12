import Head from "next/head";
import Statistic from "views/stake/Statistic";
import StakeTab from "views/stake/StakeTab";
import TierCard from "components/TierCard";
import { tiersData } from "common/tier";

const Stake = () => {
  return (
    <main className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
      <Head>
        <title>Stake | The Next Level IDO Platform</title>
        <meta
          property="og:title"
          content="Stake | The Next Level IDO Platform"
        />
      </Head>
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
      <div className="mt-20">
        <p className="text-body1 mb-8">
          Your $LOTO power is 0. You don't have a Loto Tier yet
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-20">
          {tiersData.map((tier, index) => (
            <TierCard tier={tier} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Stake;
