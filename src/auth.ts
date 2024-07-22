// @note this must be imported only in server component or actions

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, Session, User } from "lucia";
import { Session as PrismaSession, User as PrismaUser } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./lib/prisma";

type UserAttributes = Omit<PrismaUser, "passwordHash">;

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia<PrismaSession, UserAttributes>(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      createdAt: databaseUserAttributes.createdAt,
      email: databaseUserAttributes.email,
      googleId: databaseUserAttributes.googleId,
      lastName: databaseUserAttributes.lastName,
      name: databaseUserAttributes.name,
      updatedAt: databaseUserAttributes.updatedAt,
      username: databaseUserAttributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes extends UserAttributes {}

/**
 * Validates a session by checking if the session ID exists. If the session ID exists, it validates the session and sets session cookies based on the result.
 *
 * @return {Promise<{ user: User; session: Session } | { user: null; session: null }>} A promise with the user and session information if valid, otherwise null values.
 */
const validateSession = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {
    console.log("Error setting session cookie", error);
  }

  return result;
};

/**
 * Creates a session for the given user ID.
 *
 * @param {string} userId - The ID of the user for whom the session is created.
 * @return {void} No return value.
 */
export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

/**
 * Removes a session by invalidating the session ID and setting a new blank session cookie.
 *
 * @param {string} sessionId - The ID of the session to be removed.
 * @return {Promise<void>} A promise that resolves after removing the session.
 */
export const removeSession = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

// @note deduplicate the validateRequest function for throw only once
export const validateRequestSession = cache(validateSession);
