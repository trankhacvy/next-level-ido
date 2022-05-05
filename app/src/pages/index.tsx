import Hero from "components/Hero";
import Projects from "components/Projects";
import Roadmap from "components/Roadmap";
import Statistic from "components/Statistic";
import TierSystem from "components/Tier";

const Index = () => {
  return (
    <main>
      <Hero />
      <Projects />
      <TierSystem />
      <Roadmap />
      <Statistic />
    </main>
  );
};

export default Index;
