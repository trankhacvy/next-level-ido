import ProjectCard from "views/project/ProjectCard";
import ProjectDetail from "views/project/ProjectDetail";
import SaleInfo from "views/project/SaleInfo";
import TokenInformation from "views/project/TokenInformation";
import IDOTimeline from "views/project/IDOTimeline";

const ProjectPage = () => {
  return (
    <main className="container mx-auto px-5 pt-40 pb-20">
      <div className="lg:flex lg:space-x-20">
        <ProjectCard />
        <IDOTimeline />
      </div>
      <div className="lg:flex lg:space-x-8 mt-10">
        <SaleInfo />
        <TokenInformation />
      </div>
      <ProjectDetail />
    </main>
  );
};

export default ProjectPage;
