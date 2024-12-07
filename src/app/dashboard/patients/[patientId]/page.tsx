import { type FC } from 'react';
import { PatientDetailsContainer } from '../_components/patient-details-container';

type PatientDetailsPageProps = {
  params: Promise<{ patientId: string }>;
};

const PatientDetailsPage: FC<PatientDetailsPageProps> = async ({ params }) => {
  const { patientId } = await params;

  return (
    <div>
      <PatientDetailsContainer />
    </div>
  );
};

export default PatientDetailsPage;
