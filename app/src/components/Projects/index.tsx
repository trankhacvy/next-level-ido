import Link from "next/link";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  return (
    <section className="container mx-auto px-5 py-20">
      <h2 className="text-title">Live Projects</h2>
      <div className="mt-10 grid grid-cols-2 gap-10">
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </div>
      <div className="text-center mt-8">
        <Link href="/projects">
          <a href="/projects" className="inline-block btn-secondary">
            All Projects
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
