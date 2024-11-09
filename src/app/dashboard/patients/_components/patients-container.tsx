import { redirect } from 'next/navigation';
import { type FC } from 'react';
import { validateRequestSession } from '@/auth';
import { findPaginatedPatients } from '@/features/patients';
import { ClientRoutes } from '@/utils/clients-routes';
import { EmptyPatientsView } from './empty-patients-view';
import { PatientsList } from './patients-list';
import { TotalPatientsBadge } from './total-patients-badge';
import { NotFoundPatientsView } from './not-found-patients-view';

type PatientsListProps = {
  search?: string;
};

export const PatientsContainer: FC<PatientsListProps> = async ({ search }) => {
  const { session, user } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  const result = await findPaginatedPatients({
    userId: user.id,
    search,
  });

  if (!result.patients.length && search) return <NotFoundPatientsView />;

  if (!result.patients.length) return <EmptyPatientsView />;

  return (
    <PatientsList paginatedPatientsResult={result} key={JSON.stringify(result)}>
      <TotalPatientsBadge total={result.total} />
    </PatientsList>
  );
};
