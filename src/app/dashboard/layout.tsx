import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import { validateRequestSession } from '@/auth';
import { ContentLayout } from '@components/content-layout';
import { ClientRoutes } from '@/lib/clients-routes';
import { AdminPanelLayout } from '@dashboard/_components/dashboard-panel-layout';

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { session } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  return (
    <AdminPanelLayout>
      <ContentLayout>{children}</ContentLayout>
    </AdminPanelLayout>
  );
};

export default DashboardLayout;
