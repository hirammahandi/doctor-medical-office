'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';
import {
  countOfPatientsByDoctorId,
  createPatient,
  deletePatientByDoctorId,
  findPatients,
  updatePatient,
} from './repository';
import { deletePatientSchema, upsertPatientSchema } from './schemas';
import {
  type GetRecentPatientsResult,
  type UpsertPatientSchema,
} from './types';

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

export const getTotalPatients = async () => {
  try {
    const { session, user } = await validateRequestSession();

    if (!session) redirect(ClientRoutes.LOGIN);

    const doctorId = user.id;

    const count = await countOfPatientsByDoctorId(doctorId);

    return count;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error getting the patients total', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};

export const getRecentPatients = async (
  take = 5,
): Promise<GetRecentPatientsResult[] | { error: string }> => {
  try {
    const { session, user } = await validateRequestSession();

    if (!session) redirect(ClientRoutes.LOGIN);

    const doctorId = user.id;

    const recentPatients = await findPatients({
      where: {
        userId: doctorId,
      },

      take,
      select: {
        id: true,
        address: true,
        age: true,
        createdAt: true,
        identification: true,
        lastName: true,
        name: true,
      },
    });

    return recentPatients;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error getting the recent patients', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};
