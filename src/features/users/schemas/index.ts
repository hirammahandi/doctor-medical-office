import { FormErrorsMessages } from "@/utils/constants";
import { ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES } from "@/utils/regex";
import { requiredString } from "@/utils/validation";
import { z } from "zod";

export const updateDoctorSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  username: requiredString.regex(
    ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES,
    FormErrorsMessages.WRONG_REGEX_PATTERN,
  ),
  email: requiredString.email(FormErrorsMessages.INVALID_EMAIL),
});
