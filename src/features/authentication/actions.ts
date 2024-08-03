"use server";

import { createSession, removeSession, validateRequestSession } from "@/auth";
import {
  LoginSchema,
  loginSchema,
  SignUpSchema,
  signUpSchema,
} from "@/features/authentication";
import { ClientRoutes } from "@/utils/clients-routes";
import { ErrorsMessages } from "@/utils/constants";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";
import { createUser, findUserByEmail, findUserByUsername } from "../users";

export const login = async (
  credentials: LoginSchema,
): Promise<{ error: string } | void> => {
  try {
    const { password, email } = loginSchema.parse(credentials);

    const existingUser = await findUserByEmail(email);

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: ErrorsMessages.WRONG_EMAIL_OR_PASSWORD,
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: ErrorsMessages.WRONG_EMAIL_OR_PASSWORD,
      };
    }

    await createSession(existingUser.id);

    return redirect(ClientRoutes.DASHBOARD);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log("Error logging in", error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};

export const signUp = async (
  credentials: SignUpSchema,
): Promise<{ error: string } | void> => {
  try {
    const { username, email, lastName, name, password } =
      signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const generatedUserId = generateIdFromEntropySize(10);

    const existingUsername = await findUserByUsername(username);

    if (existingUsername)
      return {
        error: ErrorsMessages.USERNAME_ALREADY_EXISTS,
      };

    const existingEmail = await findUserByEmail(email);

    if (existingEmail)
      return {
        error: ErrorsMessages.EMAIL_ALREADY_EXISTS,
      };

    await createUser({
      id: generatedUserId,
      username,
      email,
      name,
      lastName,
      passwordHash,
    });

    await createSession(generatedUserId);

    return redirect(ClientRoutes.DASHBOARD);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.log("Error creating user", error);

    return {
      error: ErrorsMessages.SOMETHING_WENT_WRONG,
    };
  }
};

export const logout = async (): Promise<ActionResult> => {
  "use server";

  const { session } = await validateRequestSession();

  if (!session) {
    throw new Error(ErrorsMessages.UNAUTHORIZED);
  }

  await removeSession(session.id);

  return redirect(ClientRoutes.LOGIN);
};
