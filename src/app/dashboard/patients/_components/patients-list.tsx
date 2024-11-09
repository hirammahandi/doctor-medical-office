'use client';

import { toast } from 'sonner';
import { type FC, type PropsWithChildren, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getPaginatedPatients } from '@/features/patients';
import { type GetPatientsPaginatedResult } from '@/features/patients/types';
import { ErrorsMessages } from '@/utils/constants';
import { PatientCard } from './patient-card';

type PatientsTableProps = PropsWithChildren<{
  paginatedPatientsResult: GetPatientsPaginatedResult;
}>;

export const PatientsList: FC<PatientsTableProps> = ({
  paginatedPatientsResult,
  children,
}) => {
  const { patients, page, totalPages, total } = paginatedPatientsResult;
  const [parent] = useAutoAnimate();
  const [patientsList, setPatientsList] = useState(patients);
  const actualPage = useRef(page);
  const hasNextPage = actualPage.current < totalPages;
  const restOfPatients = total - patientsList.length;

  // TODO: Add pagination
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
      <div ref={parent} className="grid gap-4 md:grid-cols-3">
        {patientsList.map((patient) => (
          <PatientCard patient={patient} key={patient.id} />
        ))}
      </div>
    </div>
  );
};
