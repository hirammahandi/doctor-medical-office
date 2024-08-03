"use client"; // Error components must be Client Components

import { ErrorContent } from "@/components/error-content";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorContent reset={reset} />;
}
