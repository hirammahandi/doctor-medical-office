import { type PropsWithChildren } from 'react';
import { Navbar } from '@components/navbar';

type ContentLayoutProps = PropsWithChildren;

/**
 * A layout component that wraps pages with a navbar and a
 * container div that restricts the width of the page's content.
 *
 * @param children - The content of the page.
 * @returns A JSX element representing the layout.
 */

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
};
