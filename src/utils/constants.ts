import { ClientRoutes } from "./clients-routes";

export const DEFAULT_PASSWORD_PLACEHOLDER = "********";

export const ErrorsMessages = {
  INVALID_CREDENTIALS: "Invalid credentials",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  USERNAME_ALREADY_EXISTS: "Username already exists",
  WRONG_EMAIL_OR_PASSWORD: "Wrong email or password",
  UNAUTHORIZED: "Unauthorized",
};

export const FormErrorsMessages = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Invalid email",
  WRONG_REGEX_PATTERN:
    "Only letters, numbers, underscores and dashes are allowed",
  MIN_LENGTH: "This field must be at least 8 characters",
};

export const PAGE_TITLES_BY_ROUTES: Partial<Record<ClientRoutes, string>> = {
  [ClientRoutes.DASHBOARD]: "Dashboard",
  [ClientRoutes.DOCTOR]: "Doctor",
  [ClientRoutes.PATIENTS]: "Patients",
  [ClientRoutes.CLINICAL_HISTORIES]: "Clinical Histories",
};
