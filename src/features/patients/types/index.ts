import { type z } from 'zod';
import { type Patient } from '@prisma/client';
import {
  type upsertPatientSchema,
  type patientsQueryParamSchema,
} from '../schemas';

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;

export type GetPatientsPaginatedResult = {
  patients: Patient[];
  page: number;
  totalPages: number;
  total: number;
};

export type PatientsQueryParamSchema = z.infer<typeof patientsQueryParamSchema>;
