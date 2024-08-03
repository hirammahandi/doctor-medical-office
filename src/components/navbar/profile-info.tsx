import { validateRequestSession } from "@/auth";
import { cn } from "@/lib/utils";
import { Badge, badgeVariants } from "@components/ui/badge";
import { Skeleton } from "@components/ui/skeleton";

export const ProfileInfo = async () => {
  const { user } = await validateRequestSession();
  const name = user?.name;

  if (!name) return false;

  return <Badge variant="secondary">{name}</Badge>;
};

export const ProfileInfoSkeleton = () => {
  return (
    <Skeleton
      className={cn(badgeVariants({ variant: "secondary" }), "h-[21px] w-20")}
    />
  );
};
