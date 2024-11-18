import { getRecentPatients } from '@/features/patients';
import { hasErrors } from '@/utils/tools';
import { RecentPatientsTable } from './recent-patients-table';

export const RecentPatientsContainer = async () => {
  const recentPatients = await getRecentPatients();

  if (hasErrors(recentPatients)) throw new Error(recentPatients.error);

  return <RecentPatientsTable recentPatients={recentPatients} />;
};
