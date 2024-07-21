import { requiredString } from "@/lib/validation";
import { z } from "zod";

export const signUpSchema = z.object({
  name: requiredString,
  lastName: requiredString,
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only contain letters, numbers, underscores and dashes",
  ),
  email: z.string().trim().min(1).email(),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export const loginSchema = signUpSchema.pick({
  username: true,
  password: true,
});
