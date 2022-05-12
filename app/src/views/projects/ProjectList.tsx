import ProjectCard from "components/ProjectCard";
import cx from "classnames";
import { Project } from "types/common";

export type ProjectsListProps = {
  projects: Project[];
  isLoading?: boolean;
  className?: string;
};

const ProjectsList = ({
  projects,
  isLoading,
  className,
}: ProjectsListProps) => {
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className={cx("grid md:grid-cols-2 lg:grid-cols-3 gap-10", className)}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
