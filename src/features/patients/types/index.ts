import { type z } from 'zod';
import { type Patient } from '@prisma/client';
import { type createPatientSchema, type setNameSearchParamSchema } from '../schemas';

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;

export type GetPatientsPaginatedResult = {
  patients: Patient[];
  page: number;
  totalPages: number;
  total: number;
};

export type SetNameSearchParamSchema = z.infer<typeof setNameSearchParamSchema>;
