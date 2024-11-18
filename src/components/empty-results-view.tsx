import { type ComponentPropsWithoutRef, type FC } from 'react';
import { cn } from '@/lib/utils';

type EmptyResultsViewProps = ComponentPropsWithoutRef<'div'>;

export const EmptyResultsView: FC<EmptyResultsViewProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'flex min-h-[70vh] flex-col items-center justify-center text-foreground',
        className,
      )}
    >
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">No results to display</h2>
        <p className="text-muted-foreground">
          It looks like you don&apos;t have any results to display yet.
          Let&apos;s get started by adding a few.
        </p>
        {children}
      </div>
    </div>
  );
};
