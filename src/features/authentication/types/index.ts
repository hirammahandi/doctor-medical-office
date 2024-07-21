import { z } from "zod";
import { loginSchema, signUpSchema } from "../schemas";

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
