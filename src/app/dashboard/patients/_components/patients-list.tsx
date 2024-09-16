'use client';

import { type FC, type PropsWithChildren, useRef, useState } from 'react';
import InfiniteScrollContainer from 'react-infinite-scroll-component';
import { toast } from 'sonner';
import { getPaginatedPatients } from '@/features/patients';
import { type GetPatientsPaginatedResult } from '@/features/patients/types';
import { ErrorsMessages } from '@/utils/constants';
import { range } from '@/utils/tools';
import { PatientCard } from './patient-card';
import { PatientSkeletonCard } from './patient-skeleton-card';

type PatientsTableProps = PropsWithChildren<{
  paginatedPatientsResult: GetPatientsPaginatedResult;
}>;

export const PatientsList: FC<PatientsTableProps> = ({
  paginatedPatientsResult,
  children,
}) => {
  const { patients, page, totalPages, total } = paginatedPatientsResult;
  const [patientsList, setPatientsList] = useState(patients);
  const actualPage = useRef(page);
  const hasNextPage = actualPage.current < totalPages;
  const restOfPatients = total - patientsList.length;

  const handleGetNextPatients = async () => {
    const nextPage = actualPage.current + 1;
    actualPage.current = nextPage;

    const response = await getPaginatedPatients(nextPage);

    if (!response.success) {
      return toast.error(ErrorsMessages.SOMETHING_WENT_WRONG);
    }

    const { patients: patientsData } = response.data;
    const newPatientsList = [...patientsList, ...patientsData];
    setPatientsList(newPatientsList);
  };

  return (
    <div className="space-y-2">
      {children}
      <InfiniteScrollContainer
        dataLength={patientsList.length}
        hasMore={hasNextPage}
        loader={
          <>
            {range(restOfPatients).map((index) => (
              <PatientSkeletonCard key={index} />
            ))}
          </>
        }
        className="grid gap-4 md:grid-cols-3"
        next={handleGetNextPatients}
      >
        {patientsList.map((patient) => (
          <PatientCard patient={patient} key={patient.id} />
        ))}
      </InfiniteScrollContainer>
    </div>
  );
};
