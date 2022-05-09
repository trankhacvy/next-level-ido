import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Hero from "views/home/Hero";
import Projects from "components/Projects";
import Statistic from "views/home/Statistic";
import Feature1 from "views/home/Feature1";
import StartNow from "views/home/StartNow";
import TierSystem from "components/Tier";
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
      <Feature1 />
      <TierSystem />
      <StartNow />
    </main>
  );
};

export const getStaticProps = async () => {
  try {
    const repo = new ProjectsRepositoty();
    const projects = await repo.findAll();

    return {
      props: {
        projects: projects.slice(0, 3) as Project[],
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
