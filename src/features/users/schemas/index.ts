import { z } from 'zod';
import { FormErrorsMessages } from '@/lib/constants';
import { ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES } from '@/lib/regex';
import { requiredString } from '@/lib/validation';

export const updateDoctorSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  username: requiredString.regex(
    ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES,
    FormErrorsMessages.WRONG_REGEX_PATTERN,
  ),
  email: requiredString.email(FormErrorsMessages.INVALID_EMAIL),
});
