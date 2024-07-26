import { loginSchema, LoginSchema } from "@/features/authentication";
import { login } from "@/features/authentication/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

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
