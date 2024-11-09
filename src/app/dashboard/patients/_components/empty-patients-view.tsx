import { Button } from '@/components/ui/button';
import { contentData } from '@/lib/content-data';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';

export const EmptyPatientsView = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-foreground">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">No patients to display</h2>
        <p className="text-muted-foreground">
          It looks like you don&apos;t have any patients to display yet.
          Let&apos;s get started by adding some new patients.
        </p>
        <UpsertPatientModalForm
          buttonTrigger={
            <Button>
              {contentData.upsertPatientContentData.create.addButtonTrigger}
            </Button>
          }
        />
      </div>
    </div>
  );
};
