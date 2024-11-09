import { type PropsWithChildren } from "react";
import { Navbar } from "@components/navbar";

type ContentLayoutProps = PropsWithChildren;

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
};
