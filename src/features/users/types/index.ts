import { z } from "zod";
import { updateDoctorSchema } from "../schemas";
import { Prisma } from "@prisma/client";

export type UpdateDoctorSchema = z.infer<typeof updateDoctorSchema>;

export type FindUserResult = Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
    lastName: true;
    username: true;
  };
}>;
