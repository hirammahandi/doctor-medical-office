import { createRoutePattern } from "./regex";

export const ClientRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DOCTOR: "/dashboard/doctor",
  PATIENTS: "/dashboard/patients",
  CLINICAL_HISTORIES: "/dashboard/clinical-histories",
};

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
