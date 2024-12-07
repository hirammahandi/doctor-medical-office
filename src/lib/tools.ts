export const hasDifferentValues = <TObject extends Record<string, unknown>>(
  mainObject: TObject,
  objectToCompare: TObject,
): boolean =>
  Object.keys(mainObject).some(
    (key) => mainObject[key] !== objectToCompare[key],
  );

export const range = (length: number) => [...Array(length).keys()];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is intentional
export const hasErrors = (result: any): result is { error: string } => {
  return typeof result === 'object' && 'error' in result;
};

export const removeSearchParams = (pathname: string) => {
  window.history.replaceState(null, '', pathname);
};
