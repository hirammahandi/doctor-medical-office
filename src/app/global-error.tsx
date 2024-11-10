'use client';

import { useEffect } from 'react';
import { ErrorBoundaryContent } from '@/components/error-content';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorBoundaryContent onReset={reset} />;
      </body>
    </html>
  );
}
