import { zodResolver } from '@hookform/resolvers/zod';
import { type Patient } from '@prisma/client';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { contentData } from '@/lib/content-data';
import { type UpsertPatientSchema } from '@/features/patients/types';
import { upsertPatientSchema } from '@/features/patients/schemas';
import { addNewPatient, updateExistPatient } from '@/features/patients';
import { useRemoveSearchParams } from '@/hooks';

const defaultValues: UpsertPatientSchema = {
  name: '',
  lastName: '',
  age: 1,
  address: '',
  identification: '',
};

type UseUpsertPatientActionParams =
  | {
      patient?: Patient;
      openOnCreateParam?: boolean;
    }
  | undefined;

export const useUpsertPatientAction = (
  params?: UseUpsertPatientActionParams,
) => {
  const [openDialog, setOpenDialog] = useState(
    params?.openOnCreateParam ?? false,
  );
  const { handleRemoveSearchParams } = useRemoveSearchParams();
  const form = useForm<UpsertPatientSchema>({
    resolver: zodResolver(upsertPatientSchema),
    defaultValues: params?.patient ?? defaultValues,
  });

  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleOpenDialog = (open: boolean) => {
    if (isLoading) return;
    if (!open && params?.openOnCreateParam) handleRemoveSearchParams();

    setOpenDialog(open);
  };

  const handleCreatePatient: SubmitHandler<UpsertPatientSchema> = async (
    formData,
  ) => {
    const patient = params?.patient;
    const response = patient?.id
      ? await updateExistPatient(patient.id, formData)
      : await addNewPatient(formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      setOpenDialog(false);
      const successMessage = patient?.id
        ? contentData.upsertPatientContentData.update.successMessage
        : contentData.upsertPatientContentData.create.successMessage;
      toast.success(successMessage);
      form.reset();
    }
  };

  return {
    states: {
      form,
      isLoading,
      errors,
      openDialog,
    },
    actions: {
      handleOpenDialog,
      handleCreatePatient: form.handleSubmit(handleCreatePatient),
    },
  };
};
