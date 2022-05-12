import Head from "next/head";
import ProjectsList from "views/projects/ProjectList";
import Tabbar from "components/Tab";
import { useGetProjects } from "hooks/useGetProjects";
import { useMemo } from "react";

const ProjectsPage = () => {
  const { projects: upcomingProjects, isLoading } = useGetProjects("upcoming");
  const { projects: liveProjects } = useGetProjects("live");
  const { projects: finishedProjects } = useGetProjects("finished");

  const tabsData = useMemo(
    () => [
      {
        label: "Live IDOs",
        content: (
          <ProjectsList
            isLoading={isLoading}
            projects={upcomingProjects}
            className="mt-10"
          />
        ),
      },
      {
        label: "Upcoming IDOs",
        content: (
          <ProjectsList
            isLoading={isLoading}
            projects={liveProjects}
            className="mt-10"
          />
        ),
      },
      {
        label: "Ended IDOs",
        content: (
          <ProjectsList
            isLoading={isLoading}
            projects={finishedProjects}
            className="mt-10"
          />
        ),
      },
    ],
    [upcomingProjects, liveProjects, finishedProjects, isLoading]
  );

  return (
    <main>
      <Head>
        <title>Projects | The Next Level IDO Platform</title>
        <meta
          property="og:title"
          content="Projects | The Next Level IDO Platform"
        />
      </Head>
      <div className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
        <h2 className="text-h2 font-semibold">Projects</h2>
        <div className="mt-6 text-gray-600 body-1 mb-12">
          Nullam tincidunt adipiscing enim. Mauris sollicitudin fermentum
          libero.
        </div>
        {/* <div className="my-20 flex space-x-8">
          <div className="w-40 h-40 bg-white shadow-z1"></div>
          <div className="w-40 h-40 bg-white shadow-z4"></div>
          <div className="w-40 h-40 bg-white shadow-z8"></div>
          <div className="w-40 h-40 bg-white shadow-z12"></div>
          <div className="w-40 h-40 bg-white shadow-z16"></div>
          <div className="w-40 h-40 bg-white shadow-z20"></div>
          <div className="w-40 h-40 bg-white shadow-z24"></div>
        </div> */}
        <Tabbar tabs={tabsData} />
      </div>
    </main>
  );
};

export default ProjectsPage;
