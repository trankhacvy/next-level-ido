import React, { useEffect } from "react";
import useScrollSpy from "hooks/useScrollspy";
import cx from "classnames";
import { Project } from "types/common";

const Sections = [
  { text: "About", content: "about" },
  { text: "Roadmap", content: "roadmap" },
  { text: "Team", content: "team" },
  { text: "Advisors", content: "Advisors" },
  { text: "Tokenomics", content: "Tokenomics" },
  { text: "Token Distribution", content: "Token Distribution" },
];

export type ProjectDetailProps = {
  project: Project;
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const { content } = project;
  const refs = React.useRef<HTMLElement[]>([]);

  const activeSection = useScrollSpy({
    sectionElementRefs: refs?.current ?? [],
    offsetPx: -40,
  });

  useEffect(() => {
    refs.current = refs.current.slice(0, Sections.length);
  }, [Sections]);

  return (
    <div className="w-full mt-10">
      <h4 className="text-2xl font-semibold">Project Information</h4>
      <div className="flex card mt-4">
        <aside className="w-1/4 p-10 block border-r border-r-gray-500/[0.24] border-dashed">
          <nav className="sticky top-[120px] space-y-4">
            {content?.map((item, idx) => (
              <div className="flex items-center" key={`link-${item.intro}`}>
                <div className="w-[6px] h-[6px] mr-4 rounded-full bg-primary" />
                <a
                  href={item.url}
                  className={cx("text-body1 block", {
                    "text-body1 font-semibold": activeSection === idx,
                  })}
                >
                  {item.intro}
                </a>
              </div>
            ))}
          </nav>
        </aside>
        <div className="w-3/4 p-10 pb-60">
          {content?.map((item, idx) => (
            <section
              key={`content-${item.url}`}
              className="mb-16"
              // @ts-ignore
              ref={(el) => (refs.current[idx] = el)}
            >
              <h3 className="heading-h3">{item.intro}</h3>
              {item.content && (
                <p className="text-body1 mt-6">{item.content}</p>
              )}
              {item.img && (
                <div className="mt-6 rounded-2xl overflow-hidden">
                  <img className="w-full h-auto" src={item.img} />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
