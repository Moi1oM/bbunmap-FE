import { Skeleton } from "@/components/ui/skeleton";

export function SearchBottomModalSkeleton() {
  return (
    <div className="h-[320px] bottom-0 z-20 fixed bg-white max-w-[450px] w-full rounded-t-2xl">
      <div className="flex flex-col justify-start">
        <div className="flex flex-row items-center justify-around mt-6">
          <div className="flex flex-col items-start justify-start">
            <Skeleton className="h-8 w-32 mb-3" />
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="w-24 h-24 rounded-md" />
        </div>
        <div className="mt-4 text-center">
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-row items-center justify-evenly mt-8">
          <Skeleton className="h-10 w-full mx-4" />
        </div>
      </div>
    </div>
  );
}
