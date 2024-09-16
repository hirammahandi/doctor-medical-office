import { type NextRequest, NextResponse } from 'next/server';

export async function handleAbort(
  request: NextRequest,
  logic: () => Promise<unknown>,
): Promise<NextResponse> {
  let requestAborted = false;

  // Listen for the abort event and set the flag
  request.signal.addEventListener('abort', () => {
    console.log('Request aborted');
    requestAborted = true;
  });

  // Check if request was aborted before running logic
  if (request.signal.aborted || requestAborted) {
    return NextResponse.json(
      { error: 'Request aborted by the client' },
      { status: 408 },
    );
  }

  try {
    // Execute the logic passed in by the route handler
    const result = await logic();

    // Check if request was aborted after running the logic
    if (request.signal.aborted || requestAborted) {
      return NextResponse.json(
        { error: 'Request aborted by the client during operation' },
        { status: 408 },
      );
    }

    return result;
  } catch (error) {
    // Handle any errors and check for abort after error handling
    if (request.signal.aborted || requestAborted) {
      return NextResponse.json(
        { error: 'Request aborted by the client during error handling' },
        { status: 408 },
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
