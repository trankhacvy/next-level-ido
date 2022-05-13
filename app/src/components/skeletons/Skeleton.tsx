import cx from "classnames";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;

  return <div className={cx(className, "animate-pulse rounded-md bg-black/[0.11]")} />;
};
