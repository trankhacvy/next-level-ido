import Tier from "./Tier";

const TierSystem = () => {
  return (
    <section className="container mx-auto px-5 py-20">
      <h2 className="text-title">Tier System</h2>
      <div className="grid grid-cols-4 gap-8 mt-10">
        <Tier />
        <Tier />
        <Tier />
        <Tier />
      </div>
      <div className="text-center mt-10">
        <a href="/" className="btn-primary">
          Stake Now
        </a>
      </div>
    </section>
  );
};

export default TierSystem;
