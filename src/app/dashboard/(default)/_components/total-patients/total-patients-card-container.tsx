import { getTotalPatients } from '@/features/patients';
import { hasErrors } from '@/utils/tools';
import { TotalPatientsCard } from './total-patients-card';

export const TotalPatientsCardContainer = async () => {
  const totalPatients = await getTotalPatients();

  if (hasErrors(totalPatients)) throw new Error(totalPatients.error);

  return <TotalPatientsCard totalPatients={totalPatients} />;
};
