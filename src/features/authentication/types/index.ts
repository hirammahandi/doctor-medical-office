import { type z } from "zod";
import { type loginSchema, type signUpSchema } from "../schemas";

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
