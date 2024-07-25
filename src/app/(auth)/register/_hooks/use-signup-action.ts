import { SignUpSchema, signUpSchema } from "@/features/authentication";
import { toast } from "sonner";
import { signUp } from "@/features/authentication/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const useSignupAction = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      lastName: "",
      name: "",
      password: "",
      username: "",
    },
  });

  const handleSignUp: SubmitHandler<SignUpSchema> = async (formData) => {
    const response = await signUp(formData);

    if (response?.error) {
      form.setError("root", { message: response.error });
    } else {
      toast.success("Sign up successful");
    }
  };

  return {
    states: {
      form,
      isLoading: form.formState.isSubmitting,
      errorResponse: form.formState.errors.root,
    },
    actions: { handleSignUp: form.handleSubmit(handleSignUp) },
  };
};