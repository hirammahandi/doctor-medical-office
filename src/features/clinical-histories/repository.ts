import { type Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export const upsertMedicalHistory = ({
  id = '',
  ...input
}: Prisma.MedicalHistoryCreateInput) => {
  return prisma.medicalHistory.upsert({
    where: {
      id,
    },
    create: input,
    update: {
      description: input.description,
    },
  });
};
