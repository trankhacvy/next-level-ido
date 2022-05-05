import Project from "components/Projects/ProjectItem";
import cx from "classnames";

export type ProjectsListProps = {
  className?: string;
};

const ProjectsList = ({ className }: ProjectsListProps) => {
  return (
    <div className={cx("grid grid-cols-2 gap-10", className)}>
      <Project />
      <Project />
      <Project />
      <Project />
    </div>
  );
};

export default ProjectsList;
