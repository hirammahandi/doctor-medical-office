'use client';

import { type FC, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const PatientDetailsDialog: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
