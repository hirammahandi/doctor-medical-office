import { z } from "zod";
import { requiredString } from "@/utils/validation";
import { FormErrorsMessages } from "@/utils/constants";
import { ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES } from "@/utils/regex";

export const signUpSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  username: requiredString.regex(
    ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES,
    FormErrorsMessages.WRONG_REGEX_PATTERN,
  ),
  email: requiredString.email(FormErrorsMessages.INVALID_EMAIL),
  password: requiredString.min(8, FormErrorsMessages.MIN_LENGTH),
});

export const loginSchema = signUpSchema.pick({
  email: true,
  password: true,
});
