import { NextResponse, type MiddlewareConfig } from "next/server";

import {
  createMiddleware,
  type MiddlewareFunctionProps,
  type MiddlewareConfig as MiddlewareConfigType,
} from "next-easy-middlewares";
import {
  authenticationRoutesPattern,
  ClientRoutes,
  protectedRoutesPattern,
} from "./utils/clients-routes";
import { lucia } from "./auth";

const middlewares: MiddlewareConfigType = {
  [protectedRoutesPattern]: async ({
    request,
    response,
  }: MiddlewareFunctionProps) => {
    const requestCookies = request.cookies;
    const responseCookies = response.cookies;
    const url = request.url;
    const redirectToLogin = NextResponse.redirect(
      new URL(ClientRoutes.LOGIN, url),
    );

    const sessionId =
      requestCookies.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return redirectToLogin;
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        responseCookies.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        responseCookies.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (error) {
      console.log("Error setting session cookie", error);
      return redirectToLogin;
    }
    return response;
  },

  [authenticationRoutesPattern]: async ({ request, response }) => {
    const requestCookies = request.cookies;
    const url = request.url;
    const redirectToDashboard = NextResponse.redirect(
      new URL(ClientRoutes.DASHBOARD, url),
    );

    const sessionId =
      requestCookies.get(lucia.sessionCookieName)?.value ?? null;

    if (sessionId) {
      const result = await lucia.validateSession(sessionId);
      if (result.session) {
        return redirectToDashboard;
      }
    }

    return response;
  },
};

export const middleware = createMiddleware(middlewares);

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
