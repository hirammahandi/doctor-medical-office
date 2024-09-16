import { AddPatientModal } from './add-patient-modal';

export const EmptyPatientsView = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-foreground">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">No Patients Found</h2>
        <p className="text-muted-foreground">
          It looks like you don`&apos;`t have any patients to display yet.
          Let`&apos;`s get started by adding some new patients.
        </p>
        <AddPatientModal />
      </div>
    </div>
  );
};
