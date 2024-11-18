import { Skeleton } from '@/components/ui/skeleton';

export const DoctorInfoSectionSkeleton = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Skeleton className="h-8 rounded w-1/3" />
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
};
