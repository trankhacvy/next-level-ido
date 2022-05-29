import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import useSWR from "swr";
import Head from "next/head";
import { FaChevronRight } from "react-icons/fa";
import ProjectCard from "views/project/ProjectCard";
import ProjectDetail from "views/project/ProjectDetail";
import SaleInfo from "views/project/SaleInfo";
import TokenInformation from "views/project/TokenInformation";
import IDOTimeline from "views/project/IDOTimeline";
import { ProjectsRepositoty } from "libs/supabase";
import Link from "next/link";

const ProjectPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const name = project.name;

  const { data: proj } = useSWR(
    ["project", project.id],
    () => {
      const repo = new ProjectsRepositoty();
      return repo.findOne("id", project.id as string);
    },
    {
      fallbackData: project,
    }
  );

  return (
    <main className="container mx-auto px-5 pt-40 pb-20">
      <Head>
        <title>{name} | Ari</title>
        <meta property="og:title" content={`${name} | Ari`} />
      </Head>
      <nav className="mb-10">
        <ol className="flex flex-wrap items-center">
          <li className="">
            <Link href="/projects">
              <a className="text-body1 hover:underline" href="/projects">
                Projects
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <FaChevronRight className="text-body1 text-gray-500 w-4 h-4" />
          </li>
          <li className="text-body1 text-gray-500">{name}</li>
        </ol>
      </nav>
      <div className="lg:flex lg:space-x-10">
        <ProjectCard project={proj} />
        <IDOTimeline project={proj} />
      </div>
      <div className="lg:flex lg:space-x-10 mt-10">
        <SaleInfo project={proj} />
        <TokenInformation project={proj} />
      </div>
      <ProjectDetail project={proj} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const projectId = context.params?.projectId;
    if (!projectId) {
      return {
        notFound: true,
      };
    }

    const repo = new ProjectsRepositoty();
    const project = await repo.findOne("id", projectId as string);
    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProjectPage;
