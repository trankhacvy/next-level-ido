import Link from "next/link";
import ProjectItem from "./ProjectItem";

const Projects = () => {
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
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </div>
      <div className="text-center">
        <Link href="/projects">
          <a href="/projects" className="btn-large btn-primary">
            View All Projects
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
