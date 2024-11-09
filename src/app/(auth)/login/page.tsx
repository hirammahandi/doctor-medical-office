import { type Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Update your personal information",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
