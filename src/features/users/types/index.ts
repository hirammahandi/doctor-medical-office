import { type z } from "zod";
import { type Prisma } from "@prisma/client";
import { type updateDoctorSchema } from "../schemas";

export type UpdateDoctorSchema = z.infer<typeof updateDoctorSchema>;

export type FindUserResult = Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
    lastName: true;
    username: true;
  };
}>;
