import { EmptyResultsView } from '@/components/empty-results-view';
import { Button } from '@/components/ui/button';
import { contentData } from '@/lib/content-data';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';

export const EmptyPatientsView = () => {
  return (
    <EmptyResultsView>
      <UpsertPatientModalForm
        buttonTrigger={
          <Button>
            {contentData.upsertPatientContentData.create.addButtonTrigger}
          </Button>
        }
      />
    </EmptyResultsView>
  );
};
