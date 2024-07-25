import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FC, ForwardedRef, forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

type PasswordInputProps = Omit<InputProps, "type">;

const DEFAULT_PASSWORD_PLACEHOLDER = "********";

const PasswordInputWithRef = (
  { placeholder = DEFAULT_PASSWORD_PLACEHOLDER, ...props }: PasswordInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [isPassword, setIsPassword] = useState(true);

  const handleChangeInputType = () => setIsPassword(!isPassword);

  return (
    <Input
      placeholder={placeholder}
      {...props}
      ref={ref}
      type={isPassword ? "password" : "text"}
      endAdornment={
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={handleChangeInputType}
                variant="ghost"
                size="adornment"
              >
                {isPassword ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPassword ? "Show password" : "Hide password"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
};

export const PasswordInput = forwardRef(PasswordInputWithRef);
