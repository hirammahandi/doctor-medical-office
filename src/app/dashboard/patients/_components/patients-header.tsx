import { AddPatientModal } from './add-patient-modal';
import { PatientSearchBar } from './patient-search-bar';

export const PatientsHeader = () => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <PatientSearchBar />
      <AddPatientModal />
    </div>
  );
};
