import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateDoctor } from "@/features/users/actions";
import { updateDoctorSchema } from "@/features/users/schemas";
import { type FindUserResult, type UpdateDoctorSchema } from "@/features/users/types";
import { hasDifferentValues } from "@/utils/tools";

type UseUpdateProfileActionProps = {
  user: FindUserResult;
};
export const useUpdateDoctorAction = ({
  user,
}: UseUpdateProfileActionProps) => {
  const form = useForm<UpdateDoctorSchema>({
    defaultValues: user,
    resolver: zodResolver(updateDoctorSchema),
  });

  const handleUpdateProfile: SubmitHandler<UpdateDoctorSchema> = async (
    formData,
  ) => {
    if (!hasDifferentValues(user, formData)) {
      toast.warning("Please, update your personal information");
      return;
    }

    const response = await updateDoctor(formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Personal information updated");
    }
  };

  return {
    states: {
      form,
      isLoading: form.formState.isSubmitting,
    },
    actions: {
      handleUpdateProfile: form.handleSubmit(handleUpdateProfile),
    },
  };
};
