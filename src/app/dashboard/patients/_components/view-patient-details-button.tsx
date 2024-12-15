'use client';

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
import { ClientRoutes } from '@/lib/clients-routes';

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
          <Button size="icon" asChild>
            <Link
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
              }}
              href={`${ClientRoutes.PATIENTS}/${id}`}
            >
              <EyeIcon className="size-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
