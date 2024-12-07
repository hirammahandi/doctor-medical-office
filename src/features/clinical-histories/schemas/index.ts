import { z } from 'zod';
import { requiredString } from '@/lib/validation';

export const upsertMedicalHistorySchema = z.object({
  description: requiredString,
  id: z.string().uuid().optional(),
});
