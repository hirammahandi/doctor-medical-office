import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: React.InputHTMLAttributes<HTMLDivElement>['className'];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center',
          containerClassName,
        )}
      >
        {startAdornment}
        <input
          type={type}
          className={cn('h-full flex-1 outline-none', className)}
          ref={ref}
          {...props}
        />
        {endAdornment}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
