import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: React.InputHTMLAttributes<HTMLDivElement>["className"];
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
          "flex h-10 w-full flex-1 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium has-[:disabled]:cursor-not-allowed has-[:placeholder]:text-muted-foreground has-[:disabled]:opacity-50 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
          containerClassName,
        )}
      >
        {startAdornment}
        <input
          type={type}
          className={cn("h-full flex-1 outline-none", className)}
          ref={ref}
          {...props}
        />
        {endAdornment}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
