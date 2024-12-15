// @note this must be imported only in server component or actions

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import {
  type Session as PrismaSession,
  type User as PrismaUser,
} from '@prisma/client';
import { Lucia, type Session, type User } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import prisma from './lib/prisma';

type UserAttributes = Omit<PrismaUser, 'passwordHash'>;

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia<PrismaSession, UserAttributes>(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
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

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = UserAttributes;

const validateSession = async (): Promise<
  | {
      user: User;
      session: Session;
    }
  | { user: null; session: null }
> => {
  const _cookies = await cookies();

  const sessionId = _cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  try {
    const result = await lucia.validateSession(sessionId);
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      _cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      _cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    return result;
  } catch (error) {
    console.log('Error setting session cookie', error);
    return {
      session: null,
      user: null,
    };
  }
};

const getAuthUser = async () => {
  const _cookies = await cookies();
  const sessionId = _cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  const { user } = await lucia.validateSession(sessionId);

  return user;
};

export const createSession = async (userId: string) => {
  const _cookies = await cookies();
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  _cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const removeSession = async (sessionId: string) => {
  const _cookies = await cookies();
  await lucia.invalidateSession(sessionId);
  const sessionCookie = lucia.createBlankSessionCookie();

  _cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

// @note deduplicate the validateRequest function for throw only once
export const validateRequestSession = cache(validateSession);
export const getAuthUserPayload = cache(getAuthUser);
