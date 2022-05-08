import Link from "next/link";
import Tier from "./Tier";

const TierSystem = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <h2 className="text-h2 font-bold text-center">Tier System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20">
        <Tier />
        <Tier />
        <Tier />
        <Tier />
      </div>
      <div className="text-center">
        <Link href="/projects">
          <a href="/projects" className="btn-large btn-primary">
            Stake Now
          </a>
        </Link>
      </div>
    </section>
  );
};

export default TierSystem;
