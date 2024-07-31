import React, { FC, PropsWithChildren } from "react";
import { AdminPanelLayout } from "@dashboard/_components/dashboard-panel-layout";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default DashboardLayout;
