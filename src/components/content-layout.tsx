import { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

type ContentLayoutProps = PropsWithChildren<{
  title: string;
}>;

export const ContentLayout = ({ title, children }: ContentLayoutProps) => {
  return (
    <div>
      <Navbar title={title} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
};
