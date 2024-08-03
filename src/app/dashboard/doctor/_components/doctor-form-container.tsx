import { validateRequestSession } from "@/auth";
import { findUserByEmail } from "@/features/users";
import { ClientRoutes } from "@/utils/clients-routes";
import { notFound, redirect } from "next/navigation";
import { DoctorForm } from "./doctor-form";

export const DoctorFormContainer = async () => {
  const { user } = await validateRequestSession();
  const email = user?.email;

  if (!email) redirect(ClientRoutes.LOGIN);

  const findUser = await findUserByEmail(email, {
    select: {
      name: true,
      email: true,
      lastName: true,
      username: true,
    },
  });

  if (!findUser) notFound();

  return <DoctorForm user={findUser} />;
};
