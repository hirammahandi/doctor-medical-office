import { type Prisma } from '@prisma/client';
import { type z } from 'zod';
import {
  type patientsQueryParamSchema,
  type upsertPatientSchema,
} from '../schemas';

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;

export type GetPaginatedPatientsResult = {
  patients: Prisma.PatientGetPayload<{
    include: {
      medicalHistories: {
        select: {
          id: true;
          description: true;
          createdAt: true;
        };
      };
    };
  }>[];
  page: number;
  totalPages: number;
  total: number;
};
export type GetRecentPatientsResult = Prisma.PatientGetPayload<{
  select: {
    id: true;
    address: true;
    age: true;
    createdAt: true;
    identification: true;
    lastName: true;
    name: true;
  };
}>;

export type PatientsQueryParamSchema = z.infer<typeof patientsQueryParamSchema>;
