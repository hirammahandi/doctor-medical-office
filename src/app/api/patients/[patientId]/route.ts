/* eslint-disable @typescript-eslint/no-unnecessary-condition -- This is intentional */
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { validateRequestSession } from '@/auth';
import {
  deletePatientByDoctorId,
  deletePatientSchema,
} from '@/features/patients';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { patientId: string } },
) => {
  let requestAborted = false; // Flag to track abort state

  // Listen for the abort event and set the flag
  request.signal.addEventListener('abort', () => {
    requestAborted = true; // Set the flag
  });

  // Check abort signal at the beginning
  if (request.signal.aborted || requestAborted) {
    return NextResponse.json(
      { error: ErrorsMessages.REQUEST_ABORTED },
      { status: 408 },
    );
  }

  // Validate patientId
  const safePatientId = deletePatientSchema.safeParse(params.patientId);

  if (!safePatientId.success) {
    return NextResponse.json(
      { error: safePatientId.error.errors[0].message },
      { status: 400 },
    );
  }

  const { session, user } = await validateRequestSession();

  // Check abort signal after async session validation
  if (request.signal.aborted || requestAborted) {
    return NextResponse.json(
      { error: ErrorsMessages.REQUEST_ABORTED },
      { status: 408 },
    );
  }

  if (!session) {
    redirect(ClientRoutes.LOGIN);
  }

  const patientId = safePatientId.data;
  const doctorId = user.id;

  try {
    // Perform the delete action (long-running operation)
    const response = await deletePatientByDoctorId(doctorId, patientId);

    // Check abort signal after deletion operation
    if (request.signal.aborted || requestAborted) {
      return NextResponse.json(
        { error: ErrorsMessages.REQUEST_ABORTED },
        { status: 408 },
      );
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    // Check for abort after catching an error
    if (request.signal.aborted || requestAborted) {
      return NextResponse.json(
        { error: ErrorsMessages.REQUEST_ABORTED },
        { status: 408 },
      );
    }

    return NextResponse.json(
      { error: ErrorsMessages.SOMETHING_WENT_WRONG },
      { status: 500 },
    );
  }
};

/*
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { patientId: string } },
) => {
  const isAborted = isAborted;

  console.log({ isAborted, request: request.signal.reason });

  if (isAborted) {
    return NextResponse.json(
      { error: ErrorsMessages.REQUEST_ABORTED },
      { status: 408 },
    );
  }

  const safePatientId = deletePatientSchema.safeParse(params.patientId);

  if (!safePatientId.success) {
    return NextResponse.json(
      { error: safePatientId.error.errors[0].message },
      { status: 400 },
    );
  }
  console.log({ safePatientId: safePatientId.data });

  const { session, user } = await validateRequestSession();

  if (!session) {
    redirect(ClientRoutes.LOGIN);
  }

  const patientId = safePatientId.data;
  const doctorId = user.id;

  try {
    const response = await deletePatientByDoctorId(doctorId, patientId);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: ErrorsMessages.SOMETHING_WENT_WRONG },
      { status: 500 },
    );
  }
}; */

/* const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "A collection of dependency-free React hooks",
        text: "Carefully developed React hooks that you can copy and paste.",
        url: "https://novajs.co",
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log(" Share API no es compatible en este navegador");
  }
};
 */
