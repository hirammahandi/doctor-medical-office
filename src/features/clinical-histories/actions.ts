'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';
import { requiredUuid } from '@/utils/validation';
import { upsertMedicalHistory } from './repository';
import { upsertMedicalHistorySchema } from './schemas';
import { type UpsertMedicalHistorySchema } from './types';

export const upsertPatientMedicalHistory = async (
  patientId: string,
  medicalHistory: UpsertMedicalHistorySchema,
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
    const parsedMedicalHistoryData =
      upsertMedicalHistorySchema.parse(medicalHistory);

    const parsedPatientId = requiredUuid.parse(patientId);

    await upsertMedicalHistory({
      ...parsedMedicalHistoryData,
      patient: {
        connect: {
          id: parsedPatientId,
        },
      },
    });
    revalidatePath(ClientRoutes.PATIENTS, 'page');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error upsert medical history', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};