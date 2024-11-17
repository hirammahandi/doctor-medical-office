import { type z } from 'zod';
import { type upsertMedicalHistorySchema } from '../schemas';

export type UpsertMedicalHistorySchema = z.infer<
  typeof upsertMedicalHistorySchema
>;
