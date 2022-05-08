import { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import cx from "classnames";

export type TabProps = {
  label: string;
  content?: ReactNode;
};

export type TabbarProps = {
  tabs: TabProps[];
  onChange?: (index: number) => void;
  defaultIndex?: number;
};

const Tabbar = ({ tabs, onChange, defaultIndex }: TabbarProps) => {
  const hasContent = tabs.filter(({ content }) => Boolean(content)).length > 0;

  return (
    <Tab.Group defaultIndex={defaultIndex} onChange={onChange}>
      <Tab.List className="flex items-center space-x-8">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            className={({ selected }) =>
              cx(
                "text-body2 font-semibold pb-3 border-b-2 border-b-transparent hover:opacity-70",
                selected ? "text-gray-800 border-b-primary" : "text-gray-600"
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      {hasContent && (
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={`tab-content-${tab.label}`}>
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      )}
    </Tab.Group>
  );
};

export default Tabbar;
