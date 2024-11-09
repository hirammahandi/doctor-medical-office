import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "@/features/authentication/actions";
import { loginSchema, type LoginSchema } from "@/features/authentication";

export const useLoginAction = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin: SubmitHandler<LoginSchema> = async (formData) => {
    form.setError("root", { message: "" });

    const response = await login(formData);
    if (response?.error) {
      form.setError("root", { message: response.error });
    } else {
      toast.success("Login successful");
    }
  };

  return {
    states: {
      form,
      isLoading: form.formState.isSubmitting,
      errorResponse: form.formState.errors.root,
    },
    actions: { handleLogin: form.handleSubmit(handleLogin) },
  };
};
