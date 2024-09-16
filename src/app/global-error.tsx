'use client';

import { useEffect } from 'react';

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

  // TODO: Use the same layout styles
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong! Globa-Error</h2>
        <button onClick={() => reset()} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
