import Head from "next/head";
import Hero from "views/home/Hero";
import Statistic from "views/home/Statistic";
import StartNow from "views/home/StartNow";
import TiersSection from "views/home/TiersSection";

const Index = ({
}) => {
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
      {/* <Projects projects={projects} /> */}
      <TiersSection />
      <StartNow />
    </main>
  );
};

// export const getStaticProps = async () => {
//   try {
//     const repo = new ProjectsRepositoty();
//     const projects = await repo.findByStatus("live", 6);
//     console.log('[index] getStaticProps ', projects.length)
//     return {
//       props: {
//         projects: projects as Project[],
//       },
//       revalidate: 60,
//     };
//   } catch (error) {
//     return {
//       props: {
//         projects: [] as Project[],
//       },
//       revalidate: 60,
//     };
//   }
// };

export default Index;
