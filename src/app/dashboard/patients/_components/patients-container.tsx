import { redirect } from 'next/navigation';
import { validateRequestSession } from '@/auth';
import { InvalidQueryParamsView } from '@/components/invalid-query-params-view';
import {
  findPaginatedPatients,
  patientsQueryParamSchema,
  type PatientsQueryParamSchema,
} from '@/features/patients';
import { ClientRoutes, ClientSearchParams } from '@/lib/clients-routes';
import { NoResultsView } from '../../../../components/no-results-view';
import { EmptyPatientsView } from './empty-patients-view';
import { PatientsList } from './patients-list';
import { TotalPatientsBadge } from './total-patients-badge';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';

type PatientsListProps = {
  patientQueryParams: PatientsQueryParamSchema;
};

export const PatientsContainer = async ({
  patientQueryParams,
}: PatientsListProps) => {
  const safeQueryParams =
    patientsQueryParamSchema.safeParse(patientQueryParams);

  if (!safeQueryParams.success) {
    return <InvalidQueryParamsView />;
  }

  const { page, search, create } = safeQueryParams.data;

  // TODO: Pass this logic to actions
  const { session, user } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  const result = await findPaginatedPatients({
    userId: user.id,
    search,
    currentPage: page,
  });

  if (!result.patients.length && (!!search || !!page)) return <NoResultsView />;

  if (!result.patients.length) return <EmptyPatientsView />;

  return (
    <>
      <UpsertPatientModalForm
        buttonTrigger={null}
        openOnCreateParam={create === ClientSearchParams.CREATE.values.true}
      />
      <PatientsList
        paginatedPatientsResult={result}
        key={JSON.stringify(result)}
      >
        <TotalPatientsBadge total={result.total} />
      </PatientsList>
    </>
  );
};
