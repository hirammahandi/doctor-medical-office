import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import { validateRequestSession } from '@/auth';
import { ClientRoutes } from '@/lib/clients-routes';

const AuthenticationLayout = async ({ children }: PropsWithChildren) => {
  const { session } = await validateRequestSession();

  if (session) redirect(ClientRoutes.DASHBOARD);

  return (
    <main className="container grid h-dvh place-content-center pt-4 md:pt-0">
      {children}
    </main>
  );
};

export default AuthenticationLayout;
