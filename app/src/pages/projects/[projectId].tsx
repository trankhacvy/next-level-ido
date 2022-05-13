import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import ProjectCard from "views/project/ProjectCard";
import ProjectDetail from "views/project/ProjectDetail";
import SaleInfo from "views/project/SaleInfo";
import TokenInformation from "views/project/TokenInformation";
import IDOTimeline from "views/project/IDOTimeline";
import { ProjectsRepositoty } from "libs/supabase";

const ProjectPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const name = project.name;
  return (
    <main className="container mx-auto px-5 pt-40 pb-20">
      <Head>
        <title>{name} | The Next Level IDO Platform</title>
        <meta
          property="og:title"
          content={`${name} | The Next Level IDO Platform`}
        />
      </Head>
      <div className="lg:flex lg:space-x-10">
        <ProjectCard project={project} />
        <IDOTimeline />
      </div>
      <div className="lg:flex lg:space-x-10 mt-10">
        <SaleInfo />
        <TokenInformation />
      </div>
      <ProjectDetail />
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
