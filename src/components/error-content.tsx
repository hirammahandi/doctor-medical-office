import React, { FC } from "react";
import { Button } from "./ui/button";

export const ErrorContent: FC<{ reset: () => void }> = ({ reset }) => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're sorry, but an unexpected error has occurred. Please try again
          later or contact support if the issue persists.
        </p>
        <div className="mt-6 flex items-center justify-center gap-5">
          <Button
            variant="secondary"
            className="w-32"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </Button>
          <Button className="w-32" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};
