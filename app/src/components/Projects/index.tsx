import Link from "next/link";
import ProjectCard from "components/ProjectCard";
import { FaArrowRight } from "react-icons/fa";
import { Project } from "types/common";
import Button from "components/Button";

export type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="text-center">
        <h2 className="heading-h2">Featured Projects</h2>
        {/* <div className="text-body1 mt-6">
          Our Featured Projects can help you find the trip that's perfect for
          you!
        </div> */}
      </div>
      <div className="py-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/projects">
          <Button href="/projects" as="a" size="large" className="inline-flex">
            View All Projects
            <FaArrowRight className="ml-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
