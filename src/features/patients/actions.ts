'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/lib/clients-routes';
import { ErrorsMessages } from '@/lib/constants';
import { type ActionsResult } from '@/lib/types';
import {
  countOfPatientsByDoctorId,
  createPatient,
  deletePatientByDoctorId,
  findPatientById,
  findPatients,
  updatePatient,
} from './repository';
import { deletePatientSchema, upsertPatientSchema } from './schemas';
import {
  type PatientDetailsSchema,
  type DeletePatientSchema,
  type GetPatientResult,
  type UpsertPatientSchema,
} from './types';

export const addNewPatient = async (
  patient: UpsertPatientSchema,
): ActionsResult<void> => {
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
): ActionsResult<void> => {
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

export const removePatient = async (
  patientId: DeletePatientSchema,
): ActionsResult<void> => {
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

export const getTotalPatients = async (): ActionsResult<number> => {
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
): ActionsResult<GetPatientResult[]> => {
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

export const getPatient = async ({
  patientId,
}: PatientDetailsSchema): ActionsResult<GetPatientResult | null> => {
  try {
    const { session, user } = await validateRequestSession();
    if (!session) redirect(ClientRoutes.LOGIN);
    const doctorId = user.id;
    const patient = await findPatientById({
      where: {
        userId: doctorId,
        id: patientId,
      },
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
    return patient;
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.log('Error getting the patient', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};
