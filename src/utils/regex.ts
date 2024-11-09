import { pathToRegexp } from 'path-to-regexp';

export const ONLY_LETTERS_NUMBERS_UNDERSCORES_DASHES = /^[a-zA-Z0-9_-]+$/;

export function createRoutePattern(routes: string[]): string {
  const pattern = routes
    .map((route) => {
      const formattedRoute = route.startsWith('/') ? route.slice(1) : route;
      return `${formattedRoute}|`;
    })
    .join('');

  return `/(${pattern.slice(0, -1)})`;
}

export const matchUrl = ({
  pathname,
  pattern,
}: {
  pathname: string;
  pattern: string;
}) => {
  return pathToRegexp(pattern).regexp.test(pathname);
};
