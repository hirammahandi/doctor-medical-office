import React from 'react';
import { cn } from '@/lib/utils';

export const SkeletonStyles = 'animate-pulse rounded-md bg-muted';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(SkeletonStyles, className)} {...props} />;
}

export { Skeleton };
