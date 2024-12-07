import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type ForwardedRef, forwardRef, useState } from 'react';
import { Button } from '@components/ui/button';
import { Input, type InputProps } from '@components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { DEFAULT_PASSWORD_PLACEHOLDER } from '@/lib/constants';

type PasswordInputProps = Omit<InputProps, 'type'>;

const PasswordInputWithRef = (
  { placeholder = DEFAULT_PASSWORD_PLACEHOLDER, ...props }: PasswordInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [isPassword, setIsPassword] = useState(true);

  const handleChangeInputType = () => setIsPassword(!isPassword);

  return (
    <Input
      placeholder={placeholder}
      autoComplete="off"
      {...props}
      ref={ref}
      type={isPassword ? 'password' : 'text'}
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
              <p>{isPassword ? 'Show password' : 'Hide password'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  );
};

export const PasswordInput = forwardRef(PasswordInputWithRef);
