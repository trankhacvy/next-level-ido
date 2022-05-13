import TierCard from "components/TierCard";
import { tiersData } from "common/tier";

const TiersSection = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <h2 className="heading-h2 text-center mb-4">Tier System</h2>
      <p className="text-body2 text-center">
        Choose the perfect tier for your needs. Always flexible to grow
      </p>
      <div className="flex flex-wrap justify-center w-[calc(100%+2rem)] -ml-8 -mt-8 py-20">
        {tiersData.map((tier) => (
          <div className="pl-8 pt-8 w-full md:w-1/2 lg:w-1/3" key={tier.name}>
            <TierCard tier={tier} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TiersSection;
