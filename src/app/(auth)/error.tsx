// Error components must be Client Components
"use client";

import { useEffect } from "react";
import { ErrorBoundaryContent } from "@/components/error-content";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorBoundaryContent onReset={reset} />;
};

export default Error;
