import ProjectsList from "components/ProjectList";
import Tabbar from "components/Tab";

const ProjectsPage = () => {
  const tabsData = [
    {
      label: "Live IDOs",
      content: <ProjectsList className="mt-10" />,
    },
    {
      label: "Upcoming IDOs",
      content: <ProjectsList className="mt-10" />,
    },
    {
      label: "Ended IDOs",
      content: <ProjectsList className="mt-10" />,
    },
  ];

  return (
    <main>
      <div className="container mx-auto px-5 py-20">
        <Tabbar tabs={tabsData} />
      </div>
    </main>
  );
};

export default ProjectsPage;
