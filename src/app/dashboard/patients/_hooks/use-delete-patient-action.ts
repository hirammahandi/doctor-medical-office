import { useTransition } from 'react';
import { toast } from 'sonner';
import { removePatient } from '@/features/patients';
import { useOpenDialog } from '@/hooks';

type UseDeletePatientActionParams = {
  patientId: string;
};

export const useDeletePatientActions = ({
  patientId,
}: UseDeletePatientActionParams) => {
  const [isPending, startTransition] = useTransition();
  const { handleOpenDialog, openDialog } = useOpenDialog({
    openConditions: [isPending],
  });

  const handleDeletePatient = () => {
    startTransition(async () => {
      const response = await removePatient(patientId);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success('Patient deleted');
      }
    });
  };

  return {
    states: {
      openDialog,
      isPending,
    },
    actions: {
      handleDeletePatient,
      handleOpenDialog,
    },
  };
};
