import { type Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { type FC, type PropsWithChildren } from 'react';
import HolyLoader from 'holy-loader';
import { cn } from '@/lib/utils';
import { BackgroundScreen } from '@/components/background-screen';
import { Toaster } from '@/components/ui/sonner';

// CSS
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Doctor Medical Office',
    default: 'Doctor Medical Office',
  },
  description: 'Doctor Medical Office is a medical office management system',
};

const RootLayout: FC<PropsWithChildren<void>> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-dvh bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <HolyLoader color="#4594fc" />
        <Toaster />
        <BackgroundScreen />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
