import { validateRequestSession } from "@/auth";
import { ClientRoutes } from "@/utils/clients-routes";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const AuthenticationLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { session } = await validateRequestSession();

  if (session) redirect(ClientRoutes.DASHBOARD);

  return (
    <main className="container grid h-dvh place-content-center pt-4 md:pt-0">
      {children}
    </main>
  );
};

export default AuthenticationLayout;
