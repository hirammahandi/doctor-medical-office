'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/utils/clients-routes';
import { ErrorsMessages } from '@/utils/constants';
import { updateUser } from './repository';
import { updateDoctorSchema } from './schemas';
import { type UpdateDoctorSchema } from './types';

export const updateDoctor = async (
  body: UpdateDoctorSchema,
): Promise<{ error: string } | undefined> => {
  try {
    const parsedBody = updateDoctorSchema.parse(body);
    const { session, user } = await validateRequestSession();

    if (!session) {
      redirect(ClientRoutes.LOGIN);
    }

    const id = user.id;

    await updateUser({ id, ...parsedBody });
    revalidatePath(ClientRoutes.DOCTOR);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error updating doctor', error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};
