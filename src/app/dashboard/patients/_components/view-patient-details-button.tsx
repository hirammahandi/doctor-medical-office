import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ClientRoutes } from '@/utils/clients-routes';

type ViewPatientDetailsButtonProps = {
  id: string;
};

export const ViewPatientDetailsButton: FC<ViewPatientDetailsButtonProps> = ({
  id,
}) => {
  // TODO: Solve style issues. The tooltip is not displaying with the correct style.
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Button size="icon" asChild>
            <Link href={`${ClientRoutes.PATIENTS}/${id}`}>
              <EyeIcon className="size-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
