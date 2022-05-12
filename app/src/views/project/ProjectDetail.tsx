import React, { useEffect } from "react";
import useScrollSpy from "hooks/useScrollspy";
import cx from "classnames";

const Sections = [
  { text: "About", content: "about" },
  { text: "Roadmap", content: "roadmap" },
  { text: "Team", content: "team" },
  { text: "Advisors", content: "Advisors" },
  { text: "Tokenomics", content: "Tokenomics" },
  { text: "Token Distribution", content: "Token Distribution" },
];

const ProjectDetail = () => {
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
        <aside className="w-1/4 block border-r border-r-gray-500/[0.24] border-dashed">
          <nav className="sticky top-[70px] p-8 space-y-2">
            {Sections.map((sec, idx) => (
              <div className="flex items-center" key={`link-${sec.text}`}>
                <div className="w-[6px] h-[6px] mr-4 rounded-full bg-primary" />
                <a
                  href={`#id-${sec.text}`}
                  className={cx("text-body1 block", {
                    "text-body1 font-semibold": activeSection === idx,
                  })}
                >
                  {sec.text}
                </a>
              </div>
            ))}
          </nav>
        </aside>
        <div className="w-3/4">
          {Sections.map((sec, idx) => (
            <section
              key={sec.text}
              className="h-[400px]"
              // @ts-ignore
              ref={(el) => (refs.current[idx] = el)}
            >
              <h1 className="p-10">{sec.content}</h1>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
