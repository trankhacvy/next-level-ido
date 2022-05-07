import RoadmapItem from "./Item";

const RoadmapData = [
  {
    title: "Airdrop + whitelist lottery registration opens",
    content:
      "On the 7th of May at 12PM (UTC) the Solanium whitelist went live. You can register yourself for the public sale as well as for the airdrop.",
  },
  {
    title: "Airdrop + whitelist lottery registration opens",
    content:
      "On the 7th of May at 12PM (UTC) the Solanium whitelist went live. You can register yourself for the public sale as well as for the airdrop.",
  },
  {
    title: "Airdrop + whitelist lottery registration opens",
    content:
      "On the 7th of May at 12PM (UTC) the Solanium whitelist went live. You can register yourself for the public sale as well as for the airdrop.",
  },
  {
    title: "Airdrop + whitelist lottery registration opens",
    content:
      "On the 7th of May at 12PM (UTC) the Solanium whitelist went live. You can register yourself for the public sale as well as for the airdrop.",
  },
  {
    title: "Airdrop + whitelist lottery registration opens",
    content:
      "On the 7th of May at 12PM (UTC) the Solanium whitelist went live. You can register yourself for the public sale as well as for the airdrop.",
  },
];

const Roadmap = () => {
  return (
    <section className="w-full py-20">
      <h2 className="text-title">Roadmap</h2>
      <div className="relative py-10 max-w-screen-lg mx-auto mt-10">
        <div className="absolute w-[2px] h-full left-1/2 top-0 bg-white" />
        {RoadmapData.map((item, idx) => (
          <RoadmapItem
            key={`${item.title}-${idx}`}
            {...item}
            isRight={idx % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
