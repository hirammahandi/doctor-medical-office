import { Suspense } from "react";
import { ProfileInfo, ProfileInfoSkeleton } from "./profile-info";
import { SheetMenu } from "./sheet-menu";
import { NavbarTitle } from "./navbar-title";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <NavbarTitle />
        </div>
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo />
        </Suspense>
      </div>
    </header>
  );
};
