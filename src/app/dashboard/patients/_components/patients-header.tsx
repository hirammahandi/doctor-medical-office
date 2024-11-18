import { PlusCircleIcon } from 'lucide-react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { contentData } from '@/lib/content-data';
import { UpsertPatientModalForm } from './upsert-patient-modal-form';
import { PatientSearchBar } from './patient-search-bar';

export const PatientsHeader = () => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <PatientSearchBar />
      <Suspense>
        <UpsertPatientModalForm
          buttonTrigger={
            <Button>
              <PlusCircleIcon className="h-4 w-4" />
              <span className="sm:block hidden">
                {contentData.upsertPatientContentData.create.addButtonTrigger}
              </span>
            </Button>
          }
        />
      </Suspense>
    </div>
  );
};
