import { FormErrorsMessages } from "@/utils/constants";
import { z } from "zod";

export const requiredString = z
  .string({
    required_error: FormErrorsMessages.REQUIRED,
  })
  .trim()
  .min(1, FormErrorsMessages.REQUIRED);
