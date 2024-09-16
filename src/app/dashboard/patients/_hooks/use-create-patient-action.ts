import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CreatePatientSchema } from "@/features/patients/types";
import { createPatientSchema } from "@/features/patients/schemas";
import { addNewPatient } from "@/features/patients/actions";

const defaultValues: CreatePatientSchema = {
  name: "",
  lastName: "",
  age: 1,
  address: "",
  identification: "",
};

export const useCreatePatientAction = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<CreatePatientSchema>({
    resolver: zodResolver(createPatientSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleOpenDialog = (open: boolean) => {
    if (isLoading) return;
    setOpenDialog(open);
  };

  const handleCreatePatient: SubmitHandler<CreatePatientSchema> = async (
    formData,
  ) => {
    const response = await addNewPatient(formData);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Patient created");
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
