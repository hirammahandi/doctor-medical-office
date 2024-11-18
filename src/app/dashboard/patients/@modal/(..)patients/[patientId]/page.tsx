import { PatientDetailsContainer } from '../../../_components/patient-details-container';
import { PatientDetailsDialog } from '../../../_components/patient-details-dialog';

const PatientDetailsParallelPage = () => {
  return (
    <div>
      <PatientDetailsDialog>
        <PatientDetailsContainer />
      </PatientDetailsDialog>
    </div>
  );
};

export default PatientDetailsParallelPage;
