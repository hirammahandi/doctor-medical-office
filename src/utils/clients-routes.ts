import { createRoutePattern } from './regex';

export const ClientRoutes = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DOCTOR: '/dashboard/doctor',
  PATIENTS: '/dashboard/patients',
  CLINICAL_HISTORIES: '/dashboard/clinical-histories',
} as const;

export type ClientRoute = (typeof ClientRoutes)[keyof typeof ClientRoutes];

export const protectedRoutesPattern = createRoutePattern([
  ClientRoutes.DASHBOARD,
  ClientRoutes.DOCTOR,
  ClientRoutes.PATIENTS,
  ClientRoutes.CLINICAL_HISTORIES,
]);

export const authenticationRoutesPattern = createRoutePattern([
  ClientRoutes.LOGIN,
  ClientRoutes.REGISTER,
  ClientRoutes.FORGOT_PASSWORD,
]);

export const ClientSearchParams = {
  CREATE: {
    param: 'create',
    values: {
      true: 'true',
      false: 'false',
    },
  },
  SEARCH: {
    param: 'search',
  },
  PAGE: {
    param: 'page',
  },
};
