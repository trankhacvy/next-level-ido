import { Disclosure } from "@headlessui/react";
import { ReactNode } from "react";
import { FaAngleUp } from "react-icons/fa";

export type AccordionProps = {
  children: ({ open }: { open: boolean }) => ReactNode;
};

export default function Accordion({ children }: AccordionProps) {
  return (
    <div className="w-full">
      <Disclosure>
        {({ open }) => (
          <div className="card rounded-2xl p-8">{children({ open })}</div>
        )}
      </Disclosure>
    </div>
  );
}

export type AccordionButtonProps = {
  open: boolean;
  disabled?: boolean;
  title?: string;
  status?: string;
};

export const AccordionButton = ({
  open,
  disabled = false,
  title,
  status,
}: AccordionButtonProps) => {
  return (
    <Disclosure.Button
      disabled={disabled}
      className="flex w-full items-center justify-between"
    >
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold uppercase">{status}</div>
        <FaAngleUp
          className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
        />
      </div>
    </Disclosure.Button>
  );
};

export type AccordionPanelProps = {
  open: boolean;
  children: ReactNode;
};

export const AccordionPanel = ({ children }: AccordionPanelProps) => {
  return (
    <Disclosure.Panel className="text-left pt-8">{children}</Disclosure.Panel>
  );
};

Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;
