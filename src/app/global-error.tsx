"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // TODO: Use the same layout styles
  return (
    <html>
      <body>
        <h2>Something went wrong! Globa-Error</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
