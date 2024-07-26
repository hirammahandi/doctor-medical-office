import type { NextRequest, MiddlewareConfig } from "next/server";

const middlewares = {};

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function middleware(request: NextRequest) {
  // Middleware logic goes here
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
