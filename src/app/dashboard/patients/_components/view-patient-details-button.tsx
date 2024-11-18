import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { type FC } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ClientRoutes } from '@/utils/clients-routes';

type ViewPatientDetailsButtonProps = {
  id: string;
};

export const ViewPatientDetailsButton: FC<ViewPatientDetailsButtonProps> = ({
  id,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Link href={`${ClientRoutes.PATIENTS}/${id}`}>
            <Button size="icon">
              <EyeIcon className="size-4" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
