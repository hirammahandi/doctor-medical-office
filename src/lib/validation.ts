import { z } from 'zod';
import { FormErrorsMessages } from '@/lib/constants';

export const requiredString = z
  .string({
    required_error: FormErrorsMessages.REQUIRED,
  })
  .trim()
  .min(1, FormErrorsMessages.REQUIRED);

export const requiredUuid = z
  .string({
    required_error: FormErrorsMessages.REQUIRED,
  })
  .trim()
  .min(1, FormErrorsMessages.REQUIRED)
  .uuid(FormErrorsMessages.INVALID_UUID);

export const requiredNumber = z.coerce.number({
  required_error: FormErrorsMessages.REQUIRED,
});
