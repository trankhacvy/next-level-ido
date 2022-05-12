import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Hero from "views/home/Hero";
import Projects from "components/Projects";
import Statistic from "views/home/Statistic";
// import Feature1 from "views/home/Feature1";
import StartNow from "views/home/StartNow";
import TiersSection from "views/home/TiersSection";
import { Project } from "types/common";
import { ProjectsRepositoty } from "libs/supabase";

const Index = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <Projects projects={projects} />
      {/* <Feature1 /> */}
      <TiersSection />
      <StartNow />
    </main>
  );
};

export const getStaticProps = async () => {
  try {
    const repo = new ProjectsRepositoty();
    const projects = await repo.findByStatus("live", 6);

    return {
      props: {
        projects: projects as Project[],
      },
    };
  } catch (error) {
    return {
      props: {
        projects: [] as Project[],
      },
    };
  }
};

export default Index;
