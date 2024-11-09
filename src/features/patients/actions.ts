'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';
import {
  createPatient,
  deletePatientByDoctorId,
  updatePatient,
} from './repository';
import { upsertPatientSchema, deletePatientSchema } from './schemas';
import { type UpsertPatientSchema } from './types';

export const addNewPatient = async (
  patient: UpsertPatientSchema,
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  try {
    const parsedPatientData = upsertPatientSchema.parse(patient);
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

export const updateExistPatient = async (
  patientId: string,
  patient: UpsertPatientSchema,
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  try {
    const { session } = await validateRequestSession();

    if (!session) {
      redirect(ClientRoutes.LOGIN);
    }

    const parsedPatientData = upsertPatientSchema.parse(patient);

    await updatePatient(patientId, parsedPatientData);
    revalidatePath(ClientRoutes.PATIENTS, 'page');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error updating new patient', error);

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
