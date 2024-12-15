import { zodResolver } from '@hookform/resolvers/zod';
import { type Patient } from '@prisma/client';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  upsertMedicalHistorySchema,
  type UpsertMedicalHistorySchema,
  upsertPatientMedicalHistory,
} from '@/features/clinical-histories';

type UpsertMedicalHistoryActionParams = {
  patientId: Patient['id'];
};

export const useUpsertPatientMedicalHistoryAction = ({
  patientId,
}: UpsertMedicalHistoryActionParams) => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<UpsertMedicalHistorySchema>({
    defaultValues: { description: '' },
    resolver: zodResolver(upsertMedicalHistorySchema),
  });

  const isLoading = form.formState.isSubmitting;

  const handleOpenDialog = (open: boolean) => {
    if (isLoading) return;
    if (!open) form.reset();
    setOpenDialog(open);
  };

  const handleUpsertMedicalHistory: SubmitHandler<
    UpsertMedicalHistorySchema
  > = async (formData) => {
    const response = await upsertPatientMedicalHistory(patientId, formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      setOpenDialog(false);

      const successMessage = formData.id
        ? "Patient's medical history updated"
        : "Patient's medical history created";

      toast.success(successMessage);
      form.reset();
    }
  };

  return {
    states: {
      openDialog,
      isLoading,
      form,
    },
    actions: {
      handleOpenDialog,
      handleUpsertMedicalHistory: form.handleSubmit(handleUpsertMedicalHistory),
    },
  };
};
