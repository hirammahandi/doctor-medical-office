import { validateRequestSession } from "@/auth";
import { ContentLayout } from "@components/content-layout";
import { ClientRoutes } from "@/utils/clients-routes";
import { AdminPanelLayout } from "@dashboard/_components/dashboard-panel-layout";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

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
