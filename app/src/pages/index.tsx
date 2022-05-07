import Head from "next/head";
import Hero from "components/Hero";
import Projects from "components/Projects";
import Roadmap from "components/Roadmap";
import Statistic from "components/Statistic";
import TierSystem from "components/Tier";

const Index = () => {
  return (
    <main>
      <Head>
        <title>Loto | The Next Level IDO Platform</title>
        <meta
          property="og:title"
          content="Loto | The Next Level IDO Platform"
        />
      </Head>
      <Hero />
      <Projects />
      <TierSystem />
      <Roadmap />
      <Statistic />
    </main>
  );
};

export default Index;
