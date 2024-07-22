import { ClientRoutes } from "@/utils/clients-routes";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User,
  Stethoscope,
  BookOpen,
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
          active: [ClientRoutes.DASHBOARD, ClientRoutes.HOME].includes(
            pathname,
          ),
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
