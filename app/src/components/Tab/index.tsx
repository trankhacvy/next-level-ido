import { useState, ReactNode } from "react";
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
      <Tab.List className="flex items-center justify-center space-x-10 h-20 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            className={({ selected }) =>
              cx(
                "rounded-lg font-semibold hover:bg-transparent transition-[font-size]",
                selected ? "text-white text-4xl" : "text-slate-400 text-3xl"
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
