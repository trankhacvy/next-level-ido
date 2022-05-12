import Link from "next/link";
import TierCard from "components/TierCard";
import { tiersData } from "common/tier";
import Button from "components/Button";

const TiersSection = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <h2 className="text-h2 font-bold text-center">Tier System</h2>
      <div className="flex flex-wrap justify-center w-[calc(100%+2rem)] -ml-8 -mt-8 py-20">
        {tiersData.map((tier) => (
          <div className="pl-8 pt-8 w-full md:w-1/2 lg:w-1/3" key={tier.name}>
            <TierCard tier={tier} />
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/stake">
          <Button className="inline-flex" as="a" href="/stake" size="large">
            Stake Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TiersSection;
