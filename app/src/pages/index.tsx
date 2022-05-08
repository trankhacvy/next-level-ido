import Head from "next/head";
import Hero from "views/home/Hero";
import Projects from "components/Projects";
import Statistic from "views/home/Statistic";
import Feature1 from "views/home/Feature1";
import StartNow from "views/home/StartNow";
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
      <Statistic />
      <Projects />
      <Feature1 />
      <TierSystem />
      <StartNow />
    </main>
  );
};

export default Index;
