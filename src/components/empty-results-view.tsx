import { type FC, type PropsWithChildren } from 'react';

type EmptyResultsViewProps = PropsWithChildren;

export const EmptyResultsView: FC<EmptyResultsViewProps> = ({ children }) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-foreground">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">No results to display</h2>
        <p className="text-muted-foreground">
          It looks like you don&apos;t have any results to display yet.
          Let&apos;s get started by adding some new patients.
        </p>
        {children}
      </div>
    </div>
  );
};
