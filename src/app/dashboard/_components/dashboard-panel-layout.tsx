'use client';

import { type FC, type PropsWithChildren } from 'react';
import { Sidebar, useSidebarToggle } from '@/components/sidebar';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';

/**
 * A layout component for the admin panel that includes a toggleable sidebar.
 *
 * @param  props - The children components to be rendered within the layout.
 * @returns - The layout containing a sidebar and main content area, or null if the sidebar state is not available.
 */
export const AdminPanelLayout: FC<PropsWithChildren> = ({ children }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out',
          { 'lg:ml-[90px]': !sidebar.isOpen, 'lg:ml-72': sidebar.isOpen },
        )}
      >
        {children}
      </main>
    </>
  );
};
