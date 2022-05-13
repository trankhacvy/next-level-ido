import ProjectCard from "components/ProjectCard";
import cx from "classnames";
import { Project } from "types/common";
import ProjectCardSkeleton from "components/skeletons/ProjectCardSkeleton";

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
  if (isLoading)
    return (
      <div
        className={cx(
          "grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8",
          className
        )}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProjectCardSkeleton key={`project-skeleton-${idx}`} />
        ))}
      </div>
    );

  return (
    <div
      className={cx(
        "grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8",
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
