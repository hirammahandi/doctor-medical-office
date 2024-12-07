'use client';

import { type FC, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const useClosePatientDetailsDialog = () => {
  const router = useRouter();

  return (open: boolean) => {
    if (!open) router.back();
  };
};

export const PatientDetailsDialog: FC<PropsWithChildren> = ({ children }) => {
  const handleClosePatientDialog = useClosePatientDetailsDialog();

  return (
    <Dialog defaultOpen onOpenChange={handleClosePatientDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
