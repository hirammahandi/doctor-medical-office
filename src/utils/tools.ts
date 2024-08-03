export const hasDifferentValues = <TObject extends Record<string, unknown>>(
  mainObject: TObject,
  objectToCompare: TObject,
): boolean =>
  Object.keys(mainObject).some(
    (key) => mainObject[key] !== objectToCompare[key],
  );
