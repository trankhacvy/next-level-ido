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
    offsetPx: -180,
  });

  useEffect(() => {
    refs.current = refs.current.slice(0, Sections.length);
  }, [Sections]);

  return (
    <div className="w-full mt-10">
      <div className="flex rounded-lg bg-gray-700">
        <aside className="w-1/4 block">
          <nav className="sticky top-[70px] p-6">
            {Sections.map((sec, idx) => (
              <a
                key={`link-${sec.text}`}
                href={`#id-${sec.text}`}
                className={cx("py-2 block", {
                  "text-red-600": activeSection === idx,
                })}
              >
                {sec.text}
              </a>
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
