'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';
import { createPatient, deletePatientByDoctorId } from './repository';
import { createPatientSchema, deletePatientSchema } from './schemas';
import { type CreatePatientSchema } from './types';

export const addNewPatient = async (
  patient: CreatePatientSchema,
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  try {
    const parsedPatientData = createPatientSchema.parse(patient);
    const { session, user } = await validateRequestSession();

    if (!session) {
      redirect(ClientRoutes.LOGIN);
    }

    const id = user.id;

    await createPatient({
      ...parsedPatientData,
      user: {
        connect: {
          id,
        },
      },
    });
    revalidatePath(ClientRoutes.PATIENTS, 'page');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error adding new patient', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};

export const removePatient = async (patientId: string) => {
  try {
    const safePatientId = deletePatientSchema.parse(patientId);

    const { session, user } = await validateRequestSession();

    if (!session) {
      redirect(ClientRoutes.LOGIN);
    }

    const doctorId = user.id;
    await deletePatientByDoctorId(doctorId, safePatientId);
    revalidatePath(ClientRoutes.PATIENTS, 'page');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error deleting a patient', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};
