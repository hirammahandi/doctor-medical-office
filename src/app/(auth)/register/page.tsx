import { Metadata } from "next";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register a new account",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
