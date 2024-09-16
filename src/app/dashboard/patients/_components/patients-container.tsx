import { notFound } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { findPaginatedPatients } from '@/features/patients';
import { EmptyPatientsView } from './empty-patients-view';
import { PatientsList } from './patients-list';
import { TotalPatientsBadge } from './total-patients-badge';

export const PatientsContainer = async () => {
  const { session, user } = await validateRequestSession();

  if (!session) notFound();

  const result = await findPaginatedPatients({
    userId: user.id,
  });

  if (!result.patients.length) return <EmptyPatientsView />;

  return (
    <PatientsList paginatedPatientsResult={result} key={JSON.stringify(result)}>
      <TotalPatientsBadge total={result.total} />
    </PatientsList>
  );
};
