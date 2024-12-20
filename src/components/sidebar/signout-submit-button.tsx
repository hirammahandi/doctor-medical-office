import { LogOut } from 'lucide-react';
import { type FC } from 'react';
import { useFormStatus } from 'react-dom';
import { logout } from '@/features/authentication/actions';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

type SignOutSubmitButtonProps = {
  isOpen?: boolean;
};

function Submit({ isOpen }: { isOpen?: boolean }) {
  const status = useFormStatus();

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="mt-5 h-10 w-full justify-center"
            isLoading={status.pending}
          >
            {!status.pending && (
              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                <LogOut size={18} />
              </span>
            )}
            <p
              className={cn(
                'whitespace-nowrap',
                isOpen === false ? 'hidden opacity-0' : 'opacity-100',
              )}
            >
              Sign out
            </p>
          </Button>
        </TooltipTrigger>
        {isOpen === false && (
          <TooltipContent side="right">Sign out</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export const SignOutSubmitButton: FC<SignOutSubmitButtonProps> = ({
  isOpen,
}) => {
  return (
    <form className="w-full" action={logout}>
      <Submit isOpen={isOpen} />
    </form>
  );
};
