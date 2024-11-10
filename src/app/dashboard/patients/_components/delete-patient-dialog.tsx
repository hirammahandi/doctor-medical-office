'use client';

import { Trash2Icon } from 'lucide-react';
import { type FC } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeletePatientActions } from '../_hooks/use-delete-patient-action';

type DeletePatientDialogProps = {
  patientId: string;
  patientName: string;
};

export const DeletePatientDialog: FC<DeletePatientDialogProps> = ({
  patientId,
  patientName,
}) => {
  const {
    actions: { handleDeletePatient, handleOpenDialog },
    states: { isPending, openDialog },
  } = useDeletePatientActions({ patientId });

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure to remove: {patientName}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            patient and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline-destructive"
              disabled={isPending}
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            isLoading={isPending}
            onClick={handleDeletePatient}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
