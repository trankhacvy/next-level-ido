import Head from "next/head";
import ProjectsList from "views/projects/ProjectList";
import Tabbar from "components/Tab";
import { useGetProjects } from "hooks/useGetProjects";
import { useMemo } from "react";

const ProjectsPage = () => {
  const { projects: upcomingProjects, isLoading } = useGetProjects("upcoming");
  const { projects: liveProjects } = useGetProjects("live");
  const { projects: finishedProjects } = useGetProjects("ended");

  const tabsData = useMemo(
    () => [
      {
        label: "Live IDOs",
        content: (
          <ProjectsList
            isLoading={isLoading}
            projects={liveProjects}
            className="mt-10"
          />
        ),
      },
      {
        label: "Upcoming IDOs",
        content: (
          <ProjectsList
            isLoading={isLoading}
            projects={upcomingProjects}
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
        <title>Projects | Ari</title>
        <meta property="og:title" content="Projects | Ari" />
      </Head>
      <div className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
        <h2 className="heading-h2">Projects</h2>
        <div className="mt-6 text-gray-600 text-body1 mb-12">
          Here are all the projects of Ari.
        </div>
        <Tabbar tabs={tabsData} />
      </div>
    </main>
  );
};

export default ProjectsPage;
