import { type FC, type PropsWithChildren } from 'react';
import { CustomPagination } from '@/components/custom-pagination';
import { type GetPatientsPaginatedResult } from '@/features/patients/types';
import { ClientRoutes } from '@/utils/clients-routes';
import { PatientCard } from './patient-card';

type PatientsTableProps = PropsWithChildren<{
  paginatedPatientsResult: GetPatientsPaginatedResult;
}>;

export const PatientsList: FC<PatientsTableProps> = ({
  paginatedPatientsResult,
  children,
}) => {
  const { patients: patientsList, page, totalPages } = paginatedPatientsResult;
  const actualPage = page;
  const hasNextPage = actualPage < totalPages;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 h-[900px]">
      {children}
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        {patientsList.map((patient) => (
          <PatientCard patient={patient} key={patient.id} />
        ))}
      </div>
      <CustomPagination
        actualPage={actualPage}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        pathname={ClientRoutes.PATIENTS}
      />
    </div>
  );
};
