import { notFound, redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { findUserByEmail } from '@/features/users';
import { ClientRoutes } from '@/utils/clients-routes';
import { DoctorForm } from './doctor-form';

export const DoctorFormContainer = async () => {
  const { user, session } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  const email = user.email;

  const findUser = await findUserByEmail(email, {
    select: {
      name: true,
      email: true,
      lastName: true,
      username: true,
    },
  });

  if (!findUser) notFound();

  return <DoctorForm user={findUser} />;
};
