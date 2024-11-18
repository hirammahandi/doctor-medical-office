import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const UpsertPatientButton = () => {
  return (
    <span>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <Button size="icon">
              <PencilIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};
