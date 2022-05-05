import cx from "classnames";

export type RoadmapItemProps = {
  title?: string;
  content?: string;
  isRight?: boolean;
};

const RoadmapItem = ({
  title = "",
  content = "",
  isRight = false,
}: RoadmapItemProps) => {
  return (
    <div
      className={cx(
        "relative w-1/2 mb-8",
        {
          "ml-[50%]": isRight,
          "text-right": !isRight,
        },
        isRight ? "pl-8" : "pr-8"
      )}
    >
      <div
        className={cx(
          "w-6 h-6 rounded-full absolute bg-white border-2 border-gray-900 top-0 ml-[1px]",
          isRight ? "left-[-12px]" : "right-[-12px]"
        )}
      />
      <h4 className="text-white text-4xl leading-tight font-semibold">{title}</h4>
      <p className="mt-2 text-lg">{content}</p>
    </div>
  );
};

export default RoadmapItem;
