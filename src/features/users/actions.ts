"use server";

import { validateRequestSession } from "@/auth";
import { ClientRoutes } from "@/utils/clients-routes";
import { ErrorsMessages } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { updateDoctorSchema } from "./schemas";
import { updateUser } from "./services";
import { UpdateDoctorSchema } from "./types";

export const updateDoctor = async (
  body: UpdateDoctorSchema,
): Promise<{ error: string } | void> => {
  try {
    const parsedBody = updateDoctorSchema.parse(body);
    const { session, user } = await validateRequestSession();

    if (!session) {
      redirect(ClientRoutes.LOGIN);
    }

    const id = user.id;

    await updateUser({ id, ...parsedBody });
    revalidatePath(ClientRoutes.DOCTOR);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log("Error updating doctor", error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};
