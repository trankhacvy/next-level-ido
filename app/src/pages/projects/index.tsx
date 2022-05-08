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
      <div className="container mx-auto px-5 pt-24 pb-20 lg:pt-36 lg:pb-[120px]">
        <h2 className="text-h2 font-semibold">Projects</h2>
        <div className="mt-6 text-gray-600 body-1 mb-12">
          Nullam tincidunt adipiscing enim. Mauris sollicitudin fermentum
          libero.
        </div>
        <Tabbar tabs={tabsData} />
      </div>
    </main>
  );
};

export default ProjectsPage;
