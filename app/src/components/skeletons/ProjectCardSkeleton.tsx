import { Skeleton } from "./Skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="card">
      <div className="w-full flex px-8 pt-8">
        <Skeleton className="rounded-2xl w-32 h-32" />
        <div className="ml-6 flex-1">
          <Skeleton className="w-40 h-6" />
        </div>
      </div>
      <div className="p-8 space-y-3">
        <Skeleton className="w-11/12 h-5" />
        <Skeleton className="w-10/12 h-5" />
        <Skeleton className="w-9/12 h-5" />
        <Skeleton className="w-9/12 h-5" />
      </div>
      <div className="p-8">
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
