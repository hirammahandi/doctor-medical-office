import { z } from 'zod';
import {
  requiredNumber,
  requiredString,
  requiredUuid,
} from '@/utils/validation';

export const upsertPatientSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  age: requiredNumber,
  address: requiredString,
  identification: requiredString,
});

export const deletePatientSchema = requiredUuid;

export const patientsQueryParamSchema = z.object({
  search: z.string().optional(),
  page: z.number({ coerce: true }).positive().optional(),
});
