'use client';

import { usePathname } from 'next/navigation';
import { ClientRoutes } from '@/utils/clients-routes';
import { PAGE_TITLES_BY_ROUTES } from '@/utils/constants';

export const NavbarTitle = () => {
  const pathname = usePathname();

  const title = Object.entries(PAGE_TITLES_BY_ROUTES).find(
    ([key]) => pathname === key,
  )?.[1];

  return (
    <h1 className="font-bold">
      {title ?? PAGE_TITLES_BY_ROUTES[ClientRoutes.DASHBOARD]}
    </h1>
  );
};
