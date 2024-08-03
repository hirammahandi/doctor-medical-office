import { ClientRoutes } from "@/utils/clients-routes";
import {
  BookOpen,
  LayoutGrid,
  LucideIcon,
  Stethoscope,
  Users,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: ClientRoutes.DASHBOARD,
          label: "Dashboard",
          active: (
            [ClientRoutes.DASHBOARD, ClientRoutes.HOME] as string[]
          ).includes(pathname as ClientRoutes),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Administration",
      menus: [
        {
          href: ClientRoutes.DOCTOR,
          label: "Doctor",
          active: pathname.includes(ClientRoutes.DOCTOR),
          icon: Stethoscope,
          submenus: [],
        },
        {
          href: ClientRoutes.PATIENTS,
          label: "Patients",
          active: pathname.includes(ClientRoutes.PATIENTS),
          icon: Users,
          submenus: [],
        },
        {
          href: ClientRoutes.CLINICAL_HISTORIES,
          label: "Clinical Histories",
          active: pathname.includes(ClientRoutes.CLINICAL_HISTORIES),
          icon: BookOpen,
          submenus: [],
        },
      ],
    },
  ];
}
