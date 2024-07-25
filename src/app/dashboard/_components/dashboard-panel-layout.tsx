"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar, useSidebarToggle } from "@/components/sidebar";
import { FC, PropsWithChildren } from "react";
import { SignOutSubmitButton } from "@/components/sidebar/signout-submit-button";

export const AdminPanelLayout: FC<PropsWithChildren> = ({ children }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out",
          { "lg:ml-[90px]": !sidebar.isOpen, "lg:ml-72": sidebar.isOpen },
        )}
      >
        {children}
      </main>
    </>
  );
};
