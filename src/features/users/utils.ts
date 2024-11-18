// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is intentional
export const isDoctorModel = <T>(doctor: any, path = 'name'): doctor is T =>
  !!(doctor && path in doctor);
