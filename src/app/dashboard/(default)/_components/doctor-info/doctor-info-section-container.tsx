import { type FindUserResult, isDoctorModel } from '@/features/users';
import { getDoctorInformation } from '@/features/users/actions';
import { DoctorInfoSection } from './doctor-info-section';

export const DoctorInfoSectionContainer = async () => {
  const doctorInfo = await getDoctorInformation();

  if (!isDoctorModel<FindUserResult>(doctorInfo)) {
    return null;
  }

  const { name, lastName } = doctorInfo;

  return <DoctorInfoSection name={name} lastName={lastName} />;
};
