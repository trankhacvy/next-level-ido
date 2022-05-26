import Head from "next/head";
import Statistic from "views/stake/Statistic";
import StakeTab from "views/stake/StakeTab";
import TierCard from "components/TierCard";
import { tiersData } from "common/tier";
import numeral from "numeral";
import { getTierProps } from "utils/tiers";
import { useBalanceContext } from "context/balanceContext";
import { useEffect } from "react";
import { useAnchorProvider } from "hooks/useProvider";
import AppProgram from "libs/program";

const Stake = () => {
  const { xAriBalance } = useBalanceContext();
  const tierProps = getTierProps(xAriBalance.toNumber());

  // const provider = useAnchorProvider();

  // useEffect(() => {
  //   const program = new AppProgram(provider);

  //   const listener = program.program.addEventListener("Log", (event) => {
  //     console.log("event", event);
  //   });

  //   return () => {
  //     program.program.removeEventListener(listener);
  //   };
  // }, []);

  return (
    <main className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
      <Head>
        <title>Stake | The Next Level IDO Platform</title>
        <meta
          property="og:title"
          content="Stake | The Next Level IDO Platform"
        />
      </Head>
      <h2 className="heading-h2">Stake $ARI</h2>
      <div className="mt-6 body-1 text-gray-600">
        Receive Allocations from Ari Projects
      </div>
      <div className="body1 text-gray-600 mb-12">
        The amount of allocation will depend on the amount locked.
      </div>
      <div className="lg:flex lg:items-stretch space-y-8 lg:space-x-8 lg:space-y-0">
        <Statistic />
        <StakeTab />
      </div>
      <div className="mt-20">
        <h6 className="heading-h6 mb-8">
          {`Your $xARI power is`}{" "}
          <span className="text-primary">
            ${numeral(xAriBalance.toNumber()).format("")}.
          </span>{" "}
          {tierProps.tier ? (
            <>
              Your tier is{" "}
              <span className="text-primary">{tierProps.tier}</span>
            </>
          ) : (
            `You don't have a Ari Tier yet`
          )}
        </h6>
        <div className="flex flex-wrap justify-center w-[calc(100%+2rem)] -ml-8 -mt-8 mb-20">
          {tiersData.map((tier) => (
            <div className="pl-8 pt-8 w-full md:w-1/2 lg:w-1/3" key={tier.name}>
              <TierCard
                tier={tier}
                hasButton={false}
                current={tier.name === tierProps.tier}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Stake;
