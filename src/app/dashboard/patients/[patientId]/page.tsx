import { type FC } from 'react';
import { notFound } from 'next/navigation';
import {
  patientDetailsSchema,
  getPatient,
  type PatientDetailsSchema,
} from '@/features/patients';
import { isResultError } from '@/lib/utils';
import { PatientDetailsContainer } from '../_components/patient-details-container';
import { PatientDetails } from '../_components/patient-details';

type PatientDetailsPageProps = {
  params: Promise<PatientDetailsSchema>;
};

const PatientDetailsPage: FC<PatientDetailsPageProps> = async ({ params }) => {
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
      <PatientDetailsContainer>
        <PatientDetails patient={patient} />
      </PatientDetailsContainer>
    </div>
  );
};

export default PatientDetailsPage;
