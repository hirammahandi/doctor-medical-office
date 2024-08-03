"use client";

import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@components/ui/sheet";
import VisuallyHidden from "@components/ui/visually-hidden";
import { Menu } from "@components/sidebar/menu";
import { ClientRoutes } from "@/utils/clients-routes";
import { SignOutSubmitButton } from "@components/sidebar/signout-submit-button";

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link
              href={ClientRoutes.DASHBOARD}
              className="flex items-center gap-2"
            >
              <PanelsTopLeft className="mr-1 h-6 w-6 flex-shrink-0" />
              <h1 className="text-lg font-bold">Doctor Office</h1>
            </Link>
          </Button>
          <VisuallyHidden>
            <SheetTitle>Sidebar Menu</SheetTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <SheetDescription>Select an option from the menu</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <Menu isOpen>
          <SignOutSubmitButton />
        </Menu>
      </SheetContent>
    </Sheet>
  );
};
