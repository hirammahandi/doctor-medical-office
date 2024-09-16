import { z } from 'zod';
import {
  requiredNumber,
  requiredString,
  requiredUuid,
} from '@/utils/validation';

export const createPatientSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  age: requiredNumber,
  address: requiredString,
  identification: requiredString,
});

export const deletePatientSchema = requiredUuid;

export const setNameSearchParamSchema = z.object({
  name: requiredString,
});
