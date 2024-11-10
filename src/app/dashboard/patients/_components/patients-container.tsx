import { redirect } from 'next/navigation';
import { type FC } from 'react';
import { validateRequestSession } from '@/auth';
import { InvalidQueryParamsView } from '@/components/invalid-query-params-view';
import {
  findPaginatedPatients,
  patientsQueryParamSchema,
  type PatientsQueryParamSchema,
} from '@/features/patients';
import { ClientRoutes } from '@/utils/clients-routes';
import { NoResultsView } from '../../../../components/no-results-view';
import { EmptyPatientsView } from './empty-patients-view';
import { PatientsList } from './patients-list';
import { TotalPatientsBadge } from './total-patients-badge';

type PatientsListProps = {
  patientQueryParams: PatientsQueryParamSchema;
};
export const PatientsContainer: FC<PatientsListProps> = async ({
  patientQueryParams,
}) => {
  const { session, user } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  const safeQueryParams =
    patientsQueryParamSchema.safeParse(patientQueryParams);

  if (!safeQueryParams.success) {
    return <InvalidQueryParamsView />;
  }

  const { page, search } = safeQueryParams.data;

  const result = await findPaginatedPatients({
    userId: user.id,
    search,
    currentPage: page,
  });

  if (!result.patients.length && (!!search || !!page)) return <NoResultsView />;

  if (!result.patients.length) return <EmptyPatientsView />;

  return (
    <PatientsList paginatedPatientsResult={result} key={JSON.stringify(result)}>
      <TotalPatientsBadge total={result.total} />
    </PatientsList>
  );
};
