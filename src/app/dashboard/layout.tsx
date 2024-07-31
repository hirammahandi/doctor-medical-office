import React, { FC, PropsWithChildren } from "react";
import { AdminPanelLayout } from "@dashboard/_components/dashboard-panel-layout";
import { validateRequestSession } from "@/auth";
import { redirect } from "next/navigation";
import { ClientRoutes } from "@/utils/clients-routes";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { session } = await validateRequestSession();

  if (!session) redirect(ClientRoutes.LOGIN);

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
