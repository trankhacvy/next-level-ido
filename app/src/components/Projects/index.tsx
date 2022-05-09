import Link from "next/link";
import ProjectItem from "./ProjectItem";
import { FaArrowRight } from "react-icons/fa";
import { Project } from "types/common";

export type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="text-center">
        <h2 className="text-h2 font-bold">Live Projects</h2>
        <div className="text-body1 mt-6">
          Our Featured Projects can help you find the trip that's perfect for
          you!
        </div>
      </div>
      <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/projects">
          <a
            href="/projects"
            className="btn-large inline-flex items-center btn-primary"
          >
            View All Projects
            <FaArrowRight className="ml-4" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
