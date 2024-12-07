import { type FC } from 'react';
import { notFound } from 'next/navigation';
import { getPatient, patientDetailsSchema } from '@/features/patients';
import { isResultError } from '@/lib/utils';
import { PatientDetailsContainer } from '../../../_components/patient-details-container';
import { PatientDetailsDialog } from '../../../_components/patient-details-dialog';
import { PatientDetails } from '../../../_components/patient-details';

type PatientDetailsParallelPageProps = {
  params: Promise<{ patientId: string }>;
};

const PatientDetailsParallelPage: FC<PatientDetailsParallelPageProps> = async ({
  params,
}) => {
  const safeParams = patientDetailsSchema.safeParse(await params);

  if (!safeParams.success) {
    notFound();
  }

  const patient = await getPatient({
    patientId: safeParams.data.patientId,
  });

  if (!patient) {
    notFound();
  }

  if (isResultError(patient)) {
    throw new Error(patient.error);
  }

  return (
    <div>
      <PatientDetailsDialog>
        <PatientDetailsContainer isDialog>
          <div>
            <PatientDetails patient={patient} />
          </div>
        </PatientDetailsContainer>
      </PatientDetailsDialog>
    </div>
  );
};

export default PatientDetailsParallelPage;
