import { FrownIcon } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import { Button } from './ui/button';

type NotFoundContentProps = {
  title: string;
  message: string;
  linkHref: string;
  linkText: string;
};

export const NotFoundContent: FC<NotFoundContentProps> = ({
  linkHref,
  linkText,
  message,
  title,
}) => {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FrownIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-muted-foreground">{message}</p>
        <div className="mt-6">
          <Button asChild>
            <Link href={linkHref}>{linkText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
