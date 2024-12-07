import { notFound } from 'next/navigation';
import {
  type FindUserResult,
  getDoctorInformation,
  isDoctorModel,
} from '@/features/users';
import { hasErrors } from '@/lib/tools';
import { DoctorForm } from './doctor-form';

export const DoctorFormContainer = async () => {
  const foundDoctor = await getDoctorInformation();

  if (hasErrors(foundDoctor)) throw new Error(foundDoctor.error);

  if (!isDoctorModel<FindUserResult>(foundDoctor)) {
    notFound();
  }

  return <DoctorForm user={foundDoctor} />;
};
